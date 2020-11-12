---
title: "ROC-AUC"
date: "2020-11-12T22:01:03.284Z"
description: 'Transformer has undergone various application studies, model enhancements, etc. This post aims to provide an overview of these studies.'
featuredImage: rocauc/ogp.jpg
tags: ["en", "math"]
---

## Gini Coefficient
![](2020-11-12-09-52-34.png)


## Mann–Whitney U Test 

$$
\begin{aligned}
U_1 = n_1n_2 + \frac{n_1(n_1+1)}{2} - R_1 \\
U_2 = n_1n_2 + \frac{n_2(n_2+1)}{2} - R_2 \\
U = \min{(U_1, U_2)}
\end{aligned}
$$

| Index | Face  | Label | Prediction |
| :---: | :---: | :---: | :--------: |
|   0   |   😆   |   1   |    0.9     |
|   1   |   😁   |   1   |    0.8     |
|   2   |   😄   |   1   |    0.7     |
|   3   |   😕   |   0   |    0.6     |
|   4   |   😃   |   1   |    0.5     |
|   5   |   🙁   |   0   |    0.4     |
|   6   |   😀   |   1   |    0.3     |
|   7   |   😣   |   0   |    0.2     |
|   8   |   😖   |   0   |    0.1     |
|   9   |   😫   |   0   |    0.0     |


| Index | Face  | Predicted Happier than... | Count |
| :---: | :---: | :-----------------------: | :---: |
|   0   |   😆   |         😕 🙁 😣 😖 😫         |   5   |
|   1   |   😁   |         😕 🙁 😣 😖 😫         |   5   |
|   2   |   😄   |         😕 🙁 😣 😖 😫         |   5   |
|   4   |   😃   |          🙁 😣 😖 😫          |   4   |
|   6   |   😀   |           😣 😖 😫           |   3   |

![](2020-11-12-10-04-19.png)