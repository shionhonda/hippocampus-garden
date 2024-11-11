---
title: "Preference optimization"
date: "2024-11-08T22:01:03.284Z"
description: ""
featuredImage: preference_optimization/ogp.jpg
tags: ["en", "nlp", "deep-learning"]
---

## Introduction to RLHF and Preference Optimization

Large language models (LLMs) are trained on massive text datasets, allowing them to generate human-quality text [1, 2]. However, controlling their behavior to align with human values and preferences remains challenging due to the unsupervised nature of their initial training [1, 2].

To address this challenge, preference optimization techniques have emerged. These techniques aim to fine-tune LLMs to better align with human preferences. Reinforcement Learning from Human Feedback (RLHF) is a prominent example of such a technique [1-5]. RLHF involves training a separate reward model to capture human preferences based on collected data. Subsequently, this reward model is used to guide the fine-tuning of the LLM using reinforcement learning algorithms [1-5].

Although RLHF has achieved impressive results, it presents challenges:

- Complexity: It necessitates training multiple LLMs, including a reward model and a policy model [1-3].
- Instability: Training with reinforcement learning algorithms can be unstable [1, 2].

The complexity of RLHF is rooted in its multi-stage process. First, a pre-trained LLM is often fine-tuned using supervised learning on high-quality data relevant to the target task, such as dialogue, summarization, or question answering. This initial fine-tuning stage yields a model known as πSFT [5, 6]. Next, the πSFT model is used to generate pairs of responses for various prompts, which are then presented to human labelers to elicit their preferences. These preferences, captured in a dataset, serve as the foundation for training a reward model [1, 3, 4, 6, 7]. Finally, reinforcement learning algorithms, like Proximal Policy Optimization (PPO), are employed to optimize the LLM policy to generate outputs that maximize the learned reward. Throughout this process, measures are taken to prevent the policy from deviating excessively from the original model, ensuring coherence and avoiding over-optimization to the reward model's potentially flawed understanding of human preferences [3, 6, 8, 9].

The development of DPO was motivated by the desire to find a simpler and more stable approach to aligning LLMs with human preferences while maintaining the effectiveness of RLHF.

## Direct Preference Optimization (DPO)

Direct Preference Optimization (DPO) is a technique for aligning large language models (LLMs) with human preferences that is presented as a simpler and more stable alternative to RLHF [1-3]. DPO accomplishes this by finding the optimal policy corresponding to the reward model and expressing it in a closed form, allowing it to be trained with just a simple classification loss [2]. This eliminates the need for a separate reinforcement learning step [1-3].

### How DPO Works

The key idea behind DPO is to reparameterize the reward model in a way that allows for the direct extraction of its optimal policy [4]. Instead of first training a reward model and then using reinforcement learning to optimize the policy, DPO uses a change of variables to define the preference loss directly as a function of the policy [4].

In essence, the DPO algorithm identifies a mapping between reward functions and policy models, enabling it to represent both within a single network [5]. This mapping allows the algorithm to transform a loss function defined over reward functions into a loss function defined over policies, eliminating the need for an explicit reward model. [5].

The DPO objective function is designed to maximize the likelihood of the policy model generating the preferred responses while staying close to the reference model. This objective function incorporates a parameter (β) that controls the trade-off between reward maximization and the divergence from the reference policy [6].

During training, the DPO algorithm updates the policy model by increasing the probability of generating preferred completions and decreasing the probability of generating dispreferred completions. Importantly, the weight assigned to each example during training is determined by the discrepancy between the model's implicit reward and the actual human preferences [7, 8]. This dynamic weighting mechanism helps prevent the model from degenerating and encourages it to learn from its mistakes.

### DPO Implementation

DPO involves two main steps:

1. Data Collection: Gather a dataset of prompts and human preferences for different model-generated responses [9]. DPO supports both paired preferences, where human raters choose between two outputs, and unpaired binary labels, such as "thumbs up" and "thumbs down" feedback on individual outputs [10].
2. Optimization: Directly optimize the policy model using the DPO loss function to minimize the difference between the model's implicit reward rankings and the actual human preferences [9].

### DPO Benefits

