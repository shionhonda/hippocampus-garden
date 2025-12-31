---
title: Top 5 AI Papers of 2025
date: "2025-12-31T22:02:03.284Z"
description: "This article picks five notable AI papers from 2025 and summarizes their key ideas and limitations, including reinforcement learning for reasoning, agent benchmarks, long‑task metrics, and a statistical explanation of hallucinations."
featuredImage: ai_papers_2025/ogp.jpg
tags: ["en", "deep-learning", "llm"]
---

2025 was a year when post‑training for large language models (LLMs) made big steps forward. New techniques helped models think more carefully, while new benchmarks and metrics tried to measure reliability and safe use. In industry we saw strong systems like GPT‑5, Gemini 3 and Claude 4.5, and agent tools such as Cursor and Claude Code changed how people code and learn. Playing with these products is the best way to understand them, but to see what problems remain and what might happen in the next few years, it also helps to look at research. This article picks five papers from 2025 that I found important. It explains their main ideas, why they matter, and where they fall short, for engineers and people in tech.

If you are interested, you can also read [my 2024 review](https://hippocampus-garden.com/deep_learning_2024/).

## DeepSeek‑R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning

* Authors: DeepSeek AI
* Paper: https://arxiv.org/abs/2501.12948v1
* Model weight: https://huggingface.co/deepseek-ai/DeepSeek-R1
* Venue: Nature

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Incentivizing Reasoning Capability in LLMs via RL [DeepSeek-AI, 2025]<br>R1-Zero acquired o1-level reasoning capability without SFT through GRPO, which rewards correct answers. The team also released weights of R1 with SFT and distilled models.<a href="https://t.co/5n5aX6wcId">https://t.co/5n5aX6wcId</a><a href="https://twitter.com/hashtag/NowReading?src=hash&amp;ref_src=twsrc%5Etfw">#NowReading</a> <a href="https://t.co/omuRVMId9l">pic.twitter.com/omuRVMId9l</a></p>&mdash; Shion Honda (@shion_honda) <a href="https://twitter.com/shion_honda/status/1885992551905153518?ref_src=twsrc%5Etfw">February 2, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


This paper from DeepSeek AI tries to pull out long chains of reasoning from an LLM without using any human‑written reasoning examples. The authors start with DeepSeek V3, their base model, and use **group relative policy optimization** (**GRPO**) [^1] to do reinforcement learning. During training they only give a reward when the model's answer is correct on math or programming questions. They use special tags like \<think/\> and \<answer/\> to tell the model to think first and then answer. This setup makes the model develop its own long **chain‑of‑thought** (**CoT**). For example, on the AIME 2024 math competition the pass@1 score jumps from 15.6% to 71%.

Two points make this work interesting:

1. Learning without human annotations. Before R1, most LLM post‑training used **supervised fine‑tuning** (**SFT**) and **reinforcement learning from human feedback** (**RLHF**). These methods need labelled data and can introduce bias. The authors build R1‑zero, a model that only uses correct/incorrect rewards from verifiable tasks like math. This approach is called **reinforcement learning with verifiable rewards** (**RLVR**), which the Tulu 3 paper[^2] originally proposed, and shows that pure RL can reach the level of OpenAI's o1 model. Note that R1‑zero still had problems like mixing languages and strange wording, so the authors also released R1, which adds SFT to fix these.
2. Emergent long thinking. During RL training the model starts to spend more time thinking. It changes its plan many times until it finds the right answer. On hard problems it can generate thousands of tokens of reasoning. Before R1 came out, many people were trying to reproduce the o1 model. This paper provided a clear recipe for making a model think longer. The paper also discusses other methods, like **process reward models** and **Monte‑Carlo tree search**, that did not work as well.

DeepSeek AI released the R1 models and weights openly. In January 2025 this release triggered what some people called the "DeepSeek shock." The DeepSeek mobile app jumped to the top of the AppStore in several countries, even above ChatGPT, and Nvidia's share price fell. Many Chinese companies, including Alibaba, Moonshot AI and Z.ai, started releasing open‑weight models with performance close to closed models.

You can read more about this paper in [my blog post from March 2025](https://medium.com/alan/deepseek-r1-demystifying-llms-reasoning-capabilities-f6332154349b).

## Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?

* Authors: Yang Yue, Zhiqi Chen, Rui Lu, Andrew Zhao, Zhaokai Wang, Yang Yue, Shiji Song, Gao Huang
* Paper: https://openreview.net/forum?id=4OsgYD7em5
* Project page: https://limit-of-rlvr.github.io/
* Code: https://github.com/LeapLabTHU/limit-of-RLVR
* Venue: NeurIPS 2025

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Does RL incentivize reasoning capacity in LLMs? [Yue+, 2025, NeurIPS]<br>By evaluating pass@k at large k, the paper shows that RLVR improves sampling efficiency but does not introduce new reasoning patterns.<a href="https://t.co/H7erJQRnPX">https://t.co/H7erJQRnPX</a><a href="https://twitter.com/hashtag/NowReading?src=hash&amp;ref_src=twsrc%5Etfw">#NowReading</a> <a href="https://t.co/IrnUE3TVaY">pic.twitter.com/IrnUE3TVaY</a></p>&mdash; Shion Honda (@shion_honda) <a href="https://twitter.com/shion_honda/status/2000211219911684138?ref_src=twsrc%5Etfw">December 14, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This paper looks at the limits of **RLVR**, the idea used in DeepSeek R1 and Tulu 3. The authors test several RLVR models, including DeepSeek R1 and OpenAI's o1, on math, coding and visual reasoning benchmarks. They measure **pass@k** up to very large k. They find that RLVR models are better than the base model when k is small, but when k grows the base model catches up and eventually beats the RLVR model. Analysis shows that RLVR models mainly sample answers that already exist in the base model. In other words, RLVR improves sampling efficiency but does not create new reasoning patterns.

Why does this happen? At the core is how hard exploration becomes under a 0/1 reward. In RLVR, you only get reward for an exactly correct output, so when the base model cannot solve a problem, there is no gradient signal to learn from. The model therefore concentrates on familiar, high‑hit‑rate patterns, and its output distribution collapses sharply around answers that already receive reward. This reduces the diversity of reasoning patterns that the base model originally had, so at larger k the base model's diversity can win out and you see a pass@k reversal. By contrast, **distillation** can inject the teacher's reasoning patterns into the student.

As paths toward acquiring genuinely new capabilities, the authors point to approaches such as process rewards that score intermediate steps, credit assignment via value functions, curriculum learning with large and dynamic data, stronger exploration methods, and agent frameworks that incorporate tool use. Credit assignment with value functions is something Ilya Sutskever also called promising in a [recent interview](https://youtu.be/aR20FWCCjAs?si=kdWGhLAUgKkI_cna).

## τ‑bench: A Benchmark for Tool‑Agent‑User Interaction in Real‑World Domains

* Authors: Shunyu Yao, Noah Shinn, Pedram Razavi, Karthik Narasimhan
* Paper: https://openreview.net/forum?id=roNSXZpUDN
* Project page: https://taubench.com/
* Code: https://github.com/sierra-research/tau2-bench
* Venue: ICLR 2025

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">A Benchmark for Tool-Agent-User Interaction in Real-World Domains [Yao+, 2024]<br>τ-bench evaluates LLM agents&#39; human interaction and rule adherence in real-world domains (retail and airline)—key aspects missing from existing evaluations.<a href="https://t.co/Cmuch8sg6v">https://t.co/Cmuch8sg6v</a><a href="https://twitter.com/hashtag/NowReading?src=hash&amp;ref_src=twsrc%5Etfw">#NowReading</a> <a href="https://t.co/K0rXlvCtCe">pic.twitter.com/K0rXlvCtCe</a></p>&mdash; Shion Honda (@shion_honda) <a href="https://twitter.com/shion_honda/status/1903807793028567123?ref_src=twsrc%5Etfw">March 23, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Sierra AI points out that many agent benchmarks test only single turns or single API calls. In real life, agents need to talk over many turns, follow domain rules, and use tools to change the state. **τ‑bench** simulates these interactions with three parts: a tool (API), an agent and a user (simulated by an LLM). It judges success by checking both the conversation and the final database state.

![](2025-12-31-11-14-42.png)

Key features include:

* Real conversations and tools. There are domain‑specific APIs for airline and retail tasks, and a local JSON database. A simulated user asks questions according to a scenario, creating multi‑turn dialogue.
* Evaluation based on database state. In addition to **LLM-as-a-judge**, τ‑bench checks whether the agent actually changes the state correctly. This fits real applications where the correct final state matters.
* Reliability metric **pass^k**. Unlike pass@k, which counts at least one success, pass^k requires success on all k runs. It measures how consistent an agent is[^3].

When the team evaluated τ‑bench with GPT‑4o, which was state‑of‑the‑art at the time, the average success rate was 48%, highlighting how challenging it still was to use these systems as agents. However, a closer look at the failures showed that some tasks were effectively impossible because of errors in the user simulator. In response, the Sierra AI team proposed **τ²‑bench**[^4], which improves simulation fidelity by requiring the user side to use tools as well. Since then, it has been widely referenced as a benchmark for measuring tool‑use capability in AI agents.

If you look at scores from different groups, be careful. As explained [in this article](https://medium.com/alan/benchmarking-ai-agents-stop-trusting-headline-scores-start-measuring-trade-offs-0fdae3a418cf), because τ‑bench is open source, results can depend on prompt tuning and time budgets, so comparisons are often not apples‑to‑apples.

## Measuring AI Ability to Complete Long Tasks

* Authors: Thomas Kwa, Ben West, Joel Becker, Amy Deng, Katharyn Garcia, Max Hasin, Sami Jawhar, Megan Kinniment, Nate Rush, Sydney Von Arx, Ryan Bloom, Thomas Broadley, Haoxing Du, Brian Goodrich, Nikola Jurkovic, Luke Harold Miles, Seraphina Nix, Tao Lin, Neev Parikh, David Rein, Lucas Jun Koba Sato, Hjalmar Wijk, Daniel M. Ziegler, Elizabeth Barnes, Lawrence Chan
* Paper: https://arxiv.org/abs/2503.14499
* Blog post: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
* Venue: NeurIPS 2025

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Measuring AI Ability to Complete Long Tasks [Kwa+, 2025] <br>&quot;50%-task-completion time horizon&quot; measures human experts&#39; time to complete tasks that AI models can do with 50% chance. The time horizon for SWE tasks has been doubling every 7 months.<a href="https://t.co/ItxoPCBTaO">https://t.co/ItxoPCBTaO</a><a href="https://twitter.com/hashtag/NowReading?src=hash&amp;ref_src=twsrc%5Etfw">#NowReading</a> <a href="https://t.co/alH6sLs2vr">pic.twitter.com/alH6sLs2vr</a></p>&mdash; Shion Honda (@shion_honda) <a href="https://twitter.com/shion_honda/status/1916101750160842883?ref_src=twsrc%5Etfw">April 26, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The non‑profit organization METR (Model Evaluation & Threat Research) proposes a metric based on time to finish a task, not just accuracy. They look at many software tasks, from research with Wikipedia to complicated coding. Human experts record how long each task takes. Then they see how long an AI model can achieve a 50 % success rate on the same tasks. They call this the **50% task completion time horizon**.

Some main observations:

* In March 2025, the best model (Claude 3.7 Sonnet) had a 50% horizon of 59 minutes. Models do almost perfectly on tasks that take humans less than four minutes, but do very poorly on tasks that take humans more than four hours. This shows that models still struggle with long memory and recovering from errors.
* Since 2019 the horizon has doubled roughly every seven months. If this trend continues, models might do week‑long tasks by around 2028–2031. But extrapolating is risky; algorithm breakthroughs or changes could break the trend.
* Growth comes not just from better reasoning but from being more reliable and better at using tools. This hints that reinforcement learning and agentic approaches are important.

![](2025-12-31-11-18-39.png)

<div style="text-align: center;"><small>Image taken from
<a href="https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/">
METR.org</a>.</small></div>

This metric is like an "AI Moore's Law" in the past 6 years, but there are limitations[^5]:

1. In late 2025 models like GPT‑5.1‑Codex‑Max reached around 2 hours 53 minutes, and Claude Opus 4.5 reached about 4 hours 49 minutes. However, the 1–4 hour range has only 14 tasks, so the estimates are noisy and easy to manipulate.
2. Because the task topics are public, labs could train on similar tasks ("benchmaxxing").
3. Most tasks are about cybersecurity or machine‑learning competitions, so this metric may not reflect general long‑task ability.

## Why Language Models Hallucinate

* Authors: Adam Tauman Kalai, Ofir Nachum, Santosh S. Vempala, Edwin Zhang
* Paper: https://arxiv.org/abs/2509.04664
* Blog post: https://openai.com/index/why-language-models-hallucinate/

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Why LMs Hallucinate [Kalai+, 2025]<br>LM pre-training is essentially density estimation and doesn&#39;t help prevent hallucination. Post-training can alleviate the issue by rewarding acknowledging uncertainty over guessing.<a href="https://t.co/mG31C7bAaa">https://t.co/mG31C7bAaa</a><a href="https://twitter.com/hashtag/NowReading?src=hash&amp;ref_src=twsrc%5Etfw">#NowReading</a> <a href="https://t.co/u9D0XkJBxv">pic.twitter.com/u9D0XkJBxv</a></p>&mdash; Shion Honda (@shion_honda) <a href="https://twitter.com/shion_honda/status/1965302226165133671?ref_src=twsrc%5Etfw">September 9, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This paper from OpenAI and Georgia Tech offers a statistical answer to a long‑standing question since LLMs emerged: why they confidently generate content that is not factual. Intuitively, the reason is that current evaluation metrics often favor guessing over being wrong, so when a model does not know, it tends to guess rather than say "I don't know."

For example, suppose you ask for someone's birthday during pretraining. The probability of the exact correct answer is 1/365, but replying "I don't know" is guaranteed to be counted as incorrect. If the metric is only accuracy, then random guessing can be the better move. Language models are good at pattern‑based generation, such as fluency and grammar, but they cannot reliably learn rare proper nouns or dates. Without consulting an external knowledge base, **hallucination** can systematically arise.

The authors argue that to help a model recognize its own ignorance and learn to refrain from answering when uncertain (to abstain), we need to evaluate not only accuracy but also honesty.

OpenAI [reported](https://openai.com/index/introducing-gpt-5/) a large reduction in hallucinations in GPT‑5, released in August 2025, and it has continued to reduce them in GPT‑5.1 and 5.2. This paper does not go into concrete methods for reducing hallucinations, and the causal link to GPT‑5 is unclear, but I found its core takeaway important: the design of evaluation metrics shapes model behavior, which matters for future quality evaluation and safety.

## Concluding Remarks

Overall, what I felt defined 2025 was the success of RLVR, the rapid shift toward LLMs becoming agents, and the emergence of new benchmarks to evaluate those capabilities. I'll keep watching what developments 2026 brings. Thank you for reading, wishing you a happy new year!

[^1]: Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, Y.K. Li, Y. Wu, Daya Guo. [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300). 2024.
[^2]: Nathan Lambert, Jacob Morrison, Valentina Pyatkin, Shengyi Huang, Hamish Ivison, Faeze Brahman, Lester James V. Miranda, Alisa Liu, Nouha Dziri, Shane Lyu, Yuling Gu, Saumya Malik, Victoria Graf, Jena D. Hwang, Jiangjiang Yang, Ronan Le Bras, Oyvind Tafjord, Chris Wilhelm, Luca Soldaini, Noah A. Smith, Yizhong Wang, Pradeep Dasigi, Hannaneh Hajishirzi. [Tulu 3: Pushing Frontiers in Open Language Model Post-Training](https://arxiv.org/abs/2411.15124). COLM. 2025.
[^3]: For tasks that are easy to verify, pass@k is a common metric. When the cost of a wrong answer is high, pass\^k is often more appropriate. See [mt previous post](https://hippocampus-garden.com/pass_k/) for more.
[^4]: Victor Barres, Honghua Dong, Soham Ray, Xujie Si, Karthik Narasimhan. [τ2-Bench: Evaluating Conversational Agents in a Dual-Control Environment](https://arxiv.org/abs/2506.07982). 2025.
[^5]: Shashwat Goel. [How to game the METR plot](https://shash42.substack.com/p/how-to-game-the-metr-plot). 2025.
