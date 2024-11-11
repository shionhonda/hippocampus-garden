---
title: "Preference optimization"
date: "2024-11-13T22:01:03.284Z"
description: ""
featuredImage: preference_optimization/ogp.jpg
tags: ["en", "nlp", "deep-learning"]
---

The process of controlling the behavior of LLMs to align with human values, which is called **preference optimization**, remains challenging due to the complexity of human preferences. The most common approach is **reinforcement learning from human feedback (RLHF)**, but it has limitations such as complexity and instability because it requires training a separate reward model (which is also an LLM). To address these challenges, many new algorithms have been developed, such as **direct preference optimization** (**DPO**) and **Kahneman-Tversky optimization** (**KTO**). This post will introduce different preference optimization algorithms and discuss their benefits and challenges.

## Key Concepts in Preference Optimization

Here are some key concepts related to preference optimization:

- Preference data: This is the foundation of preference optimization. It consists of prompts and human judgments on different model-generated responses to those prompts. This data can be in the form of:
  - Paired comparisons, where humans choose the preferred response from two options.
  - Binary labels, such as thumbs up or thumbs down, indicating whether a single response is desirable or not.
  - Rankings, where humans rank multiple responses from best to worst.
- Reward model: This is a function that assigns a score to each response, reflecting how desirable it is according to human preferences. The reward model can be:
  - Explicitly trained, as in RLHF, where a separate neural network is trained to predict human preferences.
  - Implicit, as in DPO, where the reward function is embedded within the policy network itself.
- Policy model: This is the LLM being optimized. It takes a prompt as input and generates a response. The policy model is trained to maximize the expected reward, leading to the generation of more human-preferred responses.
- Reference model: This is a pre-trained LLM that serves as a starting point for preference optimization. The reference model is often fine-tuned with supervised learning on high-quality data before preference optimization to improve its performance on the target task. We prevent the policy model from deviating too far from the reference model to maintain coherence and general knowledge, often by using the KL divergence as a regularizer.
- Loss function: This is a function that quantifies the difference between the model's output and human preferences. This can be based on a certain mathematcical model for preference data, such as the **Bradley-Terry model** for paired comparisons.

Several challenges need to be addressed to improve preference optimization:

- Data quality: Human preferences can be noisy, subjective, and context-dependent, making it challenging to train accurate reward models.
- Reward over-optimization: Policy models may learn to exploit flaws in the reward model or generate outputs that achieve high reward without truly aligning with human preferences.
- Generalization: It is crucial for the policy model to generalize well to new prompts and unseen data, which can be challenging with limited preference data.

## Direct Preference Optimization

DPO is an innovative technique for aligning LLMs with human preferences. Presented as a simpler and more stable alternative to RLHF, DPO addresses some of the complexities associated with traditional preference optimization methods.

### How DPO Works

At the core of DPO is a reimagined approach to preference alignment. Unlike RLHF, DPO directly optimizes the policy by reparameterizing the reward model. This is achieved through a clever change of variables that allows the reward model's optimal policy to be expressed in a closed form.

The DPO algorithm essentially creates a bridge between reward functions and policy models, enabling them to be represented within a single network. This integration transforms the task of preference optimization into a straightforward classification problem, eliminating the need for an explicit reward model. By doing so, DPO simplifies the training process significantly.

DPO involves two main steps:

1. Data collection: Gather a dataset of prompts and paired human preferences for different model-generated responses
2. Optimization: Directly optimize the policy model using the DPO loss function

### DPO Benefits

Experiments have shown that DPO can achieve performance comparable to RLHF while enjoying several key advantages:

- Simplicity: DPO simplifies the preference learning pipeline by eliminating the need for explicit reward modeling and reinforcement learning.
- Stability: DPO training is generally more stable than RLHF due to the absence of the complex dynamics introduced by reinforcement learning.
- Computational efficiency: DPO reduces the computational cost of training as it doesn't require sampling from the language model during fine-tuning.

## Beyond DPO: Other Preference Optimization Algorithms

