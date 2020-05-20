---
title: BERT That Works on Browser
date: "2020-05-18T22:12:03.284Z"
description: "WIP"
featuredImage: mobilebert/ogp.png
---

As I mentioned in [an earlier post](https://hippocampus-garden.com/representation_learning/), **BERT** is famous for its great performance in various NLP tasks. When you try to use it on your device, however, you may find that it is too large to load on memory or it takes too long to infer as BERT-Base has as many as 100M parameters.

**MobileBERT** [1] is a more handy version of BERT with the reduced paramters and inference time and, of course, the same performance. It even allows us to use it on web browser! In [a recent post](https://blog.tensorflow.org/2020/03/exploring-helpful-uses-for-bert-in-your-browser-tensorflow-js.html) by TensorFlow developers, they developed a prototype of find-in-page search feature that takes questions as search queries [2]. Wouldn't it be nice?

![](googledemo.gif)

<small>Figure taken from [2]</small>

In this demo, MobileBERT model works purely on the browser (or client side) without any communication (e.g. with a cloud server). How is it possible? Let's find it out.

## MobileBERT Q&A Model


## MobileBERT
## TensorFlow.js
## References
[1] Zhiqing Sun, Hongkun Yu, Xiaodan Song, Renjie Liu, Yiming Yang, Denny Zhou. “[MobileBERT: a Compact Task-Agnostic BERT for Resource-Limited Devices](http://arxiv.org/abs/2004.02984).” ACL. 2020.  
[2] [Exploring helpful uses for BERT in your browser with Tensorflow.js — The TensorFlow Blog](https://blog.tensorflow.org/2020/03/exploring-helpful-uses-for-bert-in-your-browser-tensorflow-js.html)