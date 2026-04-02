# Hippocampus's Garden Astro Redesign Wireframes

## 目的

このドキュメントは、Astro リビルドに向けた画面ワイヤーフレーム仕様である。

デザイン方針書の抽象的な方向性を、実装可能なページ構成に落とすことを目的とする。

参照元:

- [astro-redesign-design-brief.md](/Users/shionhonda/Projects/hippocampus-garden/docs/astro-redesign-design-brief.md)


## 共通原則

- 画面幅が広くても、本文や主要情報は必要以上に広げない
- 右カラム常設の旧ブログ構成には戻さない
- セクションは「背景色の切り替え」よりも「余白」と「見出し」で区切る
- モバイルで自然に縦積みされることを前提にする
- アニメーションは前提にしない


## サイト全体のサイトマップ

初期リリースの対象ページ:

1. Home
2. Post detail
3. About
4. Tag index
5. Tag archive
6. 404

将来追加してもよいページ:

- Search
- Archive by year
- Uses / Setup
- Reading log landing page


## 共通レイアウト

### Global Header

構成:

1. Site title
2. Short descriptor
3. Primary nav

Primary nav の候補:

- Home
- About
- Topics

要件:

- 高さはコンパクトに保つ
- 大きなヒーローバナーにしない
- sticky にする場合も圧を出さない
- モバイルでも 2 行以内で収める

### Global Footer

構成:

1. Copyright
2. Minimal nav
3. RSS

要件:

- 「Built with ...」は載せない
- 情報量は少なくてよい
- 装飾性より整い方を優先する


## 1. Home

### ページの役割

- 最新の記事へ最短距離で入る
- このブログが何を扱う場所かを短時間で理解する
- 更新頻度の低さを弱点として見せない

### セクション構成

1. Intro
2. Recent posts
3. Topics
4. Optional trending / most read
5. Author block

### 1. Intro

内容:

- サイト名
- 1 行の説明
- 2 行程度の補足

文量の目安:

- 説明文は 2 段落以内
- 自己紹介はここでは短く抑える

レイアウト:

- 横長のヒーローではなく、本文開始前の静かな導入ブロック
- 左寄せ基調
- ブランド背景を強く塗らない

入れてよい要素:

- 「Machine Learning, Software, Books, Notes」のような短い領域提示

入れない要素:

- 大きな CTA
- Featured post
- カルーセル

### 2. Recent posts

内容:

- 新しい順の記事一覧

各カードの要素:

1. Title
2. Description
3. Date
4. Reading time
5. Language
6. Optional tags
7. Optional thumbnail

優先順位:

- タイトルと説明が主役
- サムネイルは補助

レイアウト候補:

- Desktop: 2-column grid
- Tablet: 1 or 2 columns
- Mobile: 1 column stack

実装ルール:

- 日本語タイトルでも英語タイトルでも高さの破綻が起きない
- 長いタイトルは 3 行程度まで許容し、説明文は 2 行程度に制御する
- サムネイルなし記事でも成立する

### 3. Topics

内容:

- 主要トピック一覧
- 必要に応じて tag index への導線

見せ方:

- 全タグを生データ的に密集表示しない
- 数が多すぎる場合は直近 1 年の主要タグのみ見せる
- 主要トピックを先頭に出し、残りは Topics index に逃がす構成でもよい
- count は控えめに表示する

目的:

- 発見導線の提供
- サイト全体の話題領域を伝える

### 4. Optional trending / most read

内容:

- Trending または Most read
- どちらか片方、または両方

位置:

- Home の Topics の後
- Author block の前

扱い方:

- 主役ではなく補助導線として置く
- 露出が強くなりすぎないよう、Recent posts より視覚的に弱くする
- 記事数は 3 から 5 件程度に抑える

### 5. Author block

内容:

- 名前
- 一文紹介
- SNS アイコン
- About への導線

役割:

- Home 下部で「誰のブログか」を静かに補強する

方針:

- 顔写真は使わないか、使っても補助的にとどめる
- ここで使う主要な視覚要素は SNS アイコンとする
- SNS アイコンは数を絞り、意味のあるリンクだけを置く
- 冗長な経歴全文は置かない


## 2. Post Detail

### ページの役割

- 記事を最も読みやすい形で届ける
- 記事本文に集中させる
- 読み終わった後に次の行動だけを静かに提案する

### セクション構成

1. Article header
2. Optional TOC
3. Body
4. Related posts
5. Author note

### 1. Article header

内容:

1. Title
2. Description or dek
3. Date
4. Reading time
5. Tags

レイアウト:

