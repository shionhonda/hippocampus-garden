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

Here's the effect of different temperature settings ($T=0.1, 1, 10$):


![Distribution of tokens (T=0.1, 1, 10)](2025-09-18-21-10-54.png)

As you can see, higher temperatures (T > 1) flatten the distribution, putting more weight on rare tokens. On the other hand, lower temperatures (T < 1) make the distribution peakier, favoring high-probability tokens more strongly. In theory you cannot set $T=0$ because that would lead to division by zero; however, model providers interpret $T=0$ as "**greedy decoding**," which always picks the highest-probability token. [^1]

Here's another visualization of how temperature affects the distribution:

![Distribution of tokens with different temperatures](2025-09-18-21-08-22.png)

## Recap of sampling strategies

The above describes naive sampling, where you sample directly from the full softmax distribution. This can lead to incoherent or repetitive text, especially in long generations. To mitigate this, several sampling strategies have been developed:

### Top-k sampling


Top-k truncates the candidate pool to the top k tokens, then samples. It reduces crazy low-probability picks while keeping some variety. Fixed k can be brittle across contexts (flat vs. sharp distributions).  ￼

### Top-p (nucleus) sampling

Top-p (aka nucleus) keeps the smallest set of tokens whose cumulative prob ≥ p, then samples. This adapts the pool size to uncertainty and often yields more natural, less degenerate text than beam or naive sampling.  ￼

![](top_pk.png)

### Beam search

Beam search tracks multiple high-probability partial sequences and expands them step-by-step, returning the best overall. Great for tasks like translation/summarization, but can over-optimize for likelihood and become repetitive in open-ended generation.  ￼

### MCTS (Monte-Carlo Tree Search), conceptually

Instead of deciding one token at a time with only local scores, MCTS searches a small tree of continuations and uses a learned value or discriminator to guide rollouts toward globally better completions. It’s been shown to help with constrained or value-guided generation (e.g., polarity control, PPO value-guided decoding). It’s powerful but compute-heavy.  ￼

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