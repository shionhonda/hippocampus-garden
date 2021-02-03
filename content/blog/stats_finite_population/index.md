---
title: "Stats with Python: Rank Correlation"
date: "2021-01-29T22:10:03.284Z"
description: "When you sample from a finite population without replacement, beware the finite population correction. The samples are not independent of each other."
featuredImage: finite_population/ogp.jpg
tags: ["en", "stats", "python"]
---


## Pearson Correlation Coefficient

$$
r = \frac{{\displaystyle \sum_{i = 1}^n (x_i - \overline{x})
(y_i - \overline{y})}}{\sqrt{{\displaystyle \sum_{i = 1}^n 
(x_i - \overline{x})^2}} \sqrt{{\displaystyle \sum_{i = 1}^n 
(y_i - \overline{y})^2}}} 
$$

## Spearman Rank Correlation Coefficient

$$
\rho = \frac{{\displaystyle \sum_{i = 1}^n (a_i - \overline{a})
(b_i - \overline{b})}}{\sqrt{{\displaystyle \sum_{i = 1}^n 
(a_i - \overline{a})^2}} \sqrt{{\displaystyle \sum_{i = 1}^n 
(b_i - \overline{b})^2}}} 
$$

$$
\rho = 1 - \frac{6}{n(n^2 - 1)}\sum_{i = 1}^n (a_i-b_i)^2
$$

### Proof
$$
\begin{gathered}
\sum_{i = 1}^n a_i = \sum_{i = 1}^n b_i = \frac{n(n+1)}{2}\\
\sum_{i = 1}^n a_i^2 = \sum_{i = 1}^n b_i^2 = \frac{n(n+1)(2n+1)}{6}\\
\overline{a} = \overline{b} = \frac{n+1}{2}
\end{gathered}
$$

$$
\begin{aligned}
  \rho &= \frac{{\displaystyle \sum_{i = 1}^n (a_i - \overline{a})
(b_i - \overline{b})}}{\sqrt{{\displaystyle \sum_{i = 1}^n 
(a_i - \overline{a})^2}} \sqrt{{\displaystyle \sum_{i = 1}^n 
(b_i - \overline{b})^2}}} \\
&= \frac{{\displaystyle \sum_{i = 1}^n \Bigl(a_i - \frac{n+1}{2}\Bigr)
\Bigl(b_i - \frac{n+1}{2}\Bigr)}}{\sqrt{{\displaystyle \sum_{i = 1}^n 
\Bigl(a_i - \frac{n+1}{2}\Bigr)^2}} \sqrt{{\displaystyle \sum_{i = 1}^n 
\Bigl(b_i - \frac{n+1}{2}\Bigr)^2}}} \\
&= \frac{
  {\displaystyle \sum_{i = 1}^n \Bigl(a_ib_i - \frac{n+1}{2}(a_i+b_i) +  \frac{(n+1)^2}{4}\Bigr)}}
  {
    \sqrt{{\displaystyle \sum_{i = 1}^n \Bigl(a_i^2 - (n+1)a_i + \frac{(n+1)^2}{4}\Bigr)}} 
    \sqrt{{\displaystyle \sum_{i = 1}^n \Bigl(b_i^2 - (n+1)b_i + \frac{(n+1)^2}{4}\Bigr)}}
  } \\
&= \frac{
  {\displaystyle \sum_{i = 1}^n a_ib_i - \frac{n(n+1)^2}{2} + \frac{n(n+1)^2}{4}}
}{
  {\displaystyle \frac{n(n+1)(2n+1)}{6} - \frac{n(n+1)^2}{2} + \frac{n(n+1)^2}{4}}
}\\
&= \frac{
  12{\displaystyle \sum_{i = 1}^n a_ib_i - 3n(n+1)^2}
}{
  (n-1)n(n+1)
}
\end{aligned}
$$

$$
\sum_{i = 1}^n (a_i-b_i)^2 = -2\sum_{i = 1}^na_ib_i +\frac{n(n+1)(2n+1)}{3}
$$

$$
\begin{aligned}
  \rho &= \frac{
  -6{\displaystyle \sum_{i = 1}^n (a_i-b_i)^2 +2n(n+1)(2n+1)- 3n(n+1)^2}
}{
  (n-1)n(n+1)
}\\
&= 1 - \frac{6}{n(n^2 - 1)}\sum_{i = 1}^n (a_i-b_i)^2
\end{aligned}
$$

## Kendall Rank Correlation Coefficient
## Goodman and Kruskal's Gamma


## References
[1] 東京大学教養学部統計学教室 編. "[統計学入門](http://www.utp.or.jp/book/b300857.html)"（第3章）. 東京大学出版会. 1991.  
[2] [統計WEB － 統計学、調べる、学べる、BellCurve（ベルカーブ）](https://bellcurve.jp/statistics/)  
\* This "statistics dictionary" covers a range of concepts with LaTeX codes.