Besides DPO, there are other significant algorithms in the field of preference optimization.

**Sequence likelihood calibration** (**SLiC**) aims to improve the alignment with human preferences while maintaining the overall quality of generated texts by combining a max-margin loss for preferences with a standard language modeling loss. The max-margin loss encourages the model to assign higher probabilities to preferred outputs and the language modeling loss helps maintain fluency.

**Identity-preference optimization** (**IPO**) was developed as a theoretical framework to address overfitting issues in DPO. It directly optimizes a regularized version of total preferences without relying on the Bradley-Terry model, which can be problematic with deterministic or near-deterministic preferences. IPO utilizes a bounded function for preference aggregation to ensure the KL regularization remains effective even with deterministic preferences. This approach mitigates overfitting to the preference dataset, potentially at the cost of ignoring the KL-regularization term.

**Kahneman-Tversky optimization** (KTO) utilizes the principles of prospect theory, a behavioral economics theory that describes how people make decisions under risk, to align LLMs with human preferences. It maximizes the utility of model outputs instead of focusing on preference likelihood.
Unlike other preference optimization algorithms that require paired preferences, KTO only needs binary labels (desirable/undesirable) to train the model [1-3].
This simplifies data collection and makes KTO suitable for real-world applications where preference data is limited.
KTO leverages the concept of a reference point, representing the decision-maker's current state.
The algorithm evaluates outputs based on their perceived gains or losses relative to this reference point.
KTO incorporates loss aversion, a key principle of prospect theory, positing that the pain of a loss is greater than the pleasure of an equivalent gain.
The KTO loss function adjusts the model's output probabilities to align with human preferences by considering both the magnitude and the direction of the deviation from the reference point.
Experiments show that KTO achieves comparable or superior performance to preference-based methods like DPO, even at large model scales [2, 3].
Furthermore, KTO can effectively align LLMs without requiring prior supervised finetuning (SFT) at large scales, a capability not observed in other tested methods [4].

Generalized Preference Optimization (GPO): GPO is a novel preference optimization algorithm that extends the capabilities of existing methods by incorporating a generalized loss function [6]. The sources note that GPO can handle a wide range of preference data types, including paired comparisons, rankings, and binary labels [6]. By leveraging a unified loss function, GPO simplifies the preference optimization process and improves the model's ability to align with human preferences across diverse tasks [6]. GPO's flexibility and adaptability make it a promising approach for training large-scale language models effectively [6].

Discovered Preference Optimization (DiscoPOP): DiscoPOP emerged from an LLM-driven objective discovery process designed to generate state-of-the-art preference optimization algorithms automatically [6]. DiscoPOP dynamically blends logistic and exponential losses, with the weighting determined by a sigmoid calculation of the difference in log-ratios (ρ) [7]. DiscoPOP is notable for its non-convex segment and negative gradients at the start of training (ρ = 0), suggesting potential benefits for curriculum learning or introducing stochasticity. [8] DiscoPOP generally performs well across multiple held-out evaluation tasks, such as single-turn dialogue generation, summarization, and controlled sentiment generation [9]. However, it can struggle to converge with very low or very high β values, potentially due to limitations in the discovery process where β was fixed at 0.05 [10].

The sources emphasize that further research is needed to understand the relative strengths and weaknesses of different preference optimization approaches fully.

## Conclusion

Preference optimization is crucial for aligning LLMs with human values and preferences. [1, 2] DPO offers a simpler and more stable alternative to RLHF. [1, 2, 5-8] The field of preference optimization is rapidly evolving, with new algorithms like IPO, KTO, GPO, and DiscoPOP emerging. [5, 8, 12, 14, 15, 17, 20-27, 29, 30] This evolution is driven by the need to address limitations of existing methods, such as overfitting and the complexity of RLHF, and the desire to explore novel approaches to algorithm design, as exemplified by DiscoPOP's automatic discovery. [5, 8, 12, 14, 15, 17, 20-27, 29, 30] The continued advancement of these algorithms is essential for building safe, helpful, and reliable LLMs for the future. [17, 29, 30]
