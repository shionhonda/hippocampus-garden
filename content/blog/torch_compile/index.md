---
title: "torch.compile Benchmarked"
date: "2023-05-19T22:01:03.284Z"
description: "PyTorch 2.0 introduced a new feature for JIT-compiling. How can it accelerate model training and inference?"
featuredImage: torch_compile/ogp.jpg
tags: ["en", "deep-learning"]
---

PyTorch recently introduced `torch.compile`, a method to JIT-compile PyTorch code into optimized kernels, in its version 2.0. In the [official website](https://pytorch.org/get-started/pytorch-2.0/), they boast about their achievements as:

> Across these 163 open-source models torch.compile works 93% of time, and the model runs 43% faster in training on an NVIDIA A100 GPU. At Float32 precision, it runs 21% faster on average and at AMP Precision it runs 51% faster on average.

This is fantastic! In this blog post, I will try out this new feature and see what it can do.

## Experiments

`torch.compile` provides several compilation modes: `default`, `reduce-overhead`, and `max-autotune`. The optimal choice depends on various configurations that define the bottleneck, such as model architecture and input tensor size. It is explained [here](https://pytorch.org/get-started/pytorch-2.0/#user-experience) as:

> The `default` mode is a preset that tries to compile efficiently without taking too long to compile or using extra memory.
Other modes such as `reduce-overhead` reduce the framework overhead by a lot more, but cost a small amount of extra memory. `max-autotune` compiles for a long time, trying to give you the fastest code it can generate.

Anyway, I measured following metrics against the eager mode and different compilation modes while running GPT-2 (1.5B parameters) on Colab A100.

- Initial training step time & memory (when JIT compiling happens)
- Training time
- Inference time

I used AMP for a more realistic experiment. The core part of the code looks like this:

```python
def time_train(model, optimizer, scaler, inputs) -> float:
    start = torch.cuda.Event(enable_timing=True)
    end = torch.cuda.Event(enable_timing=True)
    start.record()
    for _ in range(N_ITER):
        optimizer.zero_grad()
        with autocast():
            outputs = model(**inputs, labels=inputs["input_ids"])
        scaler.scale(outputs.loss).backward()
        scaler.step(optimizer)
        scaler.update()
    end.record()
    torch.cuda.synchronize()
    return start.elapsed_time(end) / N_ITER

@torch.no_grad()
def time_infer(model, inputs) -> float:
    start = torch.cuda.Event(enable_timing=True)
    end = torch.cuda.Event(enable_timing=True)
    start.record()
    for _ in range(N_ITER):
        with autocast():
            _ = model(**inputs)
    end.record()
    torch.cuda.synchronize()
    return start.elapsed_time(end) / N_ITER
```

For more details about the experiment, please refer to the [Colab notebook](https://colab.research.google.com/drive/11zRPV3mDxDUfNyJ77esxhYzzrSyxb6N_?usp=sharing
).

## Results & Discussions

The table below summarizes the measured metrics.

|Compilation mode|Initial step time [s] |Initial step memory [MiB] |Training time / iter [ms]|Inference time / iter [ms] |
|:-:|:-:|:-:|:-:|:-:|
|N/A (eager)|1|3675|57|**18**|
|default|29|3277|34|30|
|reduce-overhead|29|5736|34|28|
|max-autotune|35|5736|**32**|30|

Indeed, `torch.compile` reduced the training time by 40-44% (corresponding to 68-78% speedup).

However, it didn't reduce the inference time in this setting. I haven't yet figured out what is going on here, but it seems that some people have reported negative effects of `torch.compile`.

- https://github.com/pytorch/pytorch/issues/98441
- https://discuss.pytorch.org/t/torch-compile-negative-performance/173857

If you have any thoughts on this, I'd appreciate your comments.

## References

[1] [torch.compile Tutorial — PyTorch Tutorials 2.0.1+cu117 documentation](https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html)  
[2] [Is PyTorch 2.0 Faster Than PyTorch 1.13? | PyTorch 2.0 Benchmarks v2 – Weights & Biases](https://wandb.ai/gladiator/PyTorch%202.0%20Benchmarks%20v2/reports/Is-PyTorch-2-0-Faster-Than-PyTorch-1-13---VmlldzozNDA2MDQz?galleryTag=pytorch)  
[3] [PyTorch 2.0の新機能「torch.compile」使ってみた - まったり勉強ノート](https://www.mattari-benkyo-note.com/2023/03/18/torch-compile/)