- 本文と同じ主カラムに置く
- タイトルの余白は十分に取る
- メタ情報は sans-serif で抑えめに見せる

### 2. Optional TOC

基本方針:

- 見出し数が多い記事のみ表示する
- 短い記事では TOC を出さない

レイアウト候補:

- Desktop: main column 上部のインラインブロック、または右上の軽い sticky
- Mobile: article header 下に折りたたみ可能な目次

避けること:

- 旧サイトのような重い右カラム依存

### 3. Body

要件:

- 本文幅は読みやすい範囲に制限する
- 見出し、引用、箇条書き、脚注、コード、数式の余白ルールを統一する
- 技術記事でも読書感を壊さない

細部方針:

- 見出しアンカーは控えめに出す
- コードブロックは背景コントラストを十分に取る
- 横スクロールが必要な要素は視覚的にわかるようにする
- 画像キャプションがある場合は本文補助情報として整える

### 4. Related posts

内容:

- 関連記事 3 件程度

見せ方:

- 本文末に置く
- 小さめのカードかリスト
- サムネイルは optional

役割:

- 次に読む記事への自然な導線

入れない要素:

- Trending
- Most Read
- 大量のタグ一覧

### 5. Author note

内容:

- 名前
- 一文プロフィール
- About へのリンク

役割:

- 誰が書いているかの信頼補強

不要な要素:

- 毎記事で長い自己紹介


## 3. About

### ページの役割

- 著者の専門性、現在地、関心領域を伝える
- 初見の読者や採用関係者が短時間で把握できるようにする

### セクション構成

1. Intro
2. What I work on
3. Selected writing
4. Career snapshot
5. Books / Talks / External writing
6. Links

### 1. Intro

内容:

- 名前
- Role / location
- 1 paragraph bio
- SNS アイコン

要件:

- 第一印象で現在の人物像が伝わること
- 旧サイトのような単純なアイコン列に頼らないこと
- 顔写真は必須にしない
- 顔写真を使う場合も主役にはしない

### 2. What I work on

内容:

- 主な技術関心
- 今よく扱う領域

見せ方:

- 短い段落か、短文の箇条書き
- buzzword の羅列にしない

### 3. Selected writing

内容:

- 代表記事 3 から 6 本

選定軸:

- 専門性が出る
- 現在の方向性に合う
- 英語と日本語の両方が必要なら混在可

目的:

- About から記事へ送客する

### 4. Career snapshot

内容:

- 現在の所属
- 過去の主要経験
- 学歴や研究テーマ

見せ方:

- 履歴書全文ではなく、短い時系列

### 5. Books / Talks / External writing

内容:

- 共著書
- 翻訳
- 外部寄稿

目的:

- 信頼と厚みを追加する

### 6. Links

優先順位の高いものだけを出す:

1. GitHub
2. LinkedIn
3. X
4. Scholar or selected external profiles

要件:

- アイコンのみではなく、意味のわかるリンクとして扱う
- 外部リンクの数は絞る


## 4. Topics Index

### ページの役割

- 話題全体を俯瞰する
- 記事探索の入口になる

### 構成

1. Intro
2. Topic groups or topic list

表示方針:

- アルファベット順だけでなく、件数やカテゴリで整理してもよい
- 直近 1 年の主要 Topics を先頭に見せてもよい
- count は補助情報にとどめる
- あくまで index であり、主役は記事群である


## 5. Topic Archive

### ページの役割

- あるテーマの関連記事をまとめて読む

### 構成

1. Tag header
2. Post list

Topic header に含めるもの:

- Tag name
- Count
- Optional short explanation

Post list は Home の post card と同じ部品を使う。


## レスポンシブ方針

### Desktop

- 本文と主要情報の最大幅を制御する
- 大画面でも「広すぎる余白」と「細すぎる本文」を作らない

### Tablet

- Home の記事一覧は 2 列または 1 列に自然に落とす
- About の複数カラム要素は縦積みに寄せる

### Mobile

- Header は簡潔に
- TOC は折りたたみ前提
- メタ情報は 2 行以内で収める
- コードブロックと表の横スクロールを許容しつつ、崩れを防ぐ


## 不採用事項

- Featured essay
- 旧来型の常設右カラム
- Trending / Most Read の強い露出
- Prev / next ナビゲーション
- カルーセル
- 自動再生や強いモーション
- 巨大ヒーロー画像


## 次に必要な成果物

このワイヤーの次に作るべきもの:

1. デザイントークン仕様
2. コンポーネント一覧と責務分割
3. Astro のルーティングとコンテンツモデル設計
4. Home / Post / About の visual mock
