---
title: "Pass@k and Pass^k Tell Different Stories from Mean Success Rate"
date: "2025-10-28T22:01:03.284Z"
description: "."
featuredImage: pass_hat_k/ogp.png
tags: ["en", "deep-learning", "nlp"]
---

[Tau-bench](https://openreview.net/forum?id=roNSXZpUDN) (ICLR 2025) evaluates AI agents in realistic environments — with APIs, domain rules, and interactive user sessions. The key insight from the authors was unsettling: models that look good on average can become wildly unstable when run repeatedly.

To capture this instability, they proposed a new metric called pass^k, which measures the probability that an agent never fails across $k$ consecutive runs — a direct measure of reliability, not just average performance.

This article explains what pass^k really measures, why it differs fundamentally from pass@k or average success rate with simple examples.

## A Thought Experiment: The Coin and the Million-Dollar Game

Imagine the following game: you win $100 if you flip a coin and get 10 heads in a row.

You can choose one of two types of coins:

1. A fair coin (50% heads each toss).
2. A bag of two biased coins: one always heads, one always tails. You draw one coin at random and use it for all 10 flips.

Both options have the same average success probability per toss: 0.5. But the chance of 10 consecutive heads is drastically different:

- Fair coin: $(1/2)^{10} = 1/1024$
- Mixed coins: $1/2 \times 1^{10} + 1/2 \times 0^{10} = 1/2$

In other words, the same average success (0.5) yields “continuous success” that differs by 500x. That’s exactly what pass^k captures — the difference between occasional luck and consistent reliability.


## Defining the Metrics — Same $k$, Different Questions

Let each task $i$ have a single-run success probability $p_i \in [0, 1]$. Across tasks, these probabilities follow some distribution $P(p)$.

| Metric | Definition | Intuition |
| --- | --- | --- |
| Average success rate | $\mathrm{pass}^1 = \mathbb{E}[p]$ | “How often does it succeed once?” |
| Continuous success (pass^k) | $\mathrm{pass}^k = \mathbb{E}[p^k]$ | “How often does it succeed $k$ times in a row?” |
| Coverage (pass@k) | $\mathrm{pass}@k = \mathbb{E}[1 - (1-p)^k]$ | “How often does it succeed at least once in $k$ trials?” |


## A Toy Experiment: Same Mean, Different Shapes

Fix the average success rate at 0.5, but vary the shape of the per-task distribution.

| Scenario | Probabilities $p_i$ | Average | Standard deviation | Description |
| --- | --- | --- | --- | --- |
| homogeneous | 0.50 (100%) | 0.5 | 0.0 | Even skill on every task. |
| no skew | 0.20 (50%), 0.80 (50%) | 0.5 | ~0.30 | Half the tasks are easy wins, half are stubborn misses. |
| negative skew | 0.07 (~33%), 0.715 (~67%) | 0.5 | ~0.30 | Great at most tasks but extremely bad at the others |
| positive skew | 0.93 (~33%), 0.285 (~67%) | 0.5 | ~0.30 | Bad at most tasks but extremely good at the others |


## 1) k-Sweep: Comparing pass@k (Dashed) vs pass^k (Solid)

![pass@k vs. pass^k for different distributions.](./pass_hat_k.png)

Key takeaways:

- For the homogeneous case, pass@k converges to 1 and pass^k decays to 0 quickly.
- Heterogeneity (i.e., variance) in $p$ makes the convergence of both metrics slower, as we have seen in the coin example.
- Both metrics are sensitive to the skewness, not just the mean and variance. Positive skew yields higher pass@k and pass^k than negative skew.


## 2) Quantifying the Shape Effect: $\Delta_k$

We saw that heterogeneity in $P(p)$ can drastically change pass^k even with the same mean. Let’s quantify this effect as gain from heterogeneity:

$$
\Delta_k = \mathrm{pass}^k - (\mathrm{pass}^1)^k
$$

![Delta_k for non-homogeneous distributions.](./delta.png)

- For homogeneous → $\Delta_k = 0$.
- For heterogeneous → $\Delta_k > 0$: right-side mass lift pass^k.
- Without any $p = 1$ mass, $\Delta_k$ peaks at moderate $k$ then fades (as $\mathbb{E}[p^k] \to 0$).


## Why This Happens — Jensen’s Inequality, Visually

Let's check the math. For $k \ge 2$, $p^k$ is a convex function on $[0, 1]$, and always $p^k \le p$. By Jensen’s inequality,

$$
(\mathbb{E}[p])^k = \mu^k \le \mathbb{E}[p^k] \le \mathbb{E}[p] = \mu.
$$

Thus,

$$
\Delta_k = \mathbb{E}[p^k] - \mu^k \ge 0,
$$

meaning heterogeneity (mass near $p = 1$) always boosts pass^k.

If we fix $\mu$ but vary shape, the theoretical upper bound is

$$
\max \Delta_k = \mu - \mu^k,
$$

achieved by a two-point distribution

$$
P(p = 1) = \mu,\quad P(p = 0) = 1 - \mu.
$$

Intuitively, a few “always-correct” cases lift reliability far more than they lift average success.

Here is a smooth continuation you can paste under your Jensen section:

What About pass@k? While pass^k increases under heterogeneity (mass near p=1), pass@k actually decreases when per-task success rates are uneven. This is because $1-(1-p)^k$ is concave, so Jensen’s inequality flips:

$$
\mu \;\le\; \mathrm{pass}@k \;\le\; 1-(1-\mu)^k.
$$

In plain terms: retry helps homogeneously skilled agents more than uneven ones. If you’re consistently “okay” everywhere, retries almost guarantee a win — but if you’re brilliant on some tasks and hopeless on others, retries can’t save you on the hard cases.


## Key Takeaways

- pass@k measures coverage; pass^k measures reliability.
- pass@k is suitable for exploration. When you validate the output before using, pass@k tells how many samples to draw. 
- pass^k is suitable for reliability. When you can't afford failures, pass^k tells how reliable the system is over repeated uses.
- Even with identical means and variances, distribution shape (skewness, tails, multimodality) can change pass^k dramatically.

## Appendix: Code to Generate the Figures

```python
import numpy as np
import matplotlib.pyplot as plt

pss = np.array([
    [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],                # homogeneous
    [0.2, 0.8, 0.2, 0.8, 0.2, 0.8],                # no skew
    [0.07, 0.715, 0.715, 0.07, 0.715, 0.715],      # negative skew
    [0.93, 0.285, 0.285, 0.93, 0.285, 0.285]       # positive skew
])
labels = ["homogeneous", "no skew", "negative skew", "positive skew"]
colors = ["C0", "C1", "C2", "C3"]
ks = np.arange(1, 9)

def pass_at_k(ps, k):
    return np.mean(1 - (1 - ps) ** k)

def pass_hat_k(ps, k):
    return np.mean(ps ** k)

at_curves = [[pass_at_k(ps, k) for k in ks] for ps in pss]
hat_curves = [[pass_hat_k(ps, k) for k in ks] for ps in pss]
delta_curves = [[h - (ps.mean() ** k) for h, k in zip(hc, ks)]
                for ps, hc in zip(pss, hat_curves)]

# Figure 1: k-sweep
for i, (a, h) in enumerate(zip(at_curves, hat_curves)):
    plt.plot(ks, a, linestyle="--", c=colors[i])
    plt.plot(ks, h, label=labels[i])
plt.xlabel("k (repeated runs)")
plt.ylabel("Probability")
plt.ylim(0, 1.02)
plt.legend(ncol=2)
plt.grid(True, linestyle=":", linewidth=0.7)
plt.show()

# Figure 2: Δ_k
for i in range(1, len(labels)):   # skip homogeneous (always 0)
    plt.plot(ks, delta_curves[i], label=labels[i], c=colors[i])
plt.xlabel("k (repeated runs)")
plt.ylabel("Δ_k")
plt.legend()
plt.grid(True, linestyle=":", linewidth=0.7)
plt.show()
```
