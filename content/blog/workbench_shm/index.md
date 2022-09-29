---
title: "How to Increase Shared Memory in Vertex AI Workbench"
date: "2022-09-26T22:10:03.284Z"
description: "."
featuredImage: workbench_shm/ogp.jpg
tags: ["en", "cv", "python"]
---

**Vertex AI Workbench** is a managed Jupyter Notebook service of Google Cloud. It allows you to choose a wide range of configurations such as GPU types, disk size, and environment (which Docker image to compute upon). The Docker image options include [Kaggle Python](https://github.com/Kaggle/docker-python) [^1], so Workbench is the first (paid) alternative when you run out of the GPU quota of the Kaggle Notebook.

## Shared Memory is Small?
However, Workbench
64MB by default

PyTorch DataLoader errors

> DataLoader worker (pid xxx) is killed by signal: Bus error. 

> ERROR: Unexpected bus error encountered in worker. This might be caused by insufficient shared memory (shm)

setting `num_workers` to zero seriously slows down

docker run with either of these two options:

`--ipc=host` https://docs.docker.com/engine/reference/run/#ipc-settings---ipc

`--shm-size=4gb` 
https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources

## Solution: Use Metadata!


## References
[1] [torch.histogramdd — PyTorch 1.12 documentation](https://pytorch.org/docs/stable/generated/torch.histogramdd.html)  

[^1]: Python image optimized for Kaggle Notebooks, supporting hundreds of machine learning libraries popular on Kaggle