---
title: "Deep Learning in 2022"
date: "2023-01-13T22:01:03.284Z"
description: ""
featuredImage: deep_learning_2022/ogp.jpg
tags: ["en","deep-learning"]
---


## Research Papers

### Block-NeRF: Scalable Large Scene Neural View Synthesis
- Authors: Matthew Tancik, Vincent Casser, Xinchen Yan, Sabeek Pradhan, Ben Mildenhall, Pratul P. Srinivasan, Jonathan T. Barron, Henrik Kretzschmar
- Paper: https://arxiv.org/abs/2202.05263
- Project page: https://waymo.com/research/block-nerf/
- Venue: CVPR 2022

Since **NeRF** (**neural radiance field**) was introduced in 2020, many derivative studies have been done to extend its capacity. In CVPR 2022, we saw more than 50 NeRF papers (here is [a curated list](https://dellaert.github.io/NeRF22/)).

**Block-NeRF** is a prominent one among such works. While typical NeRF variants are trained to render a single object, this method is able to render city-scale scenes. In the demo presented below, it renders the Alamo Square neighborhood of San Francisco.

<iframe width="560" height="315" src="https://www.youtube.com/embed/6lGMCAzBzOQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Rendering large scenes is a challenging task due to the varying conditions under which input photos are taken, such as different lighting, weather, and moving objects. Block-NeRF divides and conquers this problem. It splits the entire scene to multiple sub-scenes, each of which are assigned a separate Block-NeRF model. To render a scene, the models are filtered by the visibility from the viewpoint and then the model outputs are combined based on the distance from the viewpoint. This approach is preferred because it is easy to expand the scene and update a particular sub-scene.

![](2023-01-12-09-55-25.png)

### Scaling Laws vs Model Architectures: How does Inductive Bias Influence Scaling?
- Authors: Yi Tay, Mostafa Dehghani, Samira Abnar, Hyung Won Chung, William Fedus, Jinfeng Rao, Sharan Narang, Vinh Q. Tran, Dani Yogatama, Donald Metzler
- Paper: https://arxiv.org/abs/2207.10551

In recent years, the scaling capabilities of Transformer models have caught the attention of many researchers, leading to the development of larger and larger language models. In another line of research, many alternative architectures have been proposed in an attempt to improve the compute efficiency of the Transformer, which was first introduced in 2017.

Now it's natural to ask whether these alternative architectures scale or not. This paper aims to answer this question by comparing different model architectures, including Transformer variants and CNNs, on both upstream (language modeling) and downstream (SuperGLUE) tasks.

![](2023-01-12-23-31-24.png)

The results of the study are well summarized in the above figure, which can be a bit difficult to interpret. The key takeaways from the study include:
- Upstream scores do not correlate well with downstream scores
- The optimal architecture can vary depending on the scale of the model
  - Models such as ALBERT and MLP-Mixer scales even negatively
  - *On average, the vanilla Transformer demonstrates the best scaling behaviour*

### Cold Diffusion: Inverting Arbitrary Image Transforms Without Noise
- Authors: Arpit Bansal, Eitan Borgnia, Hong-Min Chu, Jie S. Li, Hamid Kazemi, Furong Huang, Micah Goldblum, Jonas Geiping, Tom Goldstein
- Paper: https://arxiv.org/abs/2208.09392
- Code: https://github.com/arpitbansal297/Cold-Diffusion-Models

Diffusion models are thought to be grounded to theories such as Langevin dynamics and variational inference,largely due to the mathematical tractability of the Gaussian noise. However, this paper poses a question to this understanding: is Gaussian noise truly necessary for diffusion models?

In experiments, the authors observed that diffusion models actually work with alternative choices of noise, even when the noise is deterministic (e.g., blur, masking etc.). This finding opens the door for the development of new generative models that are not constrained by the traditional requirement of Gaussian noise.

![](2023-01-13-00-12-43.png)

### Multi-game Decision Transformer
### Adam can converge
### Whisper

## Applications
### Stable Diffusion & DreamStudio
### ChatGPT
### YOU.com


## Concluding Remarks

## References 
