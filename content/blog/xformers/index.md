---
title: "Transformers Now: A Survey"
date: "2020-10-25T22:01:03.284Z"
description: 'WIP'
featuredImage: xformers/ogp.jpg
tags: ["en", "deep-learning", "nlp", "transformer"]
---



## Efficiency & Long-term Context
There are plenty of efficient Transformers, often named in the form of X-former: Reformer, Linformer, Performer, ... just to name a few. Recently, a team from Google published an excellent survey on this topic [1]. Here is the representative figure and table.

![](2020-10-24-11-19-36.png)

![](2020-10-24-11-25-16.png)

<div style="text-align: center;"><small>Images taken from [1]. It is not clear from the paper whether the "Complexity" column of the table refers to computational or memory complexity.</small></div>

They propose the following taxonomy for X-formers: 

- **Fixed Patterns**: This earliest approaches sparsify the attention matrix by limiting the number of token pairs with pre-defined patterns such as blocks and strides.
- **Combination of Patterns**: This simply combines two or more of the fixed patterns to improve the coverage.
- **Learnable Patterns**: The patterns are parametrized and learned through training just as other weights.
- **Memory**: The core idea of this approach is to create some "global tokens" that can access multiple tokens at once. These tokens are supposed to serve as a memory module.
- **Low Rank**: Low-rank methods reduce the length dimensions of keys and values to $k~(<n)$, which results in the complexity reduction from $\mathcal{O}(n^2d)$ to $\mathcal{O}(nkd)$.
- **Kernel**: This utilizes kernelization to approximate the attention matrix with smaller complexity.
- **Recurrence**: Blockwise attentions are connected with reccurent mechanism.

Let's take a closer look at individual models.

