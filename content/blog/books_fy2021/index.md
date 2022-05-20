---
title: 入社2年目に読んだ本
date: "2022-05-20T23:02:03.284Z"
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
- 課題起点でサービスや機能を設計する方法

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
  - [応用情報技術者 合格教本](#応用情報技術者-合格教本)
  - [AWSではじめるクラウド開発入門](#awsではじめるクラウド開発入門)
  - [エンジニアリング組織論への招待](#エンジニアリング組織論への招待)
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
『ゼロから作るDeep Learning ❸ ―フレームワーク編』（斎藤康毅、オライリー・ジャパン、2020年）は、数値計算ライブラリ（NumPy）だけで深層学習モデルを実装することを通してその内部動作を理解するということをコンセプトにした、大人気シリーズの第3弾です。第3弾では、これまでは手動で定義していた各種演算の誤差逆伝播を自動で計算できるように、「DeZero」と名付けた深層学習フレームワークを自作します。DeZeroは[Chainer](https://chainer.org/)に似たインターフェイスを持つDefine-by-RunのピュアPythonフレームワークです。

「深層学習フレームワークを自作する」と言うと気が遠くなるように思えますが、全体の作業が60の小さなステップに分割されているため、短いスパンで達成感を得ながら無理なく完遂することができます。完遂後に見える景色はそれまでと全く異なるものでした。NumPyのndarrayと似たインターフェイスを持つChainerのVariableやPyTorchのTensorが裏側で何をやってくれているのかを実装のレベルで理解できました。また、予期していなかった収穫として、一定の規模を持つソフトウェアにおける依存関係の設計を学ぶこともできました。お盆休みを大いに楽しむことができました。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873119065&linkId=a43b7ac8d044752254788f81017d6102"></iframe>

ちなみに、第1弾ではニューラルネットの基礎とCNNを、第2弾ではRNNと自然言語処理の基礎を、そして今年発売された第4弾では強化学習を題材としています。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873117585&linkId=84cf8adc13ea2dedeb3b7fbcc2e14447"></iframe>

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873118360&linkId=0566ae66f134309feb9584a1af0c27cd"></iframe>

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873119758&linkId=632eb37f659c6f8bb5cc3e89054f4ad5"></iframe>

## 深層学習
『深層学習 改訂第2版』（岡谷貴之、講談社、2022年）は、2015年に出たベストセラーを2021年の最新の内容でもって大幅改定（ページ数で2倍超の増量！）したものです。初版が出てからの6年間で、深層学習の研究は驚異的な広がりを見せました。その発展の速さを目の当たりにしてきた一人として、混沌を極める研究分野の各種トピックを取捨選択し、体系立てた形にまとめる作業は大変な苦労だったろうと推察します。参考文献へのリンクも充実しており、日本語で最新の状況をある程度詳しく把握したいという方には最適な一冊だと言えます。これを読んでおけば、NeurIPSなどの国際学会を聴講しに行っても迷える子羊にならずに済むでしょう。

具体的な新規追加トピックとしては、陰的表現、二重降下、Transformer、GNN、敵対的攻撃、説明性、距離学習、自己教師学習、転移学習、生成モデルなどがあります。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4065133327&linkId=9aa74f96d718d64ddea9ee008e507b9c"></iframe>

## 深層学習の原理に迫る
『深層学習の原理に迫る: 数学の挑戦』（今泉允聡、岩波書店、2021年）は、「深層学習はなぜうまくいくのか」という問いに答えるべく現在進行系で進められている理論研究の最新の成果を一般向けに解説した本です（縦書きです）。

古典的な学習理論によれば、モデルのパラメータ数と汎化誤差にはトレードオフ[^1]の関係があり、過剰なパラメータを持つモデルは過適合しやすいはずです。しかし近年、[GPT-3](https://arxiv.org/abs/2005.14165)を始めとする巨大モデルの研究で、「パラメータが多ければ多いほど汎化性能が向上する」という実験結果が多数報告されています[^2]。深層学習には明らかに、「古典理論では捕捉できていない何か」がありそうです。本書では、そのような「深層学習の不思議」に迫るための理論の有力候補として、暗黙的正則化、平坦解（flat minima）、二重降下の3つを平易な言葉で説明します。また、学習（パラメータの最適化）アルゴリズムという観点から、Langevin動力学やNTK (neural tangent kernel)といったトピックも取り上げます。

多少前提知識が必要になりますが、著者の講演の[動画](https://youtu.be/hOJCs1X5q8g)や[スライド](https://www.slideshare.net/MLSE/ss-237278350)がより詳しい紹介の代わりとなるでしょう。一般書なので、勉強というよりも、ブルーバックスを読むような気楽な気持ちで楽しく読むことができました。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4000297031&linkId=b0b1b68f949cda41b89d535ccf9cd2f5"></iframe>

## パターン認識と機械学習
『パターン認識と機械学習』（Christopher M. Bishop 著、元田浩、栗田多喜夫、樋口知之、松本裕治、村田昇 監訳、丸善出版、2012年）は、言わずとしれた機械学習の名著です。線形モデル、SVM (support vector machine)、ニューラルネットワークといった機械学習モデルやグラフィカルモデル、サンプリング法などの幅広い話題に対して、Bayes理論という一貫した視点から解説を与えています。

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
『Pythonで学ぶ強化学習 入門から実践まで』（久保隆宏、講談社、2019年）は、強化学習の実装にフォーカスした入門書です。従来の類書は数式だけの説明に留まるものが多かったところ、本書では数式と実装を組み合わせた解説をしているところに特徴があります。

7日間で読み終えられる構成になっていて、1-4日目で強化学習の導入とベースライン手法の紹介、5日目で強化学習の弱点（サンプル効率の悪さ、局所解、再現性の低さ）の指摘、6日目で模倣学習やモデルベースといった対策の紹介、7日目で応用事例の紹介をしています。個人的ハイライトは7日目で、対話や創薬など「ゲームやロボット以外」の応用先を知ることができたのが良かったです。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4065142989&linkId=6643f521e951c0af90d61d973b73c6a8"></iframe>

## A/Bテスト実践ガイド
『A/Bテスト実践ガイド 真のデータドリブンへ至る信用できる実験とは』（Ron Kohavi、Diane Tang、Ya Xu 著、大杉直也 訳、KADOKAWA、2021年）は、A/Bテストに関して「なぜやるべきなのか」「どうやってやるか」「どうやって大規模サービスにスケールさせるか」「どんな落とし穴があり得るか」といったことを網羅した本です。Googleを初めとする先進企業におけるA/Bテストの実態（成功例、失敗例、運用方法など）が詳らかに書かれているのも魅力的な点です。日本語では最も詳しい情報源と言えるのではないでしょうか。手元にあるといざというときに心強い一方、かなり細かい事項まで書いてあるので、必要なタイミングで一部だけ読むという読み方が良さそうだと感じました。全体的に読みづらいこともあって通読には苦労しました（訳と原著の両方に問題があると見ています）。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4048930796&linkId=a1440853b54fb732d6c2ff1aa486a327"></iframe>

# ソフトウェア開発
## プログラミング言語Go
『プログラミング言語Go』（Alan A. A. Donovan、Brian W. Kernighan 著、柴田芳樹 訳、丸善出版、2016年）は、Go言語の標準的な教科書です。基本的な文法や型の説明に始まり、ゴルーチンやリフレクションといった特徴的な項目までを扱います。「手っ取り早くライブラリを使えるようになりたい」という方よりは、「言語仕様をしっかり理解したい」という方向けの教科書だと言えます。まえがきに書いてあるとおり、全くのプログラミング初心者には難しいでしょう。

勤務先にて[訳者の柴田氏から講義をしていただく機会](https://yshibata.blog.ss-blog.jp/2022-02-23)があり、その研修に参加するために読みました。この研修は毎回の講義の前に対象範囲の練習問題を全て解いてくることになっており、社内ではハードなことで有名でした。実際、プライベートの時間の大部分を投じてもなお解ききれないこともあるというくらい大変でしたが、もちろん大いに勉強になりました（やはり練習問題を解かなければ知識が定着しなかったと思います）。まだまだPythonほどではありませんが、「第二言語」くらいには読み書きできるようになりました。

ところで、研修前はGo言語を使う機会がしばしばあったのですが、その後めっきり機会が減ってしまったので少し寂しく感じています。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4621300253&linkId=835da42eccb848fd4be893824c15cebd"></iframe>

## 応用情報技術者 合格教本
『令和03年【春期】【秋期】 応用情報技術者 合格教本』（大滝みや子、岡嶋裕史、技術評論社、2020年）は、[応用情報技術者試験](https://www.jitec.ipa.go.jp/1_11seido/ap.html)の参考書です。出題範囲を網羅した解説とサンプル問題から構成されています。

昨年10月に同試験を受けるときに参考書として使用し、無事合格しました。本自体の解説は不要だと思うので、この本をどうやって使ったかを書いておきます。

1. 各章について、解説パートを読んで得点アップ問題を解く
   - 理解不足なところには印をつけておく
   - 午後試験でも必要になる範囲から順に取り組む（時間不足で「セキュリティ」の対策が不十分などという事態を避けるため）
2. サンプル問題を解いて、解けなかった部分を復習する
3. 過去問を数年分解いて、解けなかった部分を復習する
   - ここで合格ラインに届くことを確認しておく
4. 試験直前では、印をつけた部分や解けなかった部分を中心に復習する
   - 復習だけなら移動中や休み時間にもできるので

普段の仕事や勉強では機械学習の周辺領域しか扱わないので、「情報技術」について広く勉強する良い機会になりました。

本書の令和04年版はこちら。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=429712467X&linkId=e73571c5f1a026b729eb3ddb2e52a19e"></iframe>

## AWSではじめるクラウド開発入門
『AWSではじめるクラウド開発入門』（真野智之、マイナビ出版、2021年）は、東京大学で学部生向けに開講されたクラウド開発の授業で使われた資料『[コードで学ぶAWS入門](https://tomomano.github.io/learn-aws-by-coding/)』を、増補改訂して書籍化したものです。著者の真野氏は私の研究室時代の先輩だったので、私は講義資料の段階から読ませていただいていました。「こんなに素晴らしい授業を受けられる今どきの学部生は羨ましい」という感想を抱いたのを今でも覚えています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">出身研究室の先輩が東大計数工学科の講義の一部として担当した『AWSによるクラウド入門』の資料が公開されています。<br>クラウド入門者向けに簡潔かつ平易な言葉で書かれている貴重な資料です。5つのハンズオンで、最後は俳句を投稿するWebアプリを実装・デプロイします。<a href="https://t.co/XmFGGnsP3r">https://t.co/XmFGGnsP3r</a> <a href="https://t.co/9nDxzBovTW">pic.twitter.com/9nDxzBovTW</a></p>&mdash; Shion Honda (@shion_honda) <a href="https://twitter.com/shion_honda/status/1281572631544655872?ref_src=twsrc%5Etfw">July 10, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

本書には特筆すべきところが2つあります。一つは、本書がハンズオンを中心に構成されているところです。全15章のうち、実に9章がハンズオンです。開発というものは当然ながら、実際に手を動かしてエラーに遭遇しながらモノ作りをしないと身につかないものです。もう一つは、全体を貫く明快な書きぶりです。この手の本は見慣れないカタカナの用語で埋め尽くされてしまうきらいがありますが、本書では「サーバーレス」や「リソース」といった用語が、登場するたびごとにそのご利益とともに明確に説明されています。真の意味で初心者に寄り添った入門書だと言えます。

なお、本書はAWSの解説書ではなく、あくまでクラウド開発を解説するための題材としてAWSを使っているので、本書で得られる基礎知識はGCPやAzureといった別のクラウドサービスにも容易に転用できますし、すぐに陳腐化することもないでしょう。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4839977607&linkId=c9457515f26bbdf0d6e3cfe312d2edad"></iframe>

## エンジニアリング組織論への招待
『エンジニアリング組織論への招待 ~不確実性に向き合う思考と組織のリファクタリング』（広木大地、技術評論社、2018年）は、エンジニア組織につきまとう技術的負債、他組織との不和、納期の不安といった様々な問題を不確実性という観点から検討し、対策を講じるための材料を提供する本です。今回はメンタリングとプロジェクトマネジメントについて学ぶために読みました。仕事に対する考え方は経験を積むにしたがって移ろっていくものだと思うので、今後も読むたびごとに新たな発見が得られそうです。

一方で、指摘したいことが2つあります。一点は、各章が理念と具体的な方法論を混在させながら列挙するような構成になっており、全体としてのメッセージがわかりづらいことです。組織論にまつわる諸概念をまとめた入門資料だということであれば納得できるのですが、その場合はもう一点の「出典の少なさ」が問題になってきます。イドラを説明するときは『ノヴム・オルガヌム』を出典として明示しているのに、すぐ後の心理学からの知見を紹介するところでは出典がないというアンバランスが気になりました。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4774196053&linkId=5d8641ef86ac10f8502e4773467e262d"></iframe>

## Kubernetes完全ガイド
『Kubernetes完全ガイド』（青山真也、インプレス、2018年）は、Kubernetesを構成する種々の概念と周辺技術（DataDog、Fluentd、Istioなど）を実践的観点から網羅的に解説した本です。巻末に「やりたいこと」から逆引きできる索引が付いているので、手元にあると便利かもしれません。

2020年に出版された第2版はこちら。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4295009792&linkId=716cb2a1aaf616bc3a921015a452bdb8"></iframe>

## Real World HTTP
『Real World HTTP 第2版 ―歴史とコードに学ぶインターネットとウェブ技術』（渋川よしき、オライリー・ジャパン、2020年）は、Web技術の中でも比較的変化の小さいHTTPについて、その変遷の歴史とともに基礎を解説した本です。GoやJavaScriptによる実装例を通してクライアントとサーバーの動作を学べます。

応用情報技術者試験と合わせてWeb技術に対する理解を深めるのに役立ちましたが、理解しきれなかったところもあるので今後も折に触れて参照したいと思います。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873119030&linkId=9e3ac52b7bf30f9d959214a9a8b72b78"></iframe>

## Web API: The Good Parts
『Web API: The Good Parts』（水野貴明、オライリー・ジャパン、2014年）は、長く使える堅牢なWeb APIを設計・開発・運用するための手引き書です。エンドポイント・リクエスト・レスポンスの設計、HTTPヘッダの仕様、セキュリティの対策といった話題を取り扱っています。すぐに読み終えられる分量なので、特に公開APIを作るときは事前に読んでおくと安心です。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873116864&linkId=8bdb269e4caf7612b28efd0ccdfa1bc5"></iframe>

# ビジネス
## 入門　起業の科学
『入門 起業の科学』（田所雅之、日経BP、2019年）は、起業や新規事業で「失敗する確率を減らす」ための方法論をまとめた本です。オリジナルの『起業の科学 スタートアップサイエンス』の内容を「PMF（product market fit）達成」までに絞り、読みやすくしたものです。

著者いわく、スタートアップを成功させるための「公式」はないものの、失敗を減らす方法はあるのだそうです。本書は失敗を回避するために気をつけるべきポイントを、シード期の4つのステップごとに解説しています。具体的には、以下のようなポイントが39個あります。

1. Idea verification
   - 解決する課題には自分ごととして考えられる「顧客の痛み」を選ぶ
   - 「他の人が知らない秘密」を探す（誰もが賛同するアイディアはその時点でレッドオーシャンになっている可能性が高い）
   - 5年後の未来を想像し、そこで市場を独占できるアイディアを選ぶ
2. Customer problem fit
   - ペルソナは明確に定める
   - 仮説の前提条件のうち、依存度合いと不確実性が高いものから検証する
3. Problem solution fit
   - ペーパープロトタイプを活用する
4. Product market fit
   - MVP（minimal viable product）を作って「顧客がお金を払ってでも使いたいかどうか」を検証する
   - スプリントでMVPを作り込んでKPIを改善する

私は本書を社内起業に挑戦するために読みました。読む前は「PMFって何？」というくらいの無知さ加減でしたが、読了後はゴールまでの見通しができて仕事を進めやすくなりました。起業というと大それた話に思えますが、ここに書いてある内容は「新機能の開発」くらいの規模の話にも十分役立つと思います。そう考えると、対象読者は著者が想定するよりもずっと多いのではないでしょうか。

より詳しく知りたい方は、[著者が公開しているスライド](https://masatadokoro.medium.com/https-medium-com-masatadokoro-startup-science-2018-5228111b275f)もご参照ください。


<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4296100947&linkId=30229a04dd9c4f81cc06899627977e23"></iframe>

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4822259757&linkId=e0cc8a09643ec230b011454131f7ce07"></iframe>

## ロジカル・プレゼンテーション
『ロジカル・プレゼンテーション――自分の考えを効果的に伝える戦略コンサルタントの「提案の技術」』（高田貴久、英治出版、2004年）は、仕事で自分の考えを相手に伝えて提案を合意に導くための技術を解説した本です。異なる価値観を持つ人を説得するためには論理的に話を進める必要があります。ただし、ここで重要なのは、合意に至るには相手に納得してもらうことが全てなので、独りよがりな「論理的思考」に陥ってはならないということです。本書は、「相手に寄り添った論理的提案」を実現するためのスキルを解説しています。また、会議設計や資料作成の心構えについても説明されており、ここまで習得できればかなり折衝に強くなれそうだと感じました。

ところで、本書では『[問題解決](https://hippocampus-garden.com/books_fy2020/#%E5%95%8F%E9%A1%8C%E8%A7%A3%E6%B1%BA)』と同様に、各章の始めにコンサルタントを主人公とするビジネス小説が挿入されています。後述する『ザ・ゴール』の漫画版があるくらいですから、この小説を漫画化したものも売れるのではないかと思いました。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4901234439&linkId=4c96d6ba9eb272df08d2f3b1984fcaf8"></iframe>

## ブルシット・ジョブ
『ブルシット・ジョブ――クソどうでもいい仕事の理論』（David Graeber 著、酒井隆史、芳賀達彦、森田和樹 訳、岩波書店、2020年）は、ブルシット・ジョブ（[被雇用者本人でさえ、その存在を正当化しがたいほど、完璧に無意味で、不必要で、有害でもある有償の雇用の形態](https://www.iwanami.co.jp/news/n35930.html)のこと）が世に蔓延するメカニズムの解明を試みた本です。1930年に経済学者のJohn Maynard Keynesは「21世紀には週15時間労働が達成されるはず」と予測したそうですが、実際にはそうなっていません。技術は着実に進化しているのに、なぜでしょうか？そして、ブルシット・ジョブに従事する人がしばしば高い給料と社会的地位を得ているのはなぜでしょうか？著者はその答えの鍵を、20世紀に急増した情報労働者に求めます。詳しくは割愛しますが、滑稽なほどにブルシットな事例に笑ったり、ときどき他人事ではない話に遭遇して背筋が寒くなったり、後半で展開されるネオリベラリズム批判では真面目に社会のことを考えたりと、様々な方向で楽しめる本でした。

また、仕事でコードを書いている人間にとって、OSSへの言及は特に耳の痛い話でした。いわく、ソフトウェア企業はコスト削減のためなるべくOSSを使うようにし、従業員には接続部分の実装や障害対応（本書で定義される「尻拭い」に該当）ばかりをやらせる。そうすると価値のあるおもしろい仕事はOSSに集まるので、エンジニアは余暇を使って無料でOSS開発をする。ソフトウェア業界にはこのような循環が生じている、という指摘です。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4000614134&linkId=8b16cc9797317aa7fc4ebc2eb354c65e"></iframe>

## 世界一楽しい決算書の読み方
『会計クイズを解くだけで財務3表がわかる 世界一楽しい決算書の読み方』（大手町のランダムウォーカー 著、わかる イラスト、KADOKAWA、2020年）は、[会計クイズ](https://www.funda.jp/)を通して財務3表を学べる本です。自力で決算書を読む機会は今のところ皆無ですが、経済系のリテラシーを身に付けるために読みました。Amazonと楽天、ユニクロとZARAといった同業他社がそれぞれ違ったビジネスモデルを採っている、というような「身近だけど知らないこと」が多く書かれていておもしろかったです。タイトルに偽りなしでした。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4046043679&linkId=74a88956be7b78c6316c9d4aa2e0a8dc"></iframe>

## イノベーションのジレンマ
『イノベーションのジレンマ 増補改訂版』（Clayton Christensen 著、伊豆原弓 訳、2001年、翔泳社）は、イノベーションのジレンマを提唱したChristensen氏本人による同概念の解説書です。この言葉の意味については、[グロービス経営大学院による定義](https://mba.globis.ac.jp/about_mba/glossary/detail-11714.html)がわかりやすいです。

> イノベーションのジレンマとは、業界トップになった企業が顧客の意見に耳を傾け、さらに高品質の製品サービスを提供することがイノベーションに立ち後れ、失敗を招くという考え方。

そのようなジレンマが発生するメカニズムについては上記リンク先、または本書をご参照ください。ひとつ誤解しやすい点は、ここで話題にしている「破壊的イノベーション」は技術的ブレイクスルーのことではないということです。破壊的イノベーションとは、短期的には性能を下げ、市場に新たな価値基準をもたらすような製品（それゆえに破壊的（disruptive））のことを言います。例えば、5Gという通信技術自体は破壊的イノベーションではありませんが、「5Gによって実現可能になる低価格サービス」が破壊的イノベーションとなることはあり得ます。

全体としてはおもしろかったのですが、本書は著者の博士論文を下敷きにしているらしく、一般書だと思って読むと面食らってしまう難解さがありました。また、事例研究は2000年頃に発展のサイクルが速かったディスクドライブ市場を対象としているため、当時6歳だった自分には馴染みませんでした。もっとサイクルが早いであろう現在のソフトウェアサービスを題材にしつつ、一般向けに書き直した本があればいいなと感じました。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4798100234&linkId=edb7f684e9d4f9f11298b328ee3e3884"></iframe>

## ジョブ理論
『ジョブ理論　イノベーションを予測可能にする消費のメカニズム』（Clayton Christensen 著、依田光江 訳、ハーパーコリンズ・ ジャパン、2017年）は、

> - 顧客が商品を買うこととは、片づいていない「ジョブ(用事・仕事)」を解決するために何かを「雇用」することである。
> - ビッグデータは顧客が「誰か」を教えてくれても、「なぜ」買うのかは教えてくれない。
> - 数値化できない「因果関係」にこそ、成功するイノベーションの鍵がある。
> - 自社製品も他社製品も買っていない「無消費者」を取り込め。

という「イノベーションの起こし方」を説いた本です。前述の『イノベーションのジレンマ』がわかりづらかったので、同氏が一般向けに書いた最近の本ならどうだろう、ということで読んでみました。こちらは読みやすかったです。

実は上記の要約は下記の商品ページに書かれていたものの抜粋なのですが、いろいろな場所で語られる話なので、これだけで本の内容を理解できるという方も多いでしょう。とはいえ、マーケットインを徹底するというのは存外に難しいことですよね（一生使わないであろう機能がたくさんついた炊飯器が我が家にもあります）。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4596551227&linkId=3cb31fdf0a7af59f733f3ec0bbc6c47c"></iframe>

## ザ・ゴール
『ザ・ゴール コミック版』（Eliyahu Goldratt、Jeff Cox 原作、岸良裕司 監修、青木健生 脚色、蒼田山 漫画、ダイヤモンド社、2014年）は、製造プロセスの全体最適を実現するための「制約理論（ToC; theory of constraints）」を説いた『ザ・ゴール』の漫画版です。

勤務先の[エンジニアコース新人研修](https://blog.recruit.co.jp/rtc/2021/08/20/recruit-bootcamp-2021/)でToCなるものが教えられていると聞いて、図書館で『ザ・ゴール』を手にとってみました。これが560ページに及ぶ「長編ビジネス小説」で読もうかどうか躊躇していたところ、漫画版の存在を知ってこちらを読むことにしました。

「理論」というだけあってストーリーの背景には[クリティカルチェーン・プロジェクトマネジメント](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AA%E3%83%86%E3%82%A3%E3%82%AB%E3%83%AB%E3%83%81%E3%82%A7%E3%83%BC%E3%83%B3%E3%83%BB%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88)（CCPM; critical chain project management）というアルゴリズムが想定されているようですが、漫画の中ではそのようなフォーマルな言葉は登場しませんでした。個人的には数式を用いた解説も欲しかったのですが、実践の際に厳密に数値データを集めて最適化するケースは少ないでしょうから、ストーリー仕立てにした方が実践的なのでしょう。漫画版を読んだ後に改めて[研修資料](https://speakerdeck.com/recruitengineers/toc-introduction)を見ると、その完成度の高さがよくわかりました。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4478039399&linkId=9858c0c2c9aae495f72a8ecf16cebc51"></iframe>

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4478420408&linkId=3b9f48f011c9d3d3928b7bac2a6db426"></iframe>

[^1]: [Bias-variance tradeoff](https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff)
[^2]: [スケーリング則](https://deeplearning.hatenablog.com/entry/scaling_law)としてまとめられています