- Simplicity: DPO simplifies the preference learning pipeline by eliminating the need for explicit reward modeling and reinforcement learning [11].
- Stability: DPO training is generally more stable than RLHF due to the absence of the complex dynamics introduced by reinforcement learning [2, 12].
- Computational Efficiency: DPO reduces the computational cost of training as it doesn't require sampling from the language model during fine-tuning [2, 12].
DPO Performance

Experiments have demonstrated that DPO can achieve performance comparable to or even better than RLHF in tasks like sentiment modulation, summarization, and dialogue, even with minimal hyperparameter tuning [2, 13].

In sentiment generation tasks, DPO exhibits a more efficient trade-off between maximizing reward and minimizing the KL divergence from the reference policy compared to PPO, a common RL algorithm [14]. Notably, DPO achieves this superior performance even when PPO has access to ground truth rewards [14].

In summarization tasks, DPO surpasses PPO and the Best of N baseline in terms of win rate against human-written summaries, demonstrating its effectiveness in generating high-quality summaries [15]. It is also worth noting that DPO is more robust to changes in the sampling temperature, a parameter that controls the randomness of the model's output, compared to PPO [15].

In single-turn dialogue tasks, DPO is the only method that consistently improves over the preferred completions in the Anthropic HH dataset, indicating its superior performance in aligning with human preferences in conversational settings [16]. DPO also exhibits comparable or better performance compared to the Best of 128 baseline, a computationally expensive method that involves sampling multiple responses and selecting the best one based on a learned reward function [16].

### Further Considerations

While DPO offers several advantages over RLHF, it is important to consider potential limitations:

- Generalization: Further research is needed to understand how DPO policies generalize to out-of-distribution data compared to models trained with explicit reward functions [17].
- Reward Over-Optimization: Investigating the manifestation of reward over-optimization in the DPO setting and its potential impact on performance remains an open question [17].
- Scaling: Exploring the scalability of DPO to larger language models, which are orders of magnitude larger than the ones evaluated in the sources, is an exciting direction for future research [17].

DPO represents a significant advancement in preference optimization for LLMs, providing a simpler, more stable, and computationally efficient alternative to RLHF. Its success has spurred the development of various related algorithms and opened up new avenues for research in aligning language models with human preferences.

## Key Concepts in Preference Optimization

Preference optimization aims to fine-tune LLMs to better align with human preferences. Here are some key concepts related to preference optimization:

- Preference Data: This is the foundation of preference optimization. It consists of prompts and human judgments on different model-generated responses to those prompts [1-4]. This data can be in the form of:
  - Paired comparisons, where humans choose the preferred response from two options [1, 2, 4-6].
  - Binary labels, such as thumbs up or thumbs down, indicating whether a single response is desirable or not [7-9].
  - Rankings, where humans rank multiple responses from best to worst [10, 11].
- Reward Model: This is a function that assigns a score to each response, reflecting how desirable it is according to human preferences [1, 2, 5, 12, 13]. The reward model can be:
  - Explicitly trained, as in RLHF, where a separate neural network is trained to predict human preferences [2, 5, 12, 13].
  - Implicit, as in DPO, where the reward function is embedded within the policy network itself [14-17].
- Policy Model: This is the LLM being optimized. It takes a prompt as input and generates a response [2, 6, 12, 14, 18]. The policy model is trained to maximize the expected reward, leading to the generation of more human-preferred responses.
- Reference Model: This is a pre-trained LLM that serves as a starting point for preference optimization [1, 2, 5, 6, 17-19]. The reference model is often fine-tuned with supervised learning on high-quality data before preference optimization to improve its performance on the target task.
- KL Divergence: This is a measure of how much a policy model deviates from the reference model [2, 18, 20-24]. It acts as a regularizer to prevent the policy model from drifting too far from the original model and helps maintain the model's coherence and general knowledge.- Bradley-Terry Model: This is a mathematical model for analyzing paired comparison data [3, 5, 11, 12, 17, 25]. It assumes that the probability of one response being preferred over another is a function of the difference in their latent scores, which are determined by the reward model.

### Challenges in Preference Optimization

Several challenges need to be addressed to improve preference optimization:

- Data Quality: Human preferences can be noisy, subjective, and context-dependent, making it challenging to train accurate reward models.
Reward Over-Optimization: Policy models may learn to exploit flaws in the reward model or generate outputs that achieve high reward without truly aligning with human preferences.
- Generalization: It is crucial for the policy model to generalize well to new prompts and unseen data, which can be challenging with limited preference data.

