---
title: 書評『Kaggleで勝つデータ分析の技術』
date: "2020-12-29T23:02:03.284Z"
description: "『Kaggleで勝つデータ分析の技術』のまとめと感想です．"
featuredImage: book_review_kadowaki/ogp.jpg
tags: ["ja", "book", "data-analysis"]
---

## はじめに
『Kaggleで勝つデータ分析の技術』（門脇大輔, 阪田隆司, 保坂桂, 平松雄司 著，技術評論社，2019年）を読んだので，まとめと感想を書きます．

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4297108437&linkId=a500fd0052d8fc805e1d9a3c6dfcc65b"></iframe>

本書は，Kaggleないしデータ分析コンペに関する書籍としてはおそらく邦訳を含めても日本初で，それまでKaggleのKernelやDiscussion，個人ブログなどに散在していたデータ分析の集合知や暗黙知を一冊にまとめることを試みた野心的な参考書です．分析コンペの経験がない初心者はもちろん，ある程度経験のある人でも知識を体系化したり抜け漏れを発見したりするのに役立つと思われます．

本書に関するブログ記事はすでに多数存在します．著者の一人である門脇氏は[自身のブログ](https://threecourse.hatenablog.com/entry/2019/09/28/225720)でその魅力を語っています．また，読者としては[u++氏](https://upura.hatenablog.com/entry/2019/10/02/203057)，[ばんくし氏](https://vaaaaaanquish.hatenablog.com/entry/2019/10/05/213522)，
[nyker_goto氏](https://nykergoto.hatenablog.jp/entry/2019/10/07/Kaggle%E3%81%A7%E5%8B%9D%E3%81%A4%E3%83%87%E3%83%BC%E3%82%BF%E5%88%86%E6%9E%90%E3%81%AE%E6%8A%80%E8%A1%93%3A_%E4%BB%8A%E3%81%BE%E3%81%A7%E3%81%AE%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92%E6%9C%AC%E3%81%A8)らが発売当時に書評を書いています．このような状況なので，この記事は新規の内容をほとんど含まないであろうことを最初に宣言しておきます．また，私はKaggle Noviceなので，やはり上に挙げたような記事の方が信頼性が高いということも付言しておきます．

## まとめ+α
総評としては，比較的新しい知識や，理論付けがなされていないものの分析コンペでは頻繁に用いられるテクニックといった，従来のデータ分析や機械学習の教科書には書かれていなかった内容が書籍の形でまとめられているのは非常に貴重であり，これだけでも一読の価値があると思います．また，バリデーションの方法，勾配ブースティング木，アンサンブルなどのトピックにページ数が割かれている一方で，コンペに臨む上ですぐには必要にならない理論的な側面や実用的な見地から優先順位の低いトピックは大胆に省略されています．むしろ，概念の直感的な理解や，「コンペでどう使うか」といった点に主眼が置かれており，まさに「Kaggleで勝つための本」と言えるでしょう．章どうしの依存関係が少ないので，知識を補強したい部分だけ読むという読み方をするのにもよさそうです．

留意点を挙げるとすれば，本書は*テーブルコンペのみを扱っているという点は購入前に注意しておく必要があります*．最近のKaggleではテーブルコンペはむしろ珍しく，画像や自然言語などの非構造化データを扱うコンペの方が多いです．また，全体を通してコード付きで解説してありますが，pandasやscikit-learnの基本的な使い方については事前に知っておく必要があるでしょう．

### 第1章 分析コンペとは？
本書は分析コンペ未経験の人にも向けて書かれているので，「分析コンペとは何か」の説明から始まります．**Public / Private Leaderboard (LB)**の仕組みやKaggleのKernel，参加登録から予測値の提出までの一連の流れなどについて書かれています．

### 第2章 タスクと評価指標
第2章ではタスク（回帰，分類，物体検出など）と評価指標（RMSE，AUC，MAP@Kなど）の説明に56ページも割いています．この時点で，従来の「データ分析の教科書」とはかなり異なるということがわかると思います．というのも，Kaggleは与えられた評価指標に対してモデルないし予測値の優劣を競うコンペなので，評価指標の性質をよく理解して，必要であれば予測値のキャリブレーションをしたり目的関数を自作したりするといった工夫が効くことがあるからです．実際，2.6.4では実例が紹介されており，「評価指標をMAEとするコンペで，xgboostは内部に目的関数の二階微分（MAEだと0になる）で割るという操作を含むので，MAEを目的関数にとることができない（近似関数を自作する必要がある）」ということがあったそうです．

### 第3章 特徴量の作成
第3章は，データ分析にかける時間の大部分を占めるとも言われる特徴量エンジニアリングないし前処理を扱います．104ページと，本書でもっとも長い章です．欠損値処理，カテゴリ変数の変換（**one-hot encoding**，**target encoding**，**embedding**など），日付・時刻を表す変数の変換，時系列特徴量といった基本的な処理や，PCAやbag-of-wordsを使った特徴量の作成方法を幅広く解説しています．また，過去のコンペで勝敗を左右した特徴量の事例も紹介しています．

### 第4章 モデルの作成
第4章は，Kaggleでよく使われる機械学習アルゴリズムを紹介します．分析コンペという利用目的を想定しているので，**勾配ブースティング木**（GBDT）の解説にかなりの比重が置かれています（一方，SVMは名前すら登場しません）．GBDTの主要なライブラリである**xgboost** / **lightgbm** / **catboost**の違いについても書かれており，GBDTの日本語の解説としては知る限りでもっとも詳しい資料だと感じました．ニューラルネットについてはkerasの簡単な使い方を説明しています．

### 第5章 モデルの評価
モデルの改善と評価のサイクルを何度も回していると，徐々に手元のデータやPublic LBのデータに過適合していってしまいます．Public LBでどれほど予測精度が高くても，Private LBで予測精度が悪くては意味がありません．したがってKaggleでは，いかに過適合を防いで限られたデータで汎化性能を高めるかが非常に重要です．本章では，**ホールドアウト法**や**交差検証法**といった基本的なバリデーションの手法に加えて，訓練データとテストデータの分割方法に関する考察や**adversarial validation**という「Kaggleらしい」手法の紹介をしています．

### 第6章 モデルのチューニング
信頼できる評価プロセスができたら，**ハイパーパラメータチューニング**によってさらに精度を向上できるでしょう．ここでは，手動チューニング，グリッドサーチ，ベイズ最適化（c.f. [optuna](https://optuna.org/)）といった方法が紹介されています．暗黙知になりがちなGBDTの手動チューニングの方法についても，筆者自身の方法が紹介されています．

また，特徴量の取捨選択を行うのも精度向上につながるかもしれません．ここでは，特徴量選択に使える統計量や決定木の特徴量重要度について解説しています．

### 第7章 アンサンブル
第7章は，本書でもっとも特徴的な部分とも言える「モデルの**アンサンブル**」の解説です．アンサンブルについては理論に根ざした方法論があるわけではないのでほとんどの参考書では扱われていない印象がありますが，Kaggleの上位解法には不可欠な要素ということで，本書の最後に取り上げられています．「こうするとうまくいくことが多い」という経験的な知識ではありますが，自分で闇雲に試すよりもこのような指針を頭に入れてから臨んだ方が効率的だと思います．

## 関連書籍
まだ読めていないのですが，近年Kaggleをテーマにした書籍が各社から出版されており，Kaggleの日本での盛り上がりを感じることができます．

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4065190061&linkId=5454a45766d6102a3e1333bd90f77e9f"></iframe>

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4839968934&linkId=a2594c0b7700520862cc2eac020000a1"></iframe>

また，特徴量エンジニアリングについては『機械学習のための特徴量エンジニアリング』も詳しいです．

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=hippocampus09-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873118689&linkId=b79d10a57641b93259bc98d157e93e90"></iframe>