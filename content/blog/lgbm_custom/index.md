---
title: "Using Custom Loss for LightGBM"
date: "2020-11-22T22:01:03.284Z"
description: 'Modern gradient boosting algorithms.'
featuredImage: lgbm_custom/ogp.jpg
tags: ["en", "machine-learning", "python"]
---

**Gradient boosting decision trees** (**GBDT**s) like [**XGBoost**](https://xgboost.readthedocs.io/en/latest/), [**LightGBM**](https://lightgbm.readthedocs.io/en/latest/), and [**CatBoost**](https://catboost.ai/docs) are the most popular models in tabular data competition. These packeges provide a number of built-in objective functions for various use cases. However, sometimes you might want to use a custom objective function that you define yourself. This was somewhat tricky to me, so I share how to do it in this post. Specifically, for the L2 loss and the binary cross entropy loss, I discuss how to re-implement those loss functions and compare the results from the built-in loss and custom loss. I use LightGBM's Python distribution in this post, but basically the same argument should hold for other packages as well. 

The script used in the experiment section is available [here](https://colab.research.google.com/drive/1TJvRp7X0nEBT2GKQa_ybSB58R6hmUEFj?usp=sharing). In the following part, I assume you have imported these packages:

```python
import numpy as np
import pandas as pd
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score
from sklearn.datasets import load_breast_cancer
import seaborn as sns
```
<br/>

## Regression (L2 Loss)
Let's start with the simpler problem: regression.

### Calculating Derivatives
Like [Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method), modern GBDT algorithms utilize the 2nd-order derivative as well as the gradient to decide how to create new branches. So, we need to calculate the first- and second-order derivatives. Let $t$ denote the grount truth and $y$ denote the model's prediction, and we get:

$$
\mathcal{L}(y,t) = \frac{1}{2}(y-t)^2
$$

$$
\frac{\partial \mathcal{L}(y,t)}{\partial y} = y-t
$$

$$
\frac{\partial^2 \mathcal{L}(y,t)}{\partial y^2} = 1
$$

### Implementation
Here 

```python
def l2_loss(y, data):
    t = data.get_label()
    grad = y - t 
    hess = np.ones_like(y)
    return grad, hess

def l2_eval(y, data):
    t = data.get_label()
    loss = (y-t)**2 
    return 'l2', loss.mean(), False
```

Note: The second-order derivative that we consider here is a vector of the same shape as the gradient and not a matrix, but it is conventionally called Hessian.

### Comparison to Built-in Objective
```python
df = sns.load_dataset('tips')
X_train, X_test, y_train, y_test = train_test_split(df.drop(['total_bill'], axis=1), df['total_bill'], random_state=0)
lgb_train = lgb.Dataset(X_train, y_train)

# Using built-in objective
lgbm_params = {
    'objective': 'regression',
    'random_seed': 0
    }
model = lgb.train(lgbm_params, 
                  lgb_train)
y_pred = model.predict(X_test)
print(mean_squared_error(y_test, y_pred))
# >> 31.94812324773213

# Using custom objective
lgbm_params = {
    'random_seed': 0
    }

model = lgb.train(lgbm_params, 
                  lgb_train,
                  fobj=l2_loss,
                  feval=l2_eval)
y_pred = model.predict(X_test)
print(mean_squared_error(y_test, y_pred))
# >> 31.947398098316526
```

### Weighting

```python
def l2_loss(y, data):
    t = data.get_label()
    w = data.get_weight()
    grad = w * (y - t) 
    hess = w
    return grad, hess

def l2_eval(y, data):
    t = data.get_label()
    w = data.get_weight()
    loss = np.sum(w * (y - t)**2) / np.sum(w)
    return 'weighted_l2', loss, False
```

## Binary Classification (Cross Entropy Loss)
### Calculating Derivatives
$$
\begin{aligned}
  \mathcal{L}(z,t) &= -t\ln{y}-(1-t)\ln{(1-y)}\\
  &=  -t\ln{\frac{1}{1+e^{-z}}}-(1-t)\ln{\frac{e^{-z}}{1+e^{-z}}}\\
  &=t\ln(1+e^{-z})+(1-t) \ln(1+e^{z}) \\
  &= t~\mathrm{softplus}(-z) + (1-t)~\mathrm{softplus}(z)
\end{aligned}
$$

$$
\begin{aligned}
\frac{\partial \mathcal{L}(z,t)}{\partial z} &= -t~\frac{e^{-z}}{1+e^{-z}} + (1-t)~\frac{e^{z}}{1+e^{z}}\\
&= -t~\frac{e^{-z}}{1+e^{-z}} + (1-t)~\frac{1}{1+e^{-z}}\\
&= \frac{1}{1+e^{-z}} - t\\
&= y-t
\end{aligned}
$$

$$
\begin{aligned}
\frac{\partial^2 \mathcal{L}(z,t)}{\partial z^2} &= \frac{\partial}{\partial z}\frac{1}{1+e^{-z}}\\
&= \frac{e^{-z}}{(1+e^{-z})^2}\\
&= y(1-y)
\end{aligned}
$$

### Implementation

```python
def _positive_sigmoid(x):
    return 1 / (1 + np.exp(-x))

def _negative_sigmoid(x):
    exp = np.exp(x)
    return exp / (exp + 1)

def sigmoid(x):
    positive = x >= 0
    negative = ~positive
    result = np.empty_like(x)
    result[positive] = _positive_sigmoid(x[positive])
    result[negative] = _negative_sigmoid(x[negative])
    return result


def _positive_softplus(x):
    return x + np.log1p(np.exp(-x))

def _negative_softplus(x):
    return np.log1p(np.exp(x))

def softplus(x):
    positive = x >= 0
    negative = ~positive
    result = np.empty_like(x)
    result[positive] = _positive_softplus(x[positive])
    result[negative] = _negative_softplus(x[negative])
    return result


def bce_loss(z, data):
    t = data.get_label()
    y = sigmoid(z)
    grad = y - t
    hess = y * (1 - y)
    return grad, hess

def bce_eval(z, data):
    t = data.get_label()
    loss = t * softplus(-z) + (1 - t) * softplus(z)
    return 'bce', loss.mean(), False
```

### Comparison to Built-in Objective

```python
data = load_breast_cancer()
df = pd.DataFrame(data.data, columns=data.feature_names)
X_train, X_test, y_train, y_test = train_test_split(df, data.target, random_state=0)
lgb_train = lgb.Dataset(X_train, y_train)

lgbm_params = {
    'objective': 'binary',
    'random_seed': 0
    }
model = lgb.train(lgbm_params, 
                  lgb_train)
y_pred = model.predict(X_test)
print(accuracy_score(y_test, y_pred>0.5))
# >> 0.972027972027972

lgbm_params = {
    'random_seed': 0
    }
model = lgb.train(lgbm_params, 
                  lgb_train,
                  fobj=bce_loss,
                  feval=bce_eval)
# Note: When using custom objective, the model outputs logits
y_pred = sigmoid(model.predict(X_test))
print(accuracy_score(y_test, y_pred>0.5))
# >> 0.972027972027972
```

Note: when using custom loss, the model outputs raw value before sigmoid 

## References
https://stackoverflow.com/a/64717799