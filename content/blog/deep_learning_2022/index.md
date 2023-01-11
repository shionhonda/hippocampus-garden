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

Since **NeRF** (**neural radiance field**) was proposed in 2020, many derivative studies have been done to extend its capacity. In CVPR 2022, we saw more than 50 NeRF papers (here is [a curated list](https://dellaert.github.io/NeRF22/)).

**Block-NeRF** is one of such works but prominent. Unlike usual use cases where NeRF is trained on a single object, Block-NeRF is scaled to render city-scale scenes. In the demo presented below, it renders the Alamo Square neighborhood of San Francisco.

<iframe width="560" height="315" src="https://www.youtube.com/embed/6lGMCAzBzOQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

This problem is hard because when the target is a large scene, it is inevitable that the photos are taken under different conditions (e.g., weather, lighting, moving objects)

train multiple nerfs, each of which are assigned circular subregion
then they are combined based on the distance from center and the visbility

### Scaling Law vs Model Architecture
### Cold Diffusion
### Multi-game Decision Transformer
### Adam can converge
### Whisper

## Applications
### Stable Diffusion
### ChatGPT & YOU.com


## Concluding Remarks

## References 