### Sparse Transformer \[Child+, 2019]
[**Sparse Transformer** [Child+, 2019]](https://arxiv.org/abs/1904.10509) sparsifies the attention matrix by adopting local attention (lightblue) and strided attention (lightgreen), as described in the figure below.

![](2020-10-31-09-54-09.png)

<div style="text-align: center;"><small>Image taken from [1].</small></div>

This modification reduces the memory complexity of the attention
layer from $\mathcal{O}(n^2)$ to $\mathcal{O}(n\log{n})$. However, it requires a custom GPU kernels to implement a block-sparse *matmul* (i.e., matrix-matrix multiplication) operation.

The paper by a team from OpenAI presents impressive results. The autoregressive generative model generates texts, 64x64-sized images, and even raw audio waveforms (you can listen to them in [the official blog post](https://openai.com/blog/sparse-transformer/)). Sparse Transformer is important because subsequent models such as [**Longformer**](https://arxiv.org/abs/2004.05150) and [**Big Bird**](https://arxiv.org/abs/2007.14062) are based on it.

Sparse Transformer is inherited to another research work called [Jukebox](https://arxiv.org/abs/2005.00341), which successfully generates music waveforms in a variety of genres. Jukebox can generate minutes-length music conditioned by genres, lyrics, and artists (from Ella Fitzgerald to Kanye West). All 7,131 generated samples are available [here](https://jukebox.openai.com/). They do make sense!

### Routing Transformer \[Roy+, 2020]
[**Routing Transformer** [Roy+, 2020]](https://arxiv.org/abs/2003.05997) uses learnable patterns to sparsify the attention matrix. It clusters the input tokens with **k-means** algorithm in an online fashion so that each token only attend to the tokens beloging to the same cluster.

### Reformer \[Kitaev+, 2020]
[**Reformer** [Kitaev+, 2020]](https://arxiv.org/abs/2001.04451) uses **locality sensitive hashing (LSH)** to learn attention patterns. LSH projects nearby vectors to similar hashes, which can be used to classify tokens into some buckets. 

Reformer also introduces reversible layers, where activations of the $L$-th layer can be restored from those of the $(L+1)$-th layer. This mechanism allows the model to discard activations of all but one layer to enable further memory savings.

### Linformer \[Wang+, 2020]
[**Linformer** [Wang+, 2020]](https://arxiv.org/abs/2006.04768) dares to reduce length dimension of key and value matrices with additional projection layers. As a result,  $N\times d$ dimensional matrices are projected to $k\times d$ dimensional matrices, where $k<<N$. The size of the attention matrix $\mathrm{softmax}(Q'K')$ is now $N \times k$ instead of $N \times N$. This low-rank approximation reduces computational and memory complexity to $\mathcal{O}(n)$, but Linformer cannot decode tokens as causal masking is broken.

![](2020-10-31-14-56-50.png)

<div style="text-align: center;"><small>Image taken from <a href="https://arxiv.org/abs/2006.04768">Linformer: Self-Attention with Linear Complexity</a>. The projection matrix (lightblue) is multiplied from the left.</small></div>
<br/>

### Performer \[Choromanski+, 2020]
[**Performer** [Choromanski+, 2020]](https://arxiv.org/abs/2009.14794) leverages orthogonal random features to approximate the attention matrix with provable accuracy. The proposed **FAVOR+** algorithm allows Performer to scale linearly with the number of tokens. I refer interested readers to [the original paper](https://arxiv.org/abs/2009.14794).

### Synthesizer \[Tay+, 2020]
Unlike other X-formers, [**Synthesizer** [Tay+, 2020]](https://arxiv.org/abs/2005.00743) doesn't aim at creating more efficient Transformers. The main argument of the paper is that the self-attention is, surprisingly, not so important because replacing the attention maps with randomly-initialized (trainable) matrices does not really hurt the model performance. This result itself is very intriguing, but there is an additional benefit of saving memory. 

One version of Synthesizers called Random Synthesizer uses a randomly-initialized trainable matrix $R$ to compute an attention map by $\mathrm{softmax}(R)$. This eliminates the need of computing the attention matrix by $\mathrm{softmax}(QK)$. Factorized Random Synthesizer reduces the number of parameters as well by factorizing the attention matrix as $\mathrm{softmax}(R_1R_2^{\mathrm{T}})$.

![](2020-10-31-18-32-31.png)

<div style="text-align: center;"><small>Image taken from <a href="https://arxiv.org/abs/2005.00743">Synthesizer: Rethinking Self-Attention in Transformer Models</a>.</small></div>
<br/>

### Transformer-XL \[Dai+, 2019]
[**Transformer-XL** [Dai+, 2019]](https://arxiv.org/abs/1901.02860) takes a unique approach to the long-term context problem. It processes a long text in a segment-by-segment fashion, but the representations of the previous segment are reused when processing the next segment as an external context. It is worth mentioning that this recurrence mechanism also resolves the context fragmentation issue.

![](transformer-xl.gif)

<div style="text-align: center;"><small>Image taken from <a href="https://ai.googleblog.com/2019/01/transformer-xl-unleashing-potential-of.html">Google AI Blog: Transformer-XL: Unleashing the Potential of Attention Models</a>.</small></div>
<br/>

There are some applications of Transformer-XL (e.g., [language model pre-training](https://arxiv.org/abs/1906.08237) and [reinforcement learning](https://arxiv.org/abs/1910.06764)).

### Long Range Arena: Benchmarking X-formers
There are many X-formers claiming their superiority over the vanilla Transformer, but unfortunately, the evaluation protocols differ from paper to paper. Long Range Arena (LRA) [3] tackles this problem by proposing a unified benchmark that focuses on evaluating model quality under long-context scenarios. LRA score is defined as the average score of the following six tasks:

- Long ListOps: Calculating nested set functions (e.g., MEAN(2, 3, MAX(2, 7)) = 4)
- Byte-level Text Classification
- Byte-level Document Retrieval
- Image Classification on Sequence of Pixels
- Pathfinder: Determining whether the two white circles in a 32x32-sized image are connected or not (c.f. the image below)
- Pathfinder-X: More difficult version of Pathfinder with 128x128-sized images.

![](2020-10-31-23-30-35.png)

<div style="text-align: center;"><small>Image taken from [3]. The answer of this Pathfinder sample is "connected".</small></div>
</br>

The authors locate X-formers in the following plot. The area of the circles represents the memory complexity. It tells us that Big Bird achieves the highest score, while Performer and Linformer are making a good trade-off in terms of performance, speed, and memory consumption.

![](2020-10-24-11-20-59.png)

<div style="text-align: center;"><small>Image taken from [3].</small></div>
</br>

## Modeling Images
So far, I've presented the recent advances of X-formers in terms of their efficiency and modeling long-term context. This enabled X-formers to model data from other modals such as image. In fact, Vision Transformer achieved state-of-the-art performance on many benchmarks such as ImageNet with higher scores compared to CNN-based models like Big Transfer (ResNet152x4).

### Image Transformer \[Parmar+, 2018]
[**Image Transformer** [Parmar+, 2018]](https://arxiv.org/abs/1802.05751) is probably the first successful attempt to generating images with Transformer. With localized 1D and 2D attention (i.e., a combination of fixed patterns), Image Transformer is trained on pixel sequences of images autoregressively just like language modeling.

Sparse Transformer came after this and succeeded in generating more high-quality images.

### Image GPT \[Chen+, 2020]
[**Image GPT** [Chen+, 2020]](https://openai.com/blog/image-gpt/) is also based on the same idea. It empirically proves that OpenAI's [**GPT-2**](https://d4mucfpksywv.cloudfront.net/better-language-models/language-models.pdf) is so generalizable that it can be trained on image pixels and generate visually impressive images. The image completion experiment is fun!

![](2020-11-01-10-10-41.png)

<div style="text-align: center;"><small>Image taken from <a href="https://openai.com/blog/image-gpt/">OpenAI Blog: Image GPT</a>.</small></div>
</br>

### Vision Transformer \[Anonymous, 2020]
[**Vision Transformer (ViT)** [Anonymous, 2020]](https://openreview.net/forum?id=YicbFdNTTy) shows that, with the large JFT-300M dataset, Transformer encoder model achieves state-of-the-art accuracy on image classification, where it has long been believed that CNN is the optimal architecture. Importantly, the largest model (ViT-Huge) has only 632M parameters (30% smaller than BiT-L) and the training process is fast in terms of TPU-days.

![](2020-11-01-10-36-11.png)

![](2020-11-01-10-39-19.png)

<div style="text-align: center;"><small>Images taken from <a href="https://openreview.net/forum?id=YicbFdNTTy">An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale | OpenReview</a>.</small></div>
</br>

There is [a concurrent work](https://arxiv.org/abs/2004.13621) that explores self-attention-based architecture for image recognition and outperforms CNN baselines on ImageNet.

## From a Perspective of Theory of Computation
While the computational power of RNNs have been investigated since 1990s, that of Transformers is limited. Is the computational power of Transformers/self-attention theoretically guranteed? If so, what about X-formers? To answer these questions, I conducted a quick survey though I'm pretty new to this area. Note that this section is far from thorough because I didn't find a good preciding suvey. I list some works that are interesting to me.

### Universal Transformer \[Dehghani+, 2018]
[**Universal Transformer** [Dehghani+, 2018]](https://arxiv.org/abs/1807.03819) proposes to combines the benefit of Transformers and RNNs. It shares parameters among layers and dynamically changes the number of layers (so it's a recurrent function). The authors assume that given sufficient memory, *this recurrent mechanism makes Transformers computationally universal* (Turing-complete; it can simulate any Turing machine.)

![](2020-11-01-11-40-34.png)

![](2020-11-01-11-41-21.png)

<div style="text-align: center;"><small>Images taken from <a href="https://arxiv.org/abs/1807.03819">Universal Transformers</a>.</small></div>

The authors empirically validate the superiority of Universal Transformer over vanilla Transformer and LSTM by a variety of tasks including simple algorithmic operations and LAMBADA.

### Transformers are Turing Complete \[Pérez+, 2019]
On the other hand, [Pérez et al. (2019)](https://arxiv.org/abs/1901.03429) showed that *Transformers with hard attention (and Neural GPUs) are Turing complete*. It is noted that, however, there are some differences between the two works. For example, [Dehghani et al. (2018)](https://arxiv.org/abs/1901.03429) assumed fixed precision, while [Pérez et al. (2019)](https://arxiv.org/abs/1901.03429) allowed arbitrary precision during computation.

### Transformers are Turing Complete even without Positional Encoding \[Bhattamishra+, 2020]
[Bhattamishra et al. (2020)](https://arxiv.org/abs/2006.09286) took a further step on Transformer's Turing completeness, stating that *Transformers without positional encoding are also Turing complete* and *decoder-encoder attentions and its residual connections together play a critical role*. They also provide some experimental results to support their theoretical analysis. 

![](2020-11-01-16-14-04.png)

<div style="text-align: center;"><small>Image taken from <a href="https://arxiv.org/abs/2006.09286">On the Computational Power of Transformers and its Implications in Sequence Modelings</a>. "The components marked red are essential for the Turing-completeness whereas for the pairs of blocks and residual connections marked green, either one of the component is enough. The dashed residual connection is not necessary for Turing completeness of the network". </small></div>
</br>

### Limitations of Self-attention \[Hahn, 2019]
[Hahn (2019)](https://arxiv.org/abs/1906.06755) focused on self-attention rather than Transformer, showing the theoretical limitations of the computational abilities of hard and soft self-attention. It is stated that *self-attention cannot model periodic finite-state languages nor hierarchical structure*. Empirical results using synthetic datasets are provided.

## Pre-trained Language Models & BERTology
Pre-trained language models and "BERTology" account for a large portion of the Transformer applications, but this is too large to include in this post so I'd like to make it brief.

### BERT \[Devlin+, 2018]
[**BERT** [Devlin+, 2018]](https://arxiv.org/abs/1810.04805) sparked a boom of language model pre-training using Transformer or similar architecture. There are even research works on BERT itself, whici is called **BERTology**. For instance, it includes analises on the learned weights, attempts to reduce parameters, memory consumption, and the amount of data required for fine-tuning, distillation, and so on. I refer interested readers to [an excellent survey paper](https://arxiv.org/abs/2002.12327) [5].

My favorite work from BERTology is [the one by Libovický et al.](https://arxiv.org/abs/1911.03310) They created the impressive figure below to probe language neutrality of Multilingual BERT.

![](2020-10-24-10-47-15.png)

<div style="text-align: center;"><small>Image taken from <a href="https://arxiv.org/abs/1911.03310">How Language-Neutral is Multilingual BERT?</a></small></div>
</br>


### GPT-3 \[Brown+, 2020]
[**GPT-3** [Brown+, 2020]](https://arxiv.org/abs/2005.14165) is basically a natural extention of [GPT-2](https://d4mucfpksywv.cloudfront.net/better-language-models/language-models.pdf), with 175B parameters and 300B tokens for training. But it's not just saying that larger model, larger dataset, and longer training lead to better accuracy and generalizability. GPT-3 acquires, surprisingly, the ability of few-shot (in-context) learning,
### mT5

## References
[1] Yi Tay, Mostafa Dehghani, Dara Bahri, Donald Metzler. "[Efficient Transformers: A Survey](https://arxiv.org/abs/2009.06732)". 2020.  
[2] Madison May. "[A Survey of Long-Term Context in Transformers](https://www.pragmatic.ml/a-survey-of-methods-for-incorporating-long-term-context/)
". 2020.   
[3] Anonymous Authors. "[Long Range Arena : A Benchmark for Efficient Transformers](https://openreview.net/forum?id=qVyeW-grC2k)". 2020.  
[4] Lilian Weng. "[The Transformer Family](https://lilianweng.github.io/lil-log/2020/04/07/the-transformer-family.html)". Lil'Log. 2020.  
[5] Anna Rogers, Olga Kovaleva, Anna Rumshisky. "[A Primer in BERTology: What we know about how BERT works](https://arxiv.org/abs/2002.12327)". 2020.

## Appendix
Layer normalization

![](2020-10-24-11-14-35.png)

https://paperswithcode.com/method/layer-normalization