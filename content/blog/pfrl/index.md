---
title: Learn to Play Slime Volleyball with PFRL
date: "2020-08-08T22:13:03.284Z"
description: "lorem ipsum"
featuredImage: pfrl/ogp.jpg
tags: ["en", "reinforcement-learning", "python"]
---

Last month, Preferred Networks, Inc. (PFN) released a new PyTorch-based library for **deep reinforcement learning (DRL)**, named [**PFRL**](https://github.com/pfnet/pfrl). Succeeding [ChainerRL](https://github.com/chainer/chainerrl), PFRL implements a comprehensive set of DRL algorithms from DQN to Soft Actor-Critic. [Here](https://github.com/pfnet/pfrl/blob/master/examples/quickstart/quickstart.ipynb) is the official quickstart guide.

In this post, I apply one of the PFRL's algorithms to the Slime Volleyball game with the GPU instance of Colaboratory. The agent successfully learned to play the game like this:

<iframe width="560" height="315" src="https://www.youtube.com/embed/bjIGZNSKZrY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>

## Slime Volleyball
Slime Volleyball is a simple volleyball-like game between two slimes (agents). Each agent initially has five lives, and lose one life when it fails to push the ball back to the opponent's side. An agent receives +1 reward when its opponent loses life and -1 when it loses a life.

[A Slime Volleyball environment](https://github.com/hardmaru/slimevolleygym) with Gym interface is provided by @hardmaru. There are some types of environments, but here I use the simplest one with 12-dimensional observational space and 3-dimensional action space. 

## Implementation
PFRL already has an official example of learning to play Slime Volleyball with a value-based algorithm called Rainbow [3]. So, I tried a policy-based algorithm called **proximal policy optimization (PPO)**.

## Result


## References
[1] [Preferred Networks Releases PFRL Deep Reinforcement Learning Library for PyTorch Users | Preferred Networks, Inc.](https://preferred.jp/en/news/pr20200730/)  
[2] Matteo Hessel, Joseph Modayil, Hado van Hasselt, Tom Schaul, Georg Ostrovski, Will Dabney, Dan Horgan, Bilal Piot, Mohammad Azar, David Silver. [Rainbow: Combining Improvements in Deep Reinforcement Learning](https://arxiv.org/abs/1710.02298). AAAI. 2018.  
[3] John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov. [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347). 2017.  
[4] [【強化学習】OpenAI Gym×Keras-rlで強化学習アルゴリズムを実装していくぞ（準備編） - Qiita](https://qiita.com/pocokhc/items/a8120b0abd5941dd7a9f#googlecolaboratory-%E3%81%A7%E5%AE%9F%E8%A1%8C%E3%81%97%E3%81%A6%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B)  
[5] [How to take screen number? · Issue #54 · ponty/PyVirtualDisplay](https://github.com/ponty/PyVirtualDisplay/issues/54)

