---
title: "Measuring “Continuous Success” Beyond Average — Understanding pass^k in the Context of Tau-bench"
date: "2025-10-28T22:01:03.284Z"
description: "."
featuredImage: pass_hat_k/ogp.png
tags: ["en", "deep-learning", "nlp"]
---

## Background: Why Tau-bench Matters

Tau-bench (ICLR 2025) evaluates AI agents in realistic environments — with APIs, domain rules, and interactive user sessions. The key insight from the authors was unsettling: models that look good on average can become wildly unstable when run repeatedly.

To capture this instability, they proposed a new metric called pass$^k$, which measures the probability that an agent never fails across $k$ consecutive runs — a direct measure of reliability, not just average performance.

This article explains what pass$^k$ really measures, why it differs fundamentally from pass@k, and how even simple discrete examples reveal its importance — no Bayesian priors, no Beta assumptions required.

---

## A Thought Experiment: The Coin and the Million-Dollar Game

Imagine the following game: you win \$1 million if you flip a coin and get 10 heads in a row.

You can choose one of two types of coins:

1. A fair coin (50% heads each toss).
2. A bag of two biased coins: one always heads, one always tails. You draw one coin at random and use it for all 10 flips.

Both options have the same average success probability per toss: 0.5. But the chance of 10 consecutive heads is drastically different:

- Fair coin: $(1/2)^{10} = 1/1024$
- Mixed coins: $1/2$

In other words, the same average success (0.5) yields “continuous success” that differs by 500×. That’s exactly what pass$^k$ captures — the difference between occasional luck and consistent reliability.

---

## Defining the Metrics — Same $k$, Different Questions

Let each task $i$ have a single-run success probability $p_i \in [0, 1]$. Across tasks, these probabilities follow some distribution $P(p)$.

| Metric | Definition | Intuition |
| --- | --- | --- |
| Average success rate | $\mathrm{pass}^1 = \mathbb{E}[p]$ | “How often does it succeed once?” |
| Continuous success (pass$^k$) | $\mathrm{pass}^k = \mathbb{E}[p^k]$ | “How often does it succeed $k$ times in a row?” |
| Coverage (pass@k) | $\mathrm{pass}@k = \mathbb{E}[1 - (1-p)^k]$ | “If we try $k$ times, do we succeed at least once?” |

So:

- pass@k → “How many retries until we get something right?”
- pass$^k$ → “Can we avoid failure entirely for $k$ runs?”

Different questions. Different worlds.

---

## A Toy Experiment: Same Mean, Different Shapes

Fix the average success rate at 0.5, but vary the shape of the per-task distribution.

| Name | Probabilities $p_i$ | Description |
| --- | --- | --- |
| homogeneous | [0.5, 0.5, 0.5, 0.5, 0.5, 0.5] | perfectly uniform |
| no skew | [0.2, 0.8, 0.2, 0.8, 0.2, 0.8] | symmetric |
| negative skew | [0.07, 0.715, 0.715, 0.07, 0.715, 0.715] | many high-$p$ tasks, few very low |
| positive skew | [0.93, 0.285, 0.285, 0.93, 0.285, 0.285] | many low-$p$ tasks, few very high |

---

## 1) k-Sweep: Comparing pass@k (Dashed) vs pass$^k$ (Solid)

🖼️ Insert Figure 1 — pass@k (dashed) and pass$^k$ (solid) vs $k$.

Key takeaways:

- pass@k saturates quickly. For the homogeneous case, $\mathrm{pass}@8 \approx 0.996$, yet $\mathrm{pass}^8 = 0.5^8 \approx 0.004$. “Hit at least once” vs. “never miss once” are orders of magnitude apart.
- pass$^k$ is shape-sensitive. Positive skew yields the largest pass$^k$ (few high-$p$ tasks dominate via convexity), negative skew yields the smallest pass$^k$ (a thin low-$p$ tail kills reliability), homogeneous drops smoothly as $0.5^k$, and ranking can invert: a distribution worse in pass@k may be better in pass$^k$.

---

## 2) Quantifying the Shape Effect: $\Delta_k$

Define

