---
title: "Reproducing Deep Double Descent"
date: "2020-06-10T22:10:03.284Z"
description: "Have you ever confused Pandas methods loc, at, and iloc with each other? It's no more confusing when you have this table in mind."
featuredImage: double_descent/ogp.jpg
---
If you are a reader of this blog, you've probably heard of **bias-variance trade-off**, a well-known concept of machine learning, typically represented by the following curves.

![](bias_variance.png)

<div style="text-align: center;"><small>Figure taken from [1]</small></div>

The bias-variance trade-off is often compared to **Occam's razor**, a problem-solving principle like "the simplest solution is most likely the right one". But, do you know that there is a continuation of the U-shaped test risk curve? Surprisingly, once the model capacity exceeds a threshold where it achieves zero training risk (**over-parameterized**), *the test risk drops again!*

![](double_descent.png)

<div style="text-align: center;"><small>Figure taken from [1]</small></div>

Belkin *et al*. empirically demonstrated that this double-U-shaped risk curve is universal to the choice of models and datasets and reconciled the recently observed success of over-parameterized models and the classical bias-variance trade-off [1]. They also claimed that behind the "modern" interpolating regime are:
- The models have some **inductive bias** that leads to the generalized solution.
- Larger models are *easy* to optimize by local methods such as SGD

Following their research, Nakkiran *et al.* further showed that double descent occurs not only as a function of model size, but also as a function of the number of training epochs [2]. Take a look at the left panel of the figure below. It indecates the test error of CIFAR-10 by color as a function of the width of ResNet-18 (horizontal axis) and training epochs (vertical axis).

![](2020-06-11-00-20-59.png)

<div style="text-align: center;"><small>Figure taken from [2]</small></div>

If you look at it from left to right, you'll see the **model-wise double descent**: the error decreases in the range $x \lesssim 5$ and again in the range $15 \lesssim x$. If you look at it from bottom to top, you'll see the **epoch-wise double descent**: the error decreases in the range $y \lesssim 20$ and again in the range $100 \lesssim y$.

Can you believe this is real? I couldn't when I first read the paper. Well, it has been a little long introduction, but in this post, I try to reproduce this mysterious phenomenon focusing on this colormap. Also, I share some findings from the experiments and introduce some related works.

I hope this post in some way helps people who are not convinced just by reading the papers (just like me). 

## Reproducing Deep Double Descent
### Settings
I carefully read the original paper [2] and copy the settings of the ResNet-18/CIFAR-10 experiment as closely as possible. Due to the limitation of conputing resoruces, I didn't try every width from 1 to 64, and I trained for 500 epochs instead of 4,000. Other configurations are unchanged from the original paper [2]. These settings are feasible for Colaboratory (you'll need P100 or T4 instances when $k \leq 32$).

|      Config       |         Value          |
| :---------------: | :--------------------: |
|      Dataset      |        CIFAR-10        |
|       Model       |       ResNet-18        |
|    Width ($k$)    | 1, 2, 4, 8, 16, 32, 64 |
|      Epochs       |          500           |
|    Label noise    |          20%           |
| Data augmentation | Crop, Horizontal flip  |
|     Optimizer     |     Adam (lr=1e-4)     |
|    Batch size     |          128           |

20% label noise re-labels 20% of the training samples to diffent labels that are randomly chosen.

[The repository](https://gitlab.com/harvard-machine-learning/double-descent/-/tree/master) provided by the authors includes codes for the model and plotting, but they don't publish the code for training somehow. [Here](https://colab.research.google.com/drive/1lT2dUqal90NbLVQIGvseyAdKzH19MH2T?usp=sharing) I share the code I used to reproduce the result.

### How to Plot

```python
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
sns.set()

dfs = [
    pd.read_csv("log_01.txt"), 
    pd.read_csv("log_02.txt"),
    pd.read_csv("log_04.txt"),
    pd.read_csv("log_08.txt"),
    pd.read_csv("log_16.txt"),
    pd.read_csv("log_32.txt"),
    pd.read_csv("log_64.txt"),
]

def make_array(key):
    ddd = np.zeros((500, 64))
    for i in range(1,65):
        a = int(np.log2(i)//1)
        if a == 6:
            ddd[:,i-1] = dfs[a][key].values
        else:
            b = a + 1
            ddd[:,i-1] = ((2**b-i)*dfs[a][key].values + (i-2**a)*dfs[b][key].values) / (2**b-2**a)
    return ddd

ddd_train_error = make_array("Train Error")
ddd_test_error = make_array("Test Error")

fig = plt.figure(figsize=(15,5))

ax1 = fig.add_subplot(1, 2, 1)
im1 = ax1.imshow(np.flipud(ddd_test_error[y_idx, :]), cmap='plasma', aspect=0.25)
ax1.set_xlabel("Model width")
ax1.set_ylabel("Epochs")
ax1.set_xticks([0, 14, 29, 44, 59])
ax1.set_xticklabels([1, 15, 30, 45, 60,])
ax1.set_yticks([0, 74, 148, 199])
ax1.set_yticklabels([500, 100, 10, 1,])
ax1.set_title("Test Error")
ax1.grid(False)
fig.colorbar(im1, ax=ax1)

ax2 = fig.add_subplot(1, 2, 2)
im2 = ax2.imshow(np.flipud(ddd_train_error[y_idx, :]), cmap='plasma', aspect=0.25)
ax2.set_xlabel("Model width")
ax2.set_ylabel("Epochs")
ax2.set_xticks([0, 14, 29, 44, 59])
ax2.set_xticklabels([1, 15, 30, 45, 60,])
ax2.set_yticks([0, 74, 148, 199])
ax2.set_yticklabels([500, 100, 10, 1,])
ax2.set_title("Train Error")
ax2.grid(False)
fig.colorbar(im2, ax=ax2)

plt.show()
```
<br/>

### Results
Original:

![](2020-06-11-00-20-59.png)

Reproduced:

![](2020-06-11-00-24-22.png)

![](2020-06-11-00-28-23.png)

## Key Findings
Label smoothing is critical.
## Flooding: A New Regularization Technique
## Discussion
Test loss 

![](2020-06-11-00-29-27.png)

![](2020-06-11-00-29-39.png)

## Concluding Remarks

## References
[1] Mikhail Belkin, Daniel Hsu, Siyuan Ma, Soumik Mandal. [Reconciling modern machine learning practice and the bias-variance trade-off](https://arxiv.org/abs/1812.11118). *PNAS*. 2019.  
[2] Preetum Nakkiran, Gal Kaplun, Yamini Bansal, Tristan Yang, Boaz Barak, Ilya Sutskever. [Deep Double Descent: Where Bigger Models and More Data Hurt](https://arxiv.org/abs/1912.02292). In *ICLR*. 2020.  
[3] Lilian Weng. [Are Deep Neural Networks Dramatically Overfitted?](http://lilianweng.github.io/lil-log/2019/03/14/are-deep-neural-networks-dramatically-overfitted.html). 2019.