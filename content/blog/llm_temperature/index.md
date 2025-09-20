---
title: "Why are Sampling Knobs Disabled on Some Reasoning Models?"
date: "2025-09-04T22:01:03.284Z"
description: "A deep dive into how LLMs serialize prompts, output schemas, and tool descriptions into a token sequence, with examples from Llama 4's implementation."
featuredImage: llm_temperature/ogp.png
tags: ["en", "deep-learning", "nlp"]
---

![Unsupported value: 'temperature' does not support 0 with this model. Only the default (1) value is supported.](carbon.png)

<div style="text-align: center;"><small>Unsupported value: 'temperature' does not support 0 with this model. Only the default (1) value is supported.</small></div>

<br/>

Have you seen this error before? You try to pass temperature (or top_p, logprobs) to GPT-5 / o3 / o4-mini and the API rejects it. Why don't they support these sampling knobs?

To answer this question, let’s quickly review how sampling normally works in language models—and then we’ll sketch a plausible internal pipeline for modern “reasoning” models that explains why those knobs are turned off.

## Recap of temperature and sampling basics

Language models output a probability distribution over the **vocabulary** at each inference step. The raw model outputs are **logits** (unnormalized scores) for each token in the vocabulary. To convert logits to probabilities, we use the **softmax function**:

$$
p_i \;=\; \frac{\exp\!\left({z_i}\right)}
                  {\sum_{j=1}^K \exp\!\left({z_j}\right)}
$$

where $z_i$ is the logit for the $i$-th token, and $K$ is the vocabulary size. $K$ is typically in the order of 100K tokens for modern large language models (LLMs).

Let's say the model is predicting the next token that follows "I have a". The probability distribution might look like this:

![Distribution of tokens](2025-09-18-21-07-27.png)

In this case, the model generates "pen" 41% of the time, "ball" 27% of time, and so on. If you want to adjust the "creativity" of the output, you can do so by changing the **temperature** parameter, which rescales the logits before applying softmax. The temperature $T$ modifies the softmax function as follows:

$$
p_i(T) \;=\; \frac{\exp\!\left(\tfrac{z_i}{T}\right)}
                  {\sum_{j=1}^K \exp\!\left(\tfrac{z_j}{T}\right)}
$$

Let's stop here for a moment and think about what this means. When $T=1$, the distribution is identical to the original softmax distribution. When $T \to \infty$, $p_i(T)$ approaches $\frac{1}{K}$, which is a uniform distribution over all tokens. When $T \to 0$, $p_i(T)$ approaches a one-hot distribution that puts all the probability mass on the token with the highest logit. This is called "**greedy decoding**," which deterministically picks the highest-probability token. [^1]

You can see this effect in the figure below. Here's the effect of different temperature settings ($T=0.1, 1, 10$):

![Distribution of tokens (T=0.1, 1, 10)](2025-09-18-21-10-54.png)

Here's another visualization of how temperature affects the distribution:

![Distribution of tokens with different temperatures](2025-09-18-21-08-22.png)

## Recap of sampling strategies

The above describes naive sampling, where you sample directly from the full softmax distribution. This can lead to incoherent or repetitive text, especially in long generations. To mitigate this, several sampling strategies have been developed.

### Top-k sampling

![Top-k and top-p](top_pk.png)

<div style="text-align: center;"><small>Top-k and top-p cut off the candidate tokens with the given threshold.</small></div>

<br/>


**Top-k sampling** truncates the candidate pool to the top k tokens, then samples. It reduces crazy low-probability picks while keeping some variety. However, choosing the optimal $k$ is challenging and can lead to abrupt cutoffs in the distribution.  ￼

### Top-p sampling

**Top-p sampling**, also known as **nucleus sampling**, adapts the token pool based on probability mass rather than a fixed count. Instead of picking the top $k$ tokens, it keeps the smallest set of tokens whose cumulative prob ≥ p, then samples. So `top_p=0.6` means only the tokens comprising the top 60% of the probability mass are considered. This adapts the pool size to uncertainty and often yields more natural, less degenerate text than naive sampling.

### Sampling with search and re-ranking

The above strategies sample one token at each position in the sequence, which can lead to locally optimal but globally suboptimal sequences. Is it possible to improve quality by considering multiple candidate sequences? Yes, through search and re-ranking.

![Sampling with search and re-ranking](2025-09-20-17-49-57.png)

<div style="text-align: center;"><small>Advanced sampling methods with search and re-ranking. Image taken from "<a href="https://arxiv.org/abs/2408.03314v1">Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters</a>."
</small></div>

<br/>

**Best-of-N sampling** is the simplest form of such an approach: generate $N$ independent samples and pick the best one according to some scoring function (e.g., **perplexity**, or a separate value function ("verifier")). This can improve quality but is more computationally expensive.

**Beam search** keeps track of the top $B$ candidate sequences (beams) at each step, expanding each beam with all possible next tokens and retaining only the top $B$ overall. This allows the model to explore multiple paths and can yield higher-quality text.

**Lookahead search** goes even further by simulating multiple future steps for each candidate token, estimating the long-term value of each choice. This is more computationally intensive but can significantly improve coherence and relevance.

## So why are the knobs disabled on reasoning models?

Short version: because the decoding pipeline for o-series / GPT-5-class reasoning models isn’t a single ancestral sample you should tweak directly. It’s an internally-tuned multi-pass process that trades simple sampling knobs for reasoning effort and safety/reliability. OpenAI/ Azure docs explicitly list these parameters as unsupported for reasoning models (e.g., temperature, top_p, penalties, logprobs, logit_bias, etc.).  ￼

OpenAI’s public posts emphasize that these models learn to “think” longer and do better when they’re allowed more test-time reasoning. That’s a strong hint they generate multiple candidate thought paths and use some form of verification/selection under a compute budget—rather than exposing raw sampling controls.  ￼

A plausible internal picture (what likely happens under the hood)

1. Fixed policy sampler
The system runs with internally chosen temperature/nucleus/repetition controls calibrated to the model’s RL training and safety filters. This produces multiple candidate reasoning traces under a compute budget (the “reasoning effort”). External temperature/top_p would destabilize those internals, so they’re disabled.  ￼

2. Opportunistic tool use
Inside traces, the model may call tools (Python, web, vision, file readers). Different tool outcomes can branch traces. This is consistent with OpenAI’s descriptions of more time “thinking” and stronger tool use in o-series.

3. Verifier / reranker / consensus
The system likely selects among candidate traces with a learned value model, a heuristic vote (self-consistency), or a reranker. OpenAI has publicly highlighted that performance improves with more time thinking, and they’ve reported consensus-style metrics on hard benchmarks—consistent with internal multi-sample selection rather than a single pass.  
￼
4. Post-selection output (no raw logprobs)
The final answer is a post-selected artifact (possibly stitched from several internal passes). Token-level logprobs of that final text would be misleading (they wouldn’t reflect one ancestral sample), which is why logprobs is listed as unsupported.  ￼

## Conclusion

- Reasoning models run a calibrated multi-pass decoding recipe (internal sampling + branching + checking) to keep chains of thought stable, safe, and high-quality.
- Letting callers change temperature/top_p would fight those calibrations and increase variance in safety and correctness.
- Instead of sampling knobs, you get a “reasoning effort” knob (compute budget) and tool permissions.
- Disabling logprobs avoids reporting numbers that no longer correspond to a single straight-through decode.
- You can still influence style/creativity on non-reasoning models with standard knobs; for reasoning models, think in terms of effort and tools.

[^1]: If you are interested in the (non-)determinism of LLMs, [this blog post from Thinking Machines](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/) is a great read.