---
title: "Meet Pandas: Conversion to CSR Matrix"
date: "2022-03-06T22:10:03.284Z"
description: "This post introduces the Pandas method of `query`, which allows us to query dataframes in an SQL-like manner."
featuredImage: pandas_sparse/ogp.jpg
tags: ["en", "pandas", "data-analysis", "python"]
---
🐼Welcome back to the "Meet Pandas" series (a.k.a. my memorandum for learning Pandas)!🐼

When handling big data, we often encounter user-item interactions. Examples of such data include:
- Ratings of movies, restaurants, or marchandises made by users
- Number of times a song is played by each user

If these data are expressed as a dense matrix where each row represents a user and each column represents an item, it tends to be prohibitively large to store in a memory. And, there should be more efficient ways to store such data, because interaction data are usually sparse. In such cases, expressing as a sparse matrix is a good choice. 

In this post, I will briefly show how to convert a dense matrix to a **compressed sparse row** (**CSR**) matrix, the most common format for sparse matrices.

## Load Example Data
As [before](https://hippocampus-garden.com/pandas_boxplot/), I use the "tips" dataset provided by seaborn. This is a data of food servers’ tips in restaurants with six factors that might influence tips.

```python
from urllib.request import urlretrieve
import zipfile

import numpy as np
import pandas as pd
from pandas.api.types import CategoricalDtype
from scipy import sparse

urlretrieve("http://files.grouplens.org/datasets/movielens/ml-100k.zip", "movielens.zip")
zip_ref = zipfile.ZipFile('movielens.zip', "r")
zip_ref.extractall()

df = pd.read_csv(
    'ml-100k/u.data', sep='\t', names=['user_id', 'movie_id', 'rating', 'timestamp'], encoding='latin-1'
)
df
```

The dataframe should look something like this:

![](2022-03-06-18-03-54.png)


Let's say we want a subset of records where $2 \leq \mathrm{tip} < 3$ and $\mathrm{day} \in \{\mathrm{Sat},\mathrm{Sun}\}$.

## 

## References
[1] [pandas.DataFrame.query — pandas 1.1.1 documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.query.html)  
