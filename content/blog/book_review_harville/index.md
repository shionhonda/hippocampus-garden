---
title: 書評『統計のための行列代数』
date: "2020-07-16T23:12:03.284Z"
description: "『統計のための行列代数』のまとめと感想です。誤植と思われる箇所も挙げています。"
featuredImage: book_review_harville/ogp.jpg
---
## 概要
## まとめと感想
### 第1章 行列
行列のスカラー倍や行列どうしの加減乗除、対称行列や三角行列といった用語を定義します。

### 第2章 部分行列と分割行列
ブロック対角行列などを定義するのに必要になる部分行列と分割行列を準備します。**主部分行列 (principal submatrix)**とその部分集合である**首座部分行列 (leading principal submatrix)**は忘れがちなので再掲します。  
- **主部分行列**: $n \times n$行列から第$i_1, \ldots, i_r$行と第$i_1, \ldots, i_r$列を削除することで得られる$r \times r$部分行列  
- **首座部分行列**: 部分行列のうち、$\{ i_k ~|~ k=1,\ldots, r\} = \{ k ~|~ k=n-r+1,\ldots,n\}$であるもの。すなわち、$n \times n$行列から第$n-r+1,\ldots,n$行と第$n-r+1,\ldots,n$列を削除することで得られる$r \times r$部分行列  
対称行列の主部分行列もまた対称行列であり、三角行列の主部分行列も三角行列です。
  
### 第3章 線形従属と線形独立
タイトルどおりの内容が4ページで書かれているだけです。

### 第4章 線形空間 ―― 行空間と列空間
**行（列）空間**、**基底**、**次元 (dimension)**、**階数 (rank)**、**非特異 (non-singular)**といった極めて重要な概念を導入します。  
ところで、行列がフルランクであることは「**正則 (regular)**」と呼ぶのが一般的だと思いますが、この本では「非特異 (non-singular)」という言葉を使います。否定形でわかりにくいところがありますが、統計学で使う「正則化 (regularization)」と区別するためでしょうか。

### 第5章 （正方）行列のトレース
正方行列に対して定義される**トレース**を導入します。行列$\textbf{A}$のトレース$\mathrm{tr}(\textbf{A})$は、$\textbf{A}$の対角成分の和として定義されます。  
行列の積のトレースには少し注意が必要なので、再掲します。2つの行列$\textbf{A} \in \mathbb{R}^{m\times n}$、$\textbf{B} \in \mathbb{R}^{n\times m}$を考えます。トレースの転置不変性を考慮すると、2つの行列の積に対しては、次のような順序の交換が可能です。
$$
\mathrm{tr}(\textbf{AB}) = \mathrm{tr}(\textbf{BA})
$$
両辺で行列のサイズが異なっていることに注意してください。  
次に、3つの行列$\textbf{A} \in \mathbb{R}^{m\times n}$、$\textbf{B} \in \mathbb{R}^{n\times p}$、$\textbf{C} \in \mathbb{R}^{p\times m}$を考えます。3つの行列の積$\textbf{ABC}$に対しては、$\textbf{AB}$と$\textbf{C}$の積あるいは$\textbf{A}$と$\textbf{BC}$の積とみなすことで、次のような順序の交換が可能です。
$$
\mathrm{tr}(\textbf{ABC}) = \mathrm{tr}(\textbf{CAB}) = \mathrm{tr}(\textbf{BCA})
$$
ただし、次のような順序の交換は*できません*。
$$
\mathrm{tr}(\textbf{ABC}) = \mathrm{tr}(\textbf{BAC})
$$
右辺は行列のサイズが合わないのでそもそも積が定義できないのですが、仮に$\textbf{A}$、$\textbf{B}$、$\textbf{C}$がすべて正方行列だったとしても、このような順序の交換はできません。

### 第6章
### 第7章
### 第8章
### 第9章
### 第10章
### 第11章
### 第12章
### 第13章
### 第14章
### 第15章
### 第16章
### 第17章
### 第18章
### 第19章
### 第20章
### 第21章

## 誤植と思われる箇所
- p55: 補助定理4.5.10の1つ目の同値の右辺が「$\mathcal{C}(\textbf{B}) \subset \mathcal{C}(\textbf{E})$」となっていますが、正しくは「$\mathcal{C}(\textbf{A}) \subset \mathcal{C}(\textbf{E})$」だと思われます