$$
\Delta_k = \mathrm{pass}^k - (\mathrm{pass}^1)^k
$$

— the “gain from heterogeneity”.

🖼️ Insert Figure 2 — $\Delta_k$ for non-homogeneous distributions.

- For homogeneous → $\Delta_k = 0$.
- For heterogeneous → $\Delta_k > 0$: right-side mass or fat tails lift pass$^k$.
- Without any $p = 1$ mass, $\Delta_k$ peaks at moderate $k$ then fades (as $\mathbb{E}[p^k] \to 0$).

---

## Why This Happens — Jensen’s Inequality, Visually

The math is simple but deep. For $k \ge 2$, $p^k$ is a convex function on $[0, 1]$, and always $p^k \le p$. By Jensen’s inequality,

$$
(\mathbb{E}[p])^k \le \mathbb{E}[p^k] \le \mathbb{E}[p] = \mu.
$$

Thus,

$$
\Delta_k = \mathbb{E}[p^k] - \mu^k \ge 0,
$$

meaning heterogeneity (mass near $p = 1$) always boosts pass$^k$.

If we fix $\mu$ but vary shape, the theoretical upper bound is

$$
\max \Delta_k = \mu - \mu^k,
$$

achieved by a two-point distribution

$$
P(p = 1) = \mu,\quad P(p = 0) = 1 - \mu.
$$

Intuitively, a few “always-correct” cases lift reliability far more than they lift average success.

---

## Practical Use: Lessons from Tau-bench

| Use case | Metric | Question answered | Typical setting |
| --- | --- | --- | --- |
| Exploration | pass@k | “How many retries until we get one right?” | Idea generation, sampling, brainstorming |
| Reliability | pass$^k$ | “How often do we avoid all failures?” | Production, user-facing systems, compliance pipelines |

Consider an automated support agent that answers thousands of times a day. One failure can violate SLA/SLO targets. Here, pass$^k$ is the relevant metric — not average accuracy.

Recommended reporting set:

1. pass$^1$ (mean success rate) + confidence interval.
2. pass$^k$ curve across $k$ (reliability curve).
3. Optionally pass@k and $\Delta_k$ for coverage comparison.

Small $k$ (2–4) suits dev-testing gates; larger $k$ (4–8+) suits production SLOs.

---

## Minimal Reproducible Code

```python
import numpy as np, matplotlib.pyplot as plt

pss = np.array([
    [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],                # homogeneous
    [0.2, 0.8, 0.2, 0.8, 0.2, 0.8],                # no skew
    [0.07, 0.715, 0.715, 0.07, 0.715, 0.715],      # negative skew
    [0.93, 0.285, 0.285, 0.93, 0.285, 0.285]       # positive skew
])
labels = ["homogeneous", "no skew", "negative skew", "positive skew"]
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
for (a, h), lab in zip(zip(at_curves, hat_curves), labels):
    plt.plot(ks, a, linestyle="--")
    plt.plot(ks, h, label=lab)
plt.xlabel("k (repeated runs)")
plt.ylabel("Probability")
plt.ylim(0, 1.02)
plt.legend(ncol=2)
plt.grid(True, linestyle=":", linewidth=0.7)
plt.title("pass@k (dashed) vs pass^k (solid)")
plt.show()

# Figure 2: Δ_k
for dc, lab in zip(delta_curves[1:], labels[1:]):   # skip homogeneous (always 0)
    plt.plot(ks, dc, label=lab)
plt.xlabel("k (repeated runs)")
plt.ylabel("Δ_k")
plt.title("Δ_k = pass^k − (pass^1)^k")
plt.legend()
plt.grid(True, linestyle=":", linewidth=0.7)
plt.show()
```

---

## Key Takeaways

- pass@k measures coverage; pass$^k$ measures reliability.
- Even with identical means, distribution shape (skewness, tails, multimodality) can change pass$^k$ by orders of magnitude.
- Jensen’s inequality bounds the metric: $(\mathbb{E}[p])^k \le \mathbb{E}[p^k] \le \mathbb{E}[p]$, with theoretical maximum gain $\mu - \mu^k$.
- Tau-bench highlights that average performance is not enough — consistent success defines reliability.
