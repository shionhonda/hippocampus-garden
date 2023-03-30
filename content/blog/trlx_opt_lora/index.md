---
title: "Tuning a Large Language Model with Reinforcement Learning on a Single GPU"
date: "2023-03-30T22:01:03.284Z"
description: "Uncover the top deep learning advancements of 2022. A year-in-review of key research papers and applications."
featuredImage: trlx_opt_lora/ogp.jpg
tags: ["en", "nlp", "deep-learning"]
---

Since ChatGPT was released, **large language models** (**LLM**) and **reinforcement learning from human feedback** (**RLHF**) have taken the world by storm. As a machine learning engineer, I was familiar with LLMs, but the idea of training one with RLHF was intriguing yet challenging. Would it be difficult? What were the common pitfalls?

To get a sense of RLHF of LLM, I decided to conduct a quick experiment. The good news is that it is now possible to do this on a consumer-grade computer system. This blog post is a report of that experiment.

## Setup
For those new to RLHF, let me provide a quick recap. The process involves three steps:
1. Pretraining a LLM
2. Collecting human feedback and training a **reward model** (**RM**) with it
3. Finetuning the LLM with reinforcement learning using the RM

While this may sound like a long process, you can shorten it by using handy libraries and off-the-shelf models. For this experiment, I use Meta's OPT-1.3B (`facebook/opt-1.3b`) model for LLM and DistilBERT-IMDB (`lvwerra/distilbert-imdb`) for RM. OPT-1.3B is an open source LLM with a good tradeoff between the model size and performance. It can generate decent sentences and fit in a single GPU. DistilBERT-IMDB is a pre-trained model trained on the IMDB dataset to classify whether a given movie review has a positive sentiment or not. When used as an RM, the reward indicates how positive the input sentence is. OPT before RL can generate both positive and negative reviews, and my objective is to train it to generate only positive reviews.

