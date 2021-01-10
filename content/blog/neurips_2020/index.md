---
title: "Personal Paper List from NeurIPS 2020"
date: "2021-01-10T22:01:03.284Z"
description: "Let's look back on the machine learning papers published in 2020! This post covers 10 representative papers that I found interesting and worth reading."
featuredImage: neurips_2020/ogp.jpg
tags: ["en","machine-learning", "deep-learning"]
---


## Orals

- [GPT-3](https://proceedings.neurips.cc//paper_files/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html)
- [Implicit Neural Representations with Periodic Activation Functions](https://proceedings.neurips.cc//paper_files/paper/2020/hash/53c04118df112c13a8c34b38343b9c10-Abstract.html)
- [Bootstrap Your Own Latent - A New Approach to Self-Supervised Learning](https://proceedings.neurips.cc//paper_files/paper/2020/hash/f3ada80d5c4ee70142b17b8192b2958e-Abstract.html)

### AI Feynman 2.0: Pareto-optimal symbolic regression exploiting graph modularity
**AI Feynman 2.0** solves **symbolic regression**: a challenge to find a symbolic expression that fits to the given data. The model recursively updates its computational graph to achieve Pareto-optimality over the accuracy and the complexity.

![](2021-01-09-22-43-18.png)

AI Feynman can be installed simply by `pip install aifeynman`. It would be fun to play with your own data such as daily temperature, stock pices, and so on.

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/33a854e247155d590883b93bca53848a-Abstract.html) for more details.

### Improved guarantees and a multiple-descent curve for Column Subset Selection and the Nystrom method
This award-winning paper considers the **Column Subset Selection Problem** (**CSSP**), a well-studied combinatorial optimization task that aims to approximate the original data matrix with a low-rank matrix. CSSP can be seen in many machine learning applications such as feature selection. This paper provides a new upper and lower bound for the **approximattion factor** (a kind of relative approximation error) and also reveals a spectral behavior that they call a **multiple-descent curve**.

![](2021-01-09-22-47-19.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/342c472b95d00421be10e9512b532866-Abstract.html) for more details.

### Ultra-Low Precision 4-bit Training of Deep Neural Networks
The title by itself explains what is achieved. Yes, the team from IBM trained neural networks with 4-bit floating point computations. To enable 4-bit training, they combined some key techniques:
- A new radix-4 FP4 format.
- A new per-layer trainable gradient scaling technique (GradScale).
- A Two-Phase quantization technique for minimizing the quantization error.

![](2021-01-09-22-49-14.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/13b919438259814cd5be8cb45877d577-Abstract.html) for more details.


## Spotlights
### Investigating Gender Bias in Language Models Using Causal Mediation Analysis
**Causal mediation analysis** is a method to gauge how a treatment effect is mediated by mediator (intermediated variables). This paper proposes to use causal mediation analysis to investigate which part of the model is responsible for the output. This paper uses gender bias as an example.
- **Direct effect**: Change a word in the input sentence while keeping some component unchanged, and then see how the output changes
- **Indirect effect**: Change some component while keeping the input the same, and then see how the output changes

![](2021-01-07-22-26-07.png)

The analysis reveals that gender biases are concentrated in particular components (head, layer) of the model.

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/92650b2e92217715fe312e6fa7b90d82-Abstract.html) for more details.

### Design Space for Graph Neural Networks
GNNs have many configurations such as aggregation function, activation function, batch normalization, and so on. The best configuration depends on the task. To find a general rule on which configuration is good for a given task, this paper systematically examines *315,000 different designs over 32 different predictive tasks*. 

![](2021-01-07-21-55-55.png)

As well as this study tells us the general guidelines for designing well-performing GNNs, it provides a quantitative measure of task similarity, defined as a rank correlation of the scores of each GNN. Transfer learning works between similar tasks.

![](2021-01-07-21-57-49.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/c5c3d4fe6b2cc463c7d7ecba17cc9de7-Abstract.html) for more details.

### On the linearity of large non-linear models: when and why the tangent kernel is constant
Recent studies on **neural tangent kernels** (**NTK**) have discovered that certain neural networks, as their width approach infinity, converge to linear models. This paper reveals the relationship between NTK and the Hessian matrix of the network and demonstrates that wide neural networks transitions to linearity *when the last layer is linear and there are no bottleneck layers*. 

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/b7ae8fecf15b8b6c3c69eceae636d203-Abstract.html) for more details.

