---
title: 入社2年目に読んだ本
date: "2022-06-17T23:02:03.284Z"
description: "読書記録とともに2021年度（＝入社2年目）を雑に振り返ります。"
featuredImage: books_fy2021/ogp.jpg
tags: ["ja", "book"]
---

昨年の『[入社1年目に読んだ本](https://hippocampus-garden.com/books_fy2020/)』に引き続き、今年も1年間で読んだ仕事関係（明確な定義はありません）の本をまとめます。「あとで自分で読み返すため」という性質が普段以上に強い記事になりますが、どなたかの役に立てば望外の喜びです。

さて、[前回の記事](https://hippocampus-garden.com/books_fy2020/)では、

> 「予測モデルを作ることと、データ施策を本番環境で運用してビジネス価値を出し続けることの間には様々な大きいギャップがある」ということを痛感しました。（中略）2年目はこのギャップを埋めて大きなビジネス価値に繋げられるよう、引き続き邁進していく所存です。

ということを書きました。その後、仕事や自主的な勉強を通じて、着実に「ギャップ」を埋められています。具体的には、主に以下のような項目について知見を深められました。

- 機械学習システムのうち、特にデプロイやサービングの周辺
- Go言語（特に並行処理）
- 課題ドリブンでサービスや機能を設計する方法

仕事も少しずつできるようになってきましたが、ビジネス貢献という意味ではまだ道半ばなので、3年目も引き続き邁進していきます。

読んだ本を数えてみると、22冊ありました。[昨年度](https://hippocampus-garden.com/books_fy2020/)の12冊からは大きな飛躍です（その分、論文を読んだりブログを書いたりする時間を減らしました）。

- [機械学習／データサイエンス](#機械学習データサイエンス)
  - [ゼロから作るDeep Learning 3](#ゼロから作るdeep-learning-3)
  - [深層学習](#深層学習)
  - [深層学習の原理に迫る](#深層学習の原理に迫る)
  - [パターン認識と機械学習](#パターン認識と機械学習)
  - [施策デザインのための機械学習入門](#施策デザインのための機械学習入門)
  - [仕事ではじめる機械学習](#仕事ではじめる機械学習)
  - [Pythonで学ぶ強化学習](#pythonで学ぶ強化学習)
  - [A/Bテスト実践ガイド](#abテスト実践ガイド)
- [ソフトウェア開発](#ソフトウェア開発)
  - [プログラミング言語Go](#プログラミング言語go)
  - [エンジニアリング組織論への招待](#エンジニアリング組織論への招待)
  - [応用情報技術者試験](#応用情報技術者試験)
  - [クラウド開発実践入門](#クラウド開発実践入門)
  - [Kubernetes完全ガイド](#kubernetes完全ガイド)
  - [Real World HTTP](#real-world-http)
  - [Web API: The Good Parts](#web-api-the-good-parts)
- [ビジネス](#ビジネス)
  - [入門　起業の科学](#入門起業の科学)
  - [ロジカル・プレゼンテーション](#ロジカルプレゼンテーション)
  - [ブルシット・ジョブ](#ブルシットジョブ)
  - [世界一楽しい決算書の読み方](#世界一楽しい決算書の読み方)
  - [イノベーションのジレンマ](#イノベーションのジレンマ)
  - [ジョブ理論](#ジョブ理論)
  - [ザ・ゴール](#ザゴール)

以降、ジャンルに分けて一冊ずつ簡単に内容をまとめます。

# 機械学習／データサイエンス
## ゼロから作るDeep Learning 3
『ゼロから作るDeep Learning ❸ ―フレームワーク編』（斎藤康毅、オライリージャパン、2020年）は、数値計算ライブラリ（NumPy）だけで深層学習モデルを実装することを通してその内部動作を理解するということをコンセプトにした大人気シリーズの第3弾です。第3弾では、これまでは手動で定義していた各種演算の誤差逆伝播を自動で計算できるように、「DeZero」と名付けた深層学習フレームワークを自作します。DeZeroは[Chainer](https://chainer.org/)に似たインターフェイスを持つDefine-by-RunのピュアPythonフレームワークです。

「深層学習フレームワークを自作する」と言うと気が遠くなるように思えますが、全体の作業が60の小さなステップに分割されているため、短いスパンで達成感を得ながら無理なく完遂することができます。完遂後に見える景色はそれまでと全く異なるものでした。NumPyのndarrayと似たインターフェイスを持つChainerのVariableやPyTorchのTensorが、裏側で何をやってくれているのかを実装のレベルで理解できました。また、予期していなかった収穫として、一定の規模を持つソフトウェアにおける依存関係の設計を学ぶこともできました。お盆休みを大いに楽しむことができました。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873119065&linkId=a43b7ac8d044752254788f81017d6102"></iframe>

ちなみに、第1弾ではニューラルネットの基礎とCNNを、第2弾ではRNNと自然言語処理の基礎を、そして今年発売された第4弾では強化学習を題材としています。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873117585&linkId=84cf8adc13ea2dedeb3b7fbcc2e14447"></iframe>

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873118360&linkId=0566ae66f134309feb9584a1af0c27cd"></iframe>

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873119758&linkId=632eb37f659c6f8bb5cc3e89054f4ad5"></iframe>

## 深層学習
『深層学習 改訂第2版』（岡谷貴之、講談社、2022年）は、2015年に出たベストセラーを2021年の最新の内容でもって大幅改定（ページ数で2倍超の増量！）したものです。第1版が出てからの6年間で、深層学習の研究は驚異的な広がりを見せました。その発展の速さを目の当たりにしてきた一人として、混沌を極める研究分野の各種トピックを取捨選択し、体系立てた形にまとめる作業は大変な苦労だったろうと推察します。参考文献へのリンクも充実しており、日本語で最新の状況をある程度詳しく把握したいという方には最適な一冊だと言えます。これを読んでおけば、NeurIPSなどの国際学会を聴講しに行っても迷える子羊にならずに済むでしょう。

具体的な新規追加トピックとしては、陰的表現、二重降下、Transformer、GNN、敵対的攻撃、説明性、距離学習、自己教師学習、転移学習、生成モデルなどがあります。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4065133327&linkId=9aa74f96d718d64ddea9ee008e507b9c"></iframe>

## 深層学習の原理に迫る
『深層学習の原理に迫る: 数学の挑戦』（今泉允聡、岩波書店、2021年）は、「深層学習はなぜうまくいくのか」という問いに答えるべく現在進行系で進められている理論研究の最新の成果を一般向けに解説した本です（縦書きです）。

古典的な学習理論によれば、モデルのパラメータ数と汎化誤差にはトレードオフ[^1]の関係があり、過剰なパラメータを持つモデルは過適合しやすいはずです。しかし近年、[GPT-3](https://arxiv.org/abs/2005.14165)を始めとする巨大モデルの研究で、「パラメータが多ければ多いほど汎化性能が向上する」という実験結果が多数報告されています[^2]。深層学習には明らかに、「古典理論では捕捉できていない何か」がありそうです。本書では、そのような「深層学習の不思議」に迫るための理論の有力候補として、暗黙的正則化、平坦解（flat minima）、二重降下の3つを平易な言葉で説明します。また、学習（パラメータの最適化）アルゴリズムという観点から、Langevin動力学やNTK (neural tangent kernel)といったトピックも取り上げます。

多少前提知識が必要になりますが、著者の講演の[動画](https://youtu.be/hOJCs1X5q8g)や[スライド](https://www.slideshare.net/MLSE/ss-237278350)がより詳しい紹介の代わりとなるでしょう。一般書なので、勉強というよりも、ブルーバックスを読むような気楽な気持ちで楽しく読むことができました。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4000297031&linkId=b0b1b68f949cda41b89d535ccf9cd2f5"></iframe>

## パターン認識と機械学習
『パターン認識と機械学習』（Christopher M. Bishop　著、元田浩、栗田多喜夫、樋口知之、松本裕治、村田昇 監訳、丸善出版、2012年）は、言わずとしれた機械学習の名著です。線形モデル、SVM (support vector machine)、ニューラルネットワークといった機械学習モデルやグラフィカルモデル、サンプリング法などの幅広い話題に対して、Bayes理論という一貫した視点から解説を与えています。

積ん読になっていたものを一念発起して読みました。が、一度通読しただけで理解できるような易しい教科書ではありませんでした。言い訳をすると、今の仕事でBayesの定理を使って周辺化して…といった計算を自力ですることはほとんどないので、序盤にして計算式を追うモチベーションを失ってしまったのが原因です。そのような中での個人的ハイライトは、付録にある数学の復習（確率分布、行列、変分法、Lagrange乗数）でした。ここは普段の生活でも何かと役立ちそうです。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4621061224&linkId=d82c519d0ab367053b5fb2e1d1deed04"></iframe>

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4621061240&linkId=5c763ac579160ba9cefc9e0fb87e21af"></iframe>

## 施策デザインのための機械学習入門
『施策デザインのための機械学習入門〜データ分析技術のビジネス活用における正しい考え方』（齋藤優太、安井翔太、技術評論社、2021年）は、機械学習のビジネス活用の中でも特に「問題の定式化」を詳しく解説した珍しい本です。「問題の定式化」とは機械学習を行う前段の工程で、次のようなステップからなります。

1. ビジネス的に意味があり、かつ計測が容易なKPIを設定する
2. データの観測構造をモデル化する（観測バイアスの洗い出し）
3. 解くべき問題を特定する（真の損失関数の設計）
4. 観測データから計算可能な損失関数の不偏推定量を設計する

具体例を挙げましょう。過去に行ったクーポン配布施策の結果から、「次回、誰にクーポンを配れば売上を最大化できるか」を考えます。「各会員にクーポンを配った場合と配らなかった場合の売上を予測すれば、その差分から誰に配るべきかを決められる」というところまで辿り着くのは難しくないでしょう。しかし、ここで2の観測バイアスが考慮から漏れていると、後段でバイアスを持った損失関数でモデルを訓練することになってしまいます。例えば、過去のクーポン配布が性別によって異なる確率で行われていた場合、ナイーブに訓練したモデルはこのバイアスの影響を受けます。このような事態を防ぐには、観測バイアスを明示的にモデリングした上で、4で不偏推定量を設計する必要があります。

ここで役に立つのが、著者の齋藤氏の専門分野でもある反実仮想機械学習です。詳しくは同氏が公開している[スライド](https://docs.google.com/presentation/d/1LmDXroGHR9Qs9egvWnBgBG0zchLsxAkGBxSbmxgGIfM/edit?usp=sharing)や[文献ガイド](https://www.ai-gakkai.or.jp/resource/my-bookmark/my-bookmark_vol35-no4/)を参照いただきたいですが、典型的にはIPS（inverse propensity score）による損失関数の重み付けが採用されます。

本書ではこのように、機械学習を活用した施策において重要な、しかし普段見落とされがちな問題に対処するための考え方、フレームワークを様々な問題設定に対して検討していきます。上記の具体例でギクリと来た方には特におすすめです。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4297122243&linkId=a471496f61a10a9998b01ea7a9af234d"></iframe>

## 仕事ではじめる機械学習
『仕事ではじめる機械学習 第2版』（有賀康顕、中山心太、西林孝、オライリー・ジャパン、2021年）はその名の通り、実務で機械学習を使おうとしている人向けの入門書です。特に、機械学習プロジェクトを社内で初めて立ち上げるという方にとって参考になるであろうトピックが多く、実務の泥臭さが随所に書かれています。中には「機械学習を使わないという選択肢」と題した章もあります。研究と実務のギャップ、あるいは「[機械学習でいい感じにしてくれ](https://www.oreilly.co.jp/books/9784873119472/)」という期待と現実のギャップをいい意味で解消してくれる「実践的な」本です。

私は「機械学習システムの長期的な運用」をテーマとする第6章が目当てで読んだのですが、他の章でも理解が深まったり視野が広がったりと、学べる部分が複数ありました。参考文献も最新のものまで抑えられていて便利です。特に『[機械学習システムデザインパターン](https://mercari.github.io/ml-system-design-pattern/README_ja.html)』は勉強になりました。

まえがきの対象読者には含まれていませんが、将来機械学習を使って仕事をしたいと考えている学生が実際のイメージを付けるのにも役立ちそうです。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873119472&linkId=72fba953af17c39c6552ad3f2e26d1e9"></iframe>

## Pythonで学ぶ強化学習
## A/Bテスト実践ガイド

# ソフトウェア開発
## プログラミング言語Go
## エンジニアリング組織論への招待
## 応用情報技術者試験

## クラウド開発実践入門
## Kubernetes完全ガイド
## Real World HTTP
『Real World HTTP 第2版 ―歴史とコードに学ぶインターネットとウェブ技術』
## Web API: The Good Parts

# ビジネス
## 入門　起業の科学
## ロジカル・プレゼンテーション
## ブルシット・ジョブ
## 世界一楽しい決算書の読み方

## イノベーションのジレンマ
『イノベーションのジレンマ 増補改訂版』

## ジョブ理論
## ザ・ゴール


[^1]: [Bias-variance tradeoff](https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff)
[^2]: [スケーリング則](https://deeplearning.hatenablog.com/entry/scaling_law)としてまとめられています