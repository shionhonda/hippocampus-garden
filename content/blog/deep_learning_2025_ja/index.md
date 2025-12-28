---
title: 2025年AI論文レビュー
date: "2025-11-28T23:02:03.284Z"
description: "AIによって知識がコモディティ化していく時代において、人間の価値がどこで生まれるのかを、フロンティア知識と行動のプレミアムという観点から整理しました。"
featuredImage: deep_learning_2025/ogp.jpg
tags: ["ja", "deep-learning", "llm"]
---

2025年は **LLM の推論能力を引き出す試み**と、モデルの**信頼性・責任ある利用を測る基盤技術**が一気に進んだ年でした。
産業界ではGPT-5、Gemini 3、Claude 4.5 Opusなどの強力な推論能力を持ったLLMや、CursorやClaude Codeのようなエージェント型アプリケーションが登場し、人々の生活を変えました。
時代の変化についていくためには、これらの製品に触れるのも大事だが、現在の課題が何なのか、今後数年でどんなことが可能になるのかを知るには、学術界にアンテナを貼っておくのも有効。
そこで、本記事では、AI 技術にキャッチアップし続けたいエンジニアやテック業界の方々に向けて、2025 年に注目を集めた5本の研究を取り上げ、その意義と限界、今後の展望を解説します。

