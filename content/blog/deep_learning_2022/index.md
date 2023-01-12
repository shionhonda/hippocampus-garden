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

Rendering large scenes is a challenging task due to the varying conditions under which input photos are taken, such as different lighting, weather, and moving objects. Block-NeRF divides and conquers this problem. It splits the entire scene to multiple subregions, each of which are assigned a separate Block-NeRF model. To render a scene, the models are filtered by the visibility from the viewpoint and then the model outputs are combined based on the distance from the viewpoint.

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