### NVAE: A Deep Hierarchical Variational Autoencoder
As opposed to the majority of VAE studies focusing on its statistical aspect, this paper designs an improved hierarchical architecture for VAES, dubbed **Nouveau VAE** (**NVAE**).

![](2021-01-10-16-05-01.png)

NVAE reduces the gap between VAEs and autoregressive models in terms of the visual quality of generated images.

![](2021-01-10-16-05-48.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/e3b21256183cf7c2c7a66be163579d37-Abstract.html) for more details.

### Open Graph Benchmark: Datasets for Machine Learning on Graphs
**Open Graph Benchmark** (**OGB**) is a benchmark for graph machine learning research to facilitate development and reproducibility. This benchmark is carefully designed to:
- cover a diverse range of domains including social networks, molecular graphs, knowledge graphs, and so on.
- have at least 100K nodes, 1M edges, or 10K graphs.
- cover all the task categories: node-wise, link-wise, and graph-wise.

![](2021-01-10-16-13-45.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/fb60d411a5c5b72b2e7d3527cfc84fd0-Abstract.html) for more details.

### AdaBelief Optimizer: Adapting Stepsizes by the Belief in Observed Gradients
**AdaBelief** is an Adam-like optimizer that adapts the stepsize according to the "belief", or the curvature, in the current gradient direction. For example, when the current set of parameters is $\theta_4$ in the figure below, Adam uses a small stepsize because the gradient is steep. On the other hand, AdaBelief takes a large step because the curvature is small. This difference allows AdaBelief to converege faster, generalize better, and stabilize better.

![](2021-01-10-16-32-54.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/d9d4f495e875a2e075a1a4a6e1b9770f-Abstract.html) for more details.


## Posters
### GANSpace: Discovering Interpretable GAN Controls
Surprisingly, it is possible to obtain interpretable controles over GAN models by principal component analysis of the activation space. The corresponding latent directions to the proncipal components represent zoom, angle, color etc. 

![](2021-01-09-22-34-02.png)

This paper demonstrates that BigGAN can be controlled with layer-wise inputs in a StyleGAN-like way.

![](2021-01-07-23-23-45.png)

Read [the paper](https://proceedings.neurips.cc/paper/2020/hash/6fe43269967adbb64ec6149852b5cc3e-Abstract.html) for more details.

### CogMol: Target-Specific and Selective Drug Design for COVID-19 Using Deep Generative Models
**Controlled Generation of Molecules** (**CogMol**) is an end-to-end framework for *de novo* drug design targeting novel viral proteins such as SARS-CoV-2. CogMol combines mulitple components such as a pre-trained SMILES VAE, protein embeddings, a toxicity predictor, a synthesizability predictor, and docking simulations.

![](2021-01-10-17-02-47.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/2d16ad1968844a4300e9a490588ff9f8-Abstract.html) for more details.

### Guiding Deep Molecular Optimization with Genetic Exploration
This paper proposes an algorithm, which is called **genetic expert-guided learning** (**GEGL**), to optimize molecues in the chemical space by applying genetic operations to LSTM-based generator.

![](2021-01-10-17-17-18.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/8ba6c657b03fc7c8dd4dff8e45defcd2-Abstract.html) for more details.


### Self-Supervised Graph Transformer on Large-Scale Molecular Data
The **GROVER** model proposed in this paper achieves new state-of-the-art on the MoleculeNet benchmark. To exploit the enormous unlabelled molecular data, the Transformer-like model tailored for molecular graphs is pre-trained in a self-supervised fashion.

![](2021-01-10-17-21-35.png)

![](2021-01-10-17-22-42.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/94aef38441efa3380a3bed3faf1f9d5d-Abstract.html) for more details.


### Differentiable Augmentation for Data-Efficient GAN Training
Data augmentation for GAN training is not as straightforward as it seems. To make GAN training data-efficient, this paper proposes to apply **differentiable augmentation** (**DiffAugment**) to both real and fake images for both generator and discriminator training.

![](2021-01-10-17-33-41.png)

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/55479c55ebd1efd3ff125f1337100388-Abstract.html) for more details.


### SnapBoost: A Heterogeneous Boosting Machine
Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/7fd3b80fb1884e2927df46a7139bb8bf-Abstract.html) for more details.

### A graph similarity for deep learning

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/0004d0b59e19461ff126e3a08a814c33-Abstract.html) for more details.


### Neural Networks Fail to Learn Periodic Functions and How to Fix It

Read [the paper](https://proceedings.neurips.cc//paper_files/paper/2020/hash/1160453108d3e537255e9f7b931f4e90-Abstract.html) for more details.