For the RL part, I use trlX library. It is a high-level library that implements RL algorithms and training loop for you. All you have to do is writing configurations. In fact, the codes introduced shortly is largely based on [the official example](https://github.com/CarperAI/trlx/blob/main/examples/ppo_sentiments_llama.py) provided by trlX.

For the training hereafter, I used Colaboratory (with A100 GPU). The 40GB VRAM seems not enough for training 1.3B model, so I reduced the effective number of parameters using LoRA. This is the main difference from the official example mentioned above.

## Implementation
The entire script is [here](https://colab.research.google.com/drive/1G8awJvEx3r5-ioyzMx1kNbIUEzukwYcT?usp=sharing).

After installing and importing some libraries, set training configurations.

```python
def myconfig():
    return TRLConfig(
        train=TrainConfig(
            seq_length=128,
            epochs=1000,
            total_steps=10000,
            batch_size=32,
            checkpoint_interval=10000,
            eval_interval=100,
            pipeline="PromptPipeline",
            trainer="AcceleratePPOTrainer",
            save_best=False,
        ),
        model=ModelConfig(model_path='facebook/opt-1.3b', num_layers_unfrozen=2,
                          delta_kwargs={"delta_type": "lora", "modified_modules": "attention", "lora_r": 8, "lora_alpha": 16, "lora_dropout": 0.05}),
        tokenizer=TokenizerConfig(tokenizer_path='facebook/opt-1.3b', truncation_side="right"),
        optimizer=OptimizerConfig(
            name="adamw", kwargs=dict(lr=1.0e-4, betas=(0.9, 0.95), eps=1.0e-8, weight_decay=1.0e-6)
        ),
        scheduler=SchedulerConfig(name="cosine_annealing", kwargs=dict(T_max=10000, eta_min=1.0e-4)),
        method=PPOConfig(
            name="PPOConfig",
            num_rollouts=128,
            chunk_size=128,
            ppo_epochs=4,
            init_kl_coef=0.05,
            target=6,
            horizon=10000,
            gamma=1,
            lam=0.95,
            cliprange=0.2,
            cliprange_value=0.2,
            vf_coef=1,
            scale_reward="ignored",
            ref_mean=None,
            ref_std=None,
            cliprange_reward=10,
            gen_kwargs=dict(
                max_new_tokens=40,
                top_k=0,
                top_p=1.0,
                do_sample=True,
            ),
        ),
    )
```

The important part is here:

```python
        model=ModelConfig(model_path='facebook/opt-1.3b', num_layers_unfrozen=2,
                          delta_kwargs={"delta_type": "lora", "modified_modules": "attention", "lora_r": 8, "lora_alpha": 16, "lora_dropout": 0.05}),
```

I am using `facebook/opt-1.3b` model and passing `delta_kargs` to activate LoRA.

Then, you can run training by this main function:

```python
def main(hparams={}):
    # Merge sweep config with default config if given
    config = TRLConfig.update(myconfig().to_dict(), hparams)

    if torch.cuda.is_available():
        device = int(os.environ.get("LOCAL_RANK", 0))
    else:
        device = -1

    sentiment_fn = pipeline(
        "sentiment-analysis",
        "lvwerra/distilbert-imdb",
        top_k=2,
        truncation=True,
        batch_size=256,
        device=device,
    )

    def reward_fn(samples: List[str], **kwargs) -> List[float]:
        sentiments = list(map(get_positive_score, sentiment_fn(samples)))
        return sentiments
    
    imdb = load_dataset("imdb", split="train+test")
    prompts = [" ".join(review.split()[:4]) for review in imdb["text"]]
    eval_prompts = [
        "What made this movie so distinctly",
        "This movie was terrible",
        "I was surprised at how this movie",
        "I didn't expect this movie was",
    ] * 16

    trlx.train(
        reward_fn=reward_fn,
        prompts=prompts,
        eval_prompts=eval_prompts,
        config=config,
    )
```

This is almost the same as the original example but the evaluation prompts.

```python
    eval_prompts = [
        "What made this movie so distinctly",
        "This movie was terrible",
        "I was surprised at how this movie",
        "I didn't expect this movie was",
    ] * 16
```

Here, I am using a prompt to generate movie reviews only. In particular, the prompt "This movie was terrible" is expecting a negative review. Let's see what happens.

## Results
When you run the main function, you'll get a nice visualization of how LoRA is reducing the trainable parameters.

```
[RANK 0] Initializing model: facebook/opt-1.3b
root
├── model (OPTModel)
│   └── decoder (OPTDecoder)
│       ├── embed_tokens (Embedding) weight:[50272, 2048]
│       ├── embed_positions (OPTLearnedPositionalEmbedding) weight:[2050, 2048]
│       ├── final_layer_norm (LayerNorm) weight:[2048] bias:[2048]
│       └── layers (ModuleList)
│           ├── 0-21(OPTDecoderLayer)
│           │   ├── self_attn (OPTAttention)
│           │   │   └── k_proj,v_proj,q_proj,out_proj(Linear) weight:[2048, 2048] bias:[2048]
│           │   ├── self_attn_layer_norm,final_layer_norm(LayerNorm) weight:[2048] bias:[2048]
│           │   ├── fc1 (Linear) weight:[8192, 2048] bias:[8192]
│           │   └── fc2 (Linear) weight:[2048, 8192] bias:[2048]
│           └── 22-23(OPTDecoderLayer)
│               ├── self_attn (OPTAttention)
│               │   └── k_proj,v_proj,q_proj,out_proj(Linear) weight:[2048, 2048] bias:[2048]
│               │       └── lora (LowRankLinear) lora_A:[8, 2048] lora_B:[2048, 8]
│               ├── self_attn_layer_norm,final_layer_norm(LayerNorm) weight:[2048] bias:[2048]
│               ├── fc1 (Linear) weight:[8192, 2048] bias:[8192]
│               └── fc2 (Linear) weight:[2048, 8192] bias:[2048]
└── lm_head (Linear) weight:[50272, 2048]
[INFO|(OpenDelta)basemodel:696]2023-03-29 05:39:05,206 >> Trainable Ratio: 262144/1316020224=0.019919%
[INFO|(OpenDelta)basemodel:698]2023-03-29 05:39:05,208 >> Delta Parameter Ratio: 262144/1316020224=0.019919%
[INFO|(OpenDelta)basemodel:700]2023-03-29 05:39:05,210 >> Static Memory 0.25 GB, Max Memory 19.99 GB
```

The trainable parameters are only in the Linear layers in the self-attention of the last two blocks, which account for the 0.02% of the 1.3B parameters!

The entire script runs in one or two hours. The reward starts at around 0.55 and continues to increase to 0.89.

![](2023-03-30-08-57-21.png)

Now, let's compare the outputs before and after reinforcement learning.

**Before RL**
|prompt|output|reward|
|:-:|:-:|:-:|
|This movie was terrible |. Worried that they would try to expand the plot to catch up with the events of the book. I didn't feel a shred of sympathy for Lex Luthor. I've gone back to the|0.005|
|What made this movie so distinctly| unrewarding is its potential to be incredibly entertaining. The franchise would have been better off treating the climactic showdown between the First Order and the Resistance like a brutal sports battle, with lighthearted comedy |0.843|
|I was surprised at how this movie| was formulaic and boring. I realized that thunderbirds are also a representation of the polar bear - who is the source of most climate change fears. After all, in his books the polar|0.020|
|I didn't expect this movie was| going to be the bar for the Box Office this box office weekend. With an opening in the low teens and a $37 million figure, the670 Squadra, the Spanish comedy about teen girls dealing| 0.432|

**After RL**
|prompt|output|reward|
|:-:|:-:|:-:|
|This movie was terrible|. Really? I loved it. I thought it was pretty good. I thought it was one of the funniest movies of the entire summer. Really? I thought it |0.964|
|What made this movie so distinctly|different from all the others in your streaming line-up? We tried to really represent a sense of the warmth and discussion of fandom in the industry. And I think we succeeded in that by offering| 0.221|
|I was surprised at how this movie| leapfrogged into more mainstream territory. I'm obviously aware the theatre I saw it in is filled with Middle Eastern, Muslim fans of the show, and the movie was obviously far broader| 0.918|
|I didn't expect this movie was| going to be especially uplifting or visually spectacular, but the cinematography still turned out very well. The central crew looks quite imperfect in the various dramatic scenes, but overall it's still a great showing| 0.995|

The model has leaned towards positive reviews. Notice how it responded to the prompt "This movie was terrible". It immediately denied that by saying "Really? I loved it". I love this.

## Concluding Remarks
In this post, I showed the quickest way to tune a LLM with RLHF on a single GPU, using trlX, OPT, and LoRA. I'm glad if this post means something to you.

One of the possible next steps is doing the similar thing using Alpaca-7B (instruct-tuned LLM) with prompts like "give the negative review about the movie". I actually [tried this](https://colab.research.google.com/drive/1HSRgyB3DhxQ-u1bjXO-JuDUi1QGpla7Y?usp=sharing), but it didn't fit in a 40GB VRAM. If any of you succeeded, please let me know how to do it! Another step would be to go to a more realistic setting. Anthropic realeased [a feedback dataset to align LLM to human values](https://huggingface.co/datasets/Anthropic/hh-rlhf), so you can technically create a ChatGPT-like model with this. But it should cost too much for individuals.