These concepts form the foundation for understanding various preference optimization techniques, including RLHF and DPO. Further research and development in these areas will be crucial for aligning increasingly powerful LLMs with human values and preferences.

## Other Preference Optimization Algorithms

Besides DPO, the sources discuss other significant algorithms in the field of preference optimization.

Kahneman-Tversky Optimization (KTO) [1-3]: This method utilizes the principles of prospect theory, a behavioral economics theory that describes how people make decisions under risk, to align LLMs with human preferences. It maximizes the utility of model outputs instead of focusing on preference likelihood.
Unlike other preference optimization algorithms that require paired preferences, KTO only needs binary labels (desirable/undesirable) to train the model [1-3].
This simplifies data collection and makes KTO suitable for real-world applications where preference data is limited.
KTO leverages the concept of a reference point, representing the decision-maker's current state.
The algorithm evaluates outputs based on their perceived gains or losses relative to this reference point.
KTO incorporates loss aversion, a key principle of prospect theory, positing that the pain of a loss is greater than the pleasure of an equivalent gain.
The KTO loss function adjusts the model's output probabilities to align with human preferences by considering both the magnitude and the direction of the deviation from the reference point.
Experiments show that KTO achieves comparable or superior performance to preference-based methods like DPO, even at large model scales [2, 3].
Furthermore, KTO can effectively align LLMs without requiring prior supervised finetuning (SFT) at large scales, a capability not observed in other tested methods [4].

Sequence Likelihood Calibration (SLiC): The sources explain that SLiC aims to improve the alignment of language models with human preferences while maintaining the overall quality of generated text [1, 2]. It achieves this by combining a max-margin loss for preferences with a standard language modeling loss [2]. The max-margin loss encourages the model to assign higher probabilities to preferred outputs compared to less preferred outputs [2]. The language modeling loss helps maintain fluency and prevents the model from deviating too far from the training data distribution [2].

Identity-Preference Optimization (IPO): IPO was developed as a theoretical framework to address overfitting issues in DPO [2, 3]. The sources explain that it directly optimizes a regularized version of total preferences without relying on the Bradley-Terry model, which can be problematic with deterministic or near-deterministic preferences [2, 3]. IPO utilizes a bounded function for preference aggregation to ensure the KL regularization remains effective even with deterministic preferences [3]. This approach mitigates overfitting to the preference dataset, potentially at the cost of ignoring the KL-regularization term [4]. To enable practical optimization, IPO uses a sampled loss function, eliminating the need for reinforcement learning or reward modeling [5].

Discovered Preference Optimization (DiscoPOP): DiscoPOP emerged from an LLM-driven objective discovery process designed to generate state-of-the-art preference optimization algorithms automatically [6]. DiscoPOP dynamically blends logistic and exponential losses, with the weighting determined by a sigmoid calculation of the difference in log-ratios (ρ) [7]. DiscoPOP is notable for its non-convex segment and negative gradients at the start of training (ρ = 0), suggesting potential benefits for curriculum learning or introducing stochasticity. [8] DiscoPOP generally performs well across multiple held-out evaluation tasks, such as single-turn dialogue generation, summarization, and controlled sentiment generation [9]. However, it can struggle to converge with very low or very high β values, potentially due to limitations in the discovery process where β was fixed at 0.05 [10].

The sources emphasize that further research is needed to understand the relative strengths and weaknesses of different preference optimization approaches fully.

## Conclusion

Preference optimization is crucial for aligning LLMs with human values and preferences. [1, 2] DPO offers a simpler and more stable alternative to RLHF. [1, 2, 5-8] The field of preference optimization is rapidly evolving, with new algorithms like IPO, KTO, GPO, and DiscoPOP emerging. [5, 8, 12, 14, 15, 17, 20-27, 29, 30] This evolution is driven by the need to address limitations of existing methods, such as overfitting and the complexity of RLHF, and the desire to explore novel approaches to algorithm design, as exemplified by DiscoPOP's automatic discovery. [5, 8, 12, 14, 15, 17, 20-27, 29, 30] The continued advancement of these algorithms is essential for building safe, helpful, and reliable LLMs for the future. [17, 29, 30]