ご興味があれば、[2024年の振り返り](https://hippocampus-garden.com/deep_learning_2024/)もご覧ください。

## DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning

* Authors: DeepSeek-AI
* Paper: https://arxiv.org/abs/2501.12948v1
* Model weight: https://huggingface.co/deepseek-ai/DeepSeek-R1
* Venue: Nature

[https://x.com/shion_honda/status/1885992551905153518](https://x.com/shion_honda/status/1885992551905153518)

DeepSeek AI が発表した本論文は、SFTやRLHFを通して人間の推論を使うことなくLLMに多段推論を学習させる初の試みです。著者らはDeepSeek‑V3 （ベースモデル）に対し**Group Relative Policy Optimization (GRPO)** [^1] を用いた強化学習を行い、数学やプログラミング問題の正解率だけを報酬信号にしました。学習時は \<think/\> と \<answer/\> タグを用いたテンプレートで、「よく考えてからから回答する」ことだけをモデルに要求します 。するとモデルは自発的に **検証・自己反省・戦略の切り替え**などの長い思考の連鎖（CoT）を生み出し、**AIME 2024 の pass@1 スコアが 15.6 % から 71.0 % に跳ね上がる**など、大幅な性能向上が観測されました 。

本論文の特に面白い点は以下の2つです：
- **人手に頼らない事後学習**：従来、LLMの事後学習ではSFTとRLHFの2ステップが必要とされていました。これらは大量の人手アノテーションに依存し、バイアスを含みがちです。R1-zeroは、数学やプログラミングなど検証可能な問題の正解だけを報酬とした RL により推論能力を自発的に生み出せることを示しました 。Tulu 3の論文[^2]で登場したRLVR (Reinforcement Learning with Verifiable Rewards)が、実際にOpenAI o1レベルの性能を引き出せるということを、実証しました。ただし、SFTやRLHFが無意味になったというわけではなく、R1-zeroには言語の混同などの問題があったため、著者らはさらにSFTを施したR1も開発しました。
- **長考の創発**：RL 学習の途中でモデルが推論時間を徐々に伸ばし、「正解に辿り着くまで自己修正を繰り返す」ようになる様子が観察されました 。難しい問題では1万トークンもの長い推論をすることもあったそうです。R1が出るまで、o1を再現する試みが色々なされていましたが、本論文によって長考を創発させるレシピが公開されたというのは非常に大きなインパクトでした。論文中ではプロセス報酬モデルやMCTSなどうまくいかなかったアプローチについても議論されています。

DeepSeek AI は R1 系列のモデルをV3系列とともにオープンウェイトで公開しました 。2025年1月にこのモデルが公開されると、中国のアプリストアで DeepSeek アプリが一時的に ChatGPT を抜いて 1 位となり、NVIDIA 株価が下落するほどの騒ぎ（「DeepSeekショック」）に発展しました。Alibabaや Moonshot AI、Z.AI など中国企業はこの波に乗り、クローズドモデルに匹敵する性能を持つオープンモデルを続々と公開しています 。

ご興味があれば、[2025年3月に私が書いたブログ記事](https://medium.com/alan/deepseek-r1-demystifying-llms-reasoning-capabilities-f6332154349b)もご参照ください。

## Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?

- Authors: Yang Yue, Zhiqi Chen, Rui Lu, Andrew Zhao, Zhaokai Wang, Yang Yue, Shiji Song, Gao Huang
- Paper: https://openreview.net/forum?id=4OsgYD7em5
- Project page: https://limit-of-rlvr.github.io/
- Code: https://github.com/LeapLabTHU/limit-of-RLVR
- Venue: NeurIPS 2025

https://x.com/shion_honda/status/2000211219911684138
  
本論文は、上述の RLVR の限界を調べた重要な研究です。著者らは DeepSeek R1など複数の RLVR 訓練済みモデルを対象に、数学・コーディング・視覚推論などのベンチマークで pass@kを大きな k まで測定しました。その結果、小さな kでは RLVR モデルがベースモデルを上回るが、k を増やすとベースモデルが追い抜き、最終的に RLVR モデルを上回ることがわかりました。さらに探索空間を分析すると、RLVR モデルの生成分布はベースモデルに含まれる解答に偏っており、**RLVR は新しい推論能力を生み出すのではなく、既存の解答のサンプリング効率を改善しているだけ**であることが判明しました 。
  
なぜこのような現象が起きるのでしょうか？ 根底には、0/1報酬による探索の困難さがあります。RLVR では正しい出力にのみ報酬が与えられるため、ベースモデルが解けない問題では勾配が得られません。その結果、モデルは既知の「当たりやすい」パターンに集中し、報酬のある解答周辺に分布が鋭く集中していくため、ベースモデルが持っていた多様な推論パターンが失われます 。pass@k の k を大きくすると、その残された多様性が物を言い、ベースモデルが有利になります。一方で、蒸留は教師が持つ推論パターンを生徒モデルに注入できます。

新しい能力を獲得するためのアプローチとして、著者らは、途中経過に報酬を与えるプロセス報酬や価値関数によるクレジット割り当て、大規模・動的なデータによるカリキュラム学習、より強力な探索手法、ツール利用を含むエージェントフレームワークなどが有望だと指摘しています。価値関数によるクレジット割り当ては、Ilya Sutskeverも[最近のインタビュー](https://youtu.be/aR20FWCCjAs?si=kdWGhLAUgKkI_cna)で将来性があると語っていました。

## τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains

- Authors: Shunyu Yao, Noah Shinn, Pedram Razavi, Karthik Narasimhan
- Paper: https://openreview.net/forum?id=roNSXZpUDN
- Project page: https://taubench.com/
- Code: https://github.com/sierra-research/tau2-bench
- Venue: ICLR 2025
https://x.com/shion_honda/status/1903807793028567123

Sierra AI の研究者らは、従来のエージェントベンチマークが一回の対話や API 呼び出しのみを評価しており、**現実のユーザーとの複数ターン対話やドメイン固有の規則遵守、ツールによる状態変更を扱えない**ことを問題視しました 。そこで提案されたのが **τ‑bench** です。τ‑bench は **ツール (API)**、**エージェント**、**ユーザー (LLM によるシミュレーション)** の三者が参加する会話をシミュレートし、回答の内容に加えて最終的なデータベース状態の一致によって客観的に正解を判定します 。

主な特徴は次のとおりです：

- **リアルな対話とツール利用**：ドメイン固有の API （航空と小売）とデータベース（ローカルのJSONファイル）を備え、LLM ベースのユーザーがシナリオに沿って情報を問い合わせることで、複数ターンかつ多様なユーザー発言を実現します 。
- データベース状態に基づく評価：エージェントの出力の評価はLLM-as-judgeやツール利用の確認といった方法が一般的ですが、実応用においては「実際に状態を変更したかどうか」が重要です。そこで、Tau-benchでは会話のシミュレーション後にデータベースが期待された状態になったかどうかを確認します。
- **信頼性指標 pass^k**：pass@k（k 回中少なくとも 1 回成功）の代わりに **pass^k（k 回すべて成功）** を導入し、エージェントの再現性を測ります 。[^3]

Tau-benchを当時の最先端モデルであったGPT-4oで評価したところ、平均成功率48％と、エージェントとして利用する上での課題が浮き彫りになりました。一方で、間違いを精査するとユーザシミュレータのエラーのためにタスクが実行不可能になっているケースが確認されました。そこで、Sierra AI のチームはユーザ側にもツール利用を強制することでシミュレーションの精度を高めた **τ²‑bench**[^4]を始めとする様々な組織から、AIエージェントのツール利用能力を測るベンチマークとして広く用いられています。

ただし、Tau-benchはオープンソースであり、異なる組織が発表するベンチマークスコアにはしばしば微妙に異なる設定が追加されていることに注意してください。[この記事](https://medium.com/alan/benchmarking-ai-agents-stop-trusting-headline-scores-start-measuring-trade-offs-0fdae3a418cf)が警鐘を鳴らしているように、公開スコアを鵜呑みにするのは危険です。

## **Measuring AI Ability to Complete Long Tasks – 時間軸で測るAIの実力**

- Authors: Thomas Kwa, Ben West, Joel Becker, Amy Deng, Katharyn Garcia, Max Hasin, Sami Jawhar, Megan Kinniment, Nate Rush, Sydney Von Arx, Ryan Bloom, Thomas Broadley, Haoxing Du, Brian Goodrich, Nikola Jurkovic, Luke Harold Miles, Seraphina Nix, Tao Lin, Neev Parikh, David Rein, Lucas Jun Koba Sato, Hjalmar Wijk, Daniel M. Ziegler, Elizabeth Barnes, Lawrence Chan
- Paper: https://arxiv.org/abs/2503.14499
- Blog post: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- Venue: NeurIPS 2025

https://x.com/shion_honda/status/1916101750160842883

非営利の研究組織 **Model Evaluation & Threat Research (METR)** による本論文は、タスクの成功率ではなく「完了にかかる時間」に着目した指標を提案しました。具体的には、ソフトウェア関連の様々なタスク（Wikipediaを使った調査から複雑なコーディングまで）に対し、人間のエキスパートが完了するまでに要する時間 (人間時間) を計測し、AI モデルが同じタスクを 50 % の成功率で完了できるかどうかを比べます。これにより、モデルが自律的に完遂できるタスクの「長さ」を定量化します。これを、**50%タスク完了時間地平** （**50%-task-completion time horizon**）と呼びます。

このベンチマークを分析すると、以下のようなことがわかりました。

- 2025年3月時点での最先端モデル（Claude 3.7 Sonnet）の50 %タスク完了時間は59分でした。ロジスティック曲線を見てみると、人間が4分未満で終えるタスクならほぼ 100 % 成功しますが、4 時間以上かかるタスクでは成功率が 10 % 以下に落ち込みます。これは、モデルが連続した行動の記憶やエラー回復にまだ弱いことを示しています。
- 2019 年以降、50 %タスク完了時間は約 7 ヶ月ごとに倍増しており、予測が継続すれば2028年から2031年の間にで1ヶ月かかるタスクを自律的にこなせるようになります 。ただし、当然ながら外挿には注意が必要で、アルゴリズムのブレークスルーや環境変化が起こるとトレンドが崩れる可能性を指摘します。
- 伸びを支えているのは単なる推論力ではなく、**エラーからの回復やツール利用能力**であると報告されています 。これは RL やエージェントアプローチによる改善が重要であることを示唆しています。

本論文が示す「AI版Mooreの法則」は6年の範囲で成立していますが、2025年末時点では限界も見え始めています。[^5]
1. 現時点での最新モデルであるGPT-5.1-Codex-Maxは2時間53分、Claude Opus 4.5 は4時間49分という50 %タスク完了時間を達成しましたが、人間が 1-4 時間かける課題は現在14問しかなく、推定値にノイズが乗りやすい
2. タスクのテーマが公開されているため、ある程度対策することが可能である（benchmaxxing）。
3. タスクの大半が **サイバーセキュリティや機械学習の競技タスク**であるため、指標が普遍的な自律能力を示すとは限らない
## Why Language Models Hallucinate

- Authors: Adam Tauman Kalai, Ofir Nachum, Santosh S. Vempala, Edwin Zhang
- Paper: https://arxiv.org/abs/2509.04664
- Blog post: https://openai.com/index/why-language-models-hallucinate/

https://x.com/shion_honda/status/1965302226165133671

OpenAI と Georgia Tech による本論文は、「LLM がなぜ事実と異なる内容を自信満々に生成するのか」というLLM登場以来の疑問に統計的な答えを与えます。直感的に説明すると、その理由は現在の評価指標が不正解よりも当てずっぽうを良しとするため、モデルが分からないときに「知らない」と言うよりも推測を選びがちである、というものです。

例えば、モデルの事前学習中に誰かの誕生日を尋ねるとします。正解の確率は 1/365 でも「分からない」と答えると確実に不正解となるため、当てずっぽうでも推測する方が評価上有利になります 。言語モデルは文章の流暢さや文法などパターンに基づく内容は得意ですが、低頻度の固有名詞や日付などは正しい分布を学習できず、現実世界の知識ベースが無いを与えない限り幻覚（hallucination）は避けられません。

さらに、モデルが自らの無知を自覚し不確実な時に答えない能力（abstain）を獲得するためには、正答率だけでなく正直さを評価することが必要だと提起しています。

OpenAI は、2025 年8月に公開した **GPT‑5** で幻覚の大幅な削減を[報告し](https://openai.com/index/introducing-gpt-5/)、その後もGPT-5.1、5.2と着実に幻覚を削減し続けています。本論文は幻覚を減らす手法の具体については言及していない、かつGPT-5との因果関係は不明なものの、OpenAI内部で何かしらの改善があったことが推察できます。2026年には言語モデルの幻覚は大きな問題ではなくなっていくのかもしれません。
## おわりに

以上のように、2025年を特徴づけたのは、RLVRの成功とLLMのエージェント化、そしてその能力を評価するための新たなベンチマークだったように感じます。2026年にはどのような発展を見ることができるでしょうか。楽しみでなりませんね。読者の皆様も、良いお年を。

[^1]: Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, Y.K. Li, Y. Wu, Daya Guo. [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300). 2024.
[^2]: Nathan Lambert, Jacob Morrison, Valentina Pyatkin, Shengyi Huang, Hamish Ivison, Faeze Brahman, Lester James V. Miranda, Alisa Liu, Nouha Dziri, Shane Lyu, Yuling Gu, Saumya Malik, Victoria Graf, Jena D. Hwang, Jiangjiang Yang, Ronan Le Bras, Oyvind Tafjord, Chris Wilhelm, Luca Soldaini, Noah A. Smith, Yizhong Wang, Pradeep Dasigi, Hannaneh Hajishirzi. [Tulu 3: Pushing Frontiers in Open Language Model Post-Training](https://arxiv.org/abs/2411.15124). COLM. 2025.
[^3]: 出力を容易に検証できるタスクではpass@kが、間違いのコストが高いタスクではpass\^kが適切です。詳しくは[以前のブログ記事](https://hippocampus-garden.com/pass_k/)をご参照ください。
[^4]: Victor Barres, Honghua Dong, Soham Ray, Xujie Si, Karthik Narasimhan. [τ2-Bench: Evaluating Conversational Agents in a Dual-Control Environment](https://arxiv.org/abs/2506.07982). 2025.
[^5]: Shashwat Goel. [How to game the METR plot](https://shash42.substack.com/p/how-to-game-the-metr-plot). 2025.
