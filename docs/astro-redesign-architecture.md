# Hippocampus's Garden Astro Routing and Content Model

## 目的

このドキュメントは、Astro リビルドで採用するルーティングとコンテンツモデルを定義する。

目的は以下。

1. デザイン方針とワイヤーフレームを、そのまま実装可能な情報構造に落とす
2. URL、コンテンツ collection、frontmatter、Topics 集計ルールを固定する
3. 将来の拡張を妨げない範囲で、初期スコープをシンプルに保つ

参照元:

- [astro-redesign-design-brief.md](/Users/shionhonda/Projects/hippocampus-garden/docs/astro-redesign-design-brief.md)
- [astro-redesign-wireframes.md](/Users/shionhonda/Projects/hippocampus-garden/docs/astro-redesign-wireframes.md)
- [astro-redesign-design-tokens.md](/Users/shionhonda/Projects/hippocampus-garden/docs/astro-redesign-design-tokens.md)

## 基本方針

- 既存 URL との互換性は優先しない
- 内部データ構造では `tags` を維持し、UI 表示名では `Topics` を使う
- コンテンツは静的生成を前提にする
- 記事は Markdown or MDX ベースとする
- 初期リリースでは複雑な CMS は入れない

## URL 設計

### 採用する URL

- Home: `/`
- Home pagination: `/page/<n>/`
- About: `/about/`
- 各記事: `/<slug>/`
- Topic archive: `/topics/<topic-slug>/`
- Topics index: `/topics/`
- Privacy policy: `/privacy-policy/`
- RSS: `/rss.xml`
- 404: `/404/` または Astro の標準 404

## コンテンツ collections

想定する Astro collections:

1. `posts`
2. `pages`

### 1. posts

用途:

- ブログ記事本体

保存元:

- `src/content/posts/*/index.md`

補足:

- 基本は Markdown を使う
- Markdown で表現しづらい記事だけ MDX を許可する

### 2. pages

用途:

- About
- Privacy policy
- 必要なら将来の固定ページ

## posts schema

### 必須フィールド

- `title`
- `date`
- `description`
- `tags`
- `lang`
- `slug`

### 任意フィールド

- `updated`
- `draft`
- `thumbnail`
- `thumbnailAlt`
- `hero`
- `heroAlt`
- `series`
- `canonicalUrl`
- `ogImage`
- `featured`

### 推奨 schema イメージ

```ts
{
  title: string
  date: Date
  updated?: Date
  description: string
  tags: string[]
  lang: "en" | "ja"
  slug: string
  draft?: boolean
  thumbnail?: string
  thumbnailAlt?: string
  hero?: string
  heroAlt?: string
  series?: string
  canonicalUrl?: string
  ogImage?: string
  featured?: boolean
}
```

## pages schema

初期リリースで必要な固定ページ:

- `about`
- `privacy-policy`

### pages schema イメージ

```ts
{
  title: string
  description?: string
  slug: string
}
```

## Topics の扱い

### 用語

- 内部データ名: `tags`
- UI 表示名: `Topics`

この分離は維持する。

理由:

- 既存データとの互換性が高い
- 実装上は `tags` が自然
- UI では `Topics` の方が直感的

### Topic slug

Topic archive 用 slug は正規化して生成する。

正規化ルール:

- lower-case
- space は `-`
- 特殊文字は除去 or 置換
- 日本語タグは原則そのまま使わず、既存 slug 戦略が必要なら明示的 mapping を持つ

### Topic label

表示用ラベルは元の `tags` 値を保持する。

例:

- internal: `machine-learning`
- label: `machine learning`

ただし既存データを見て、label と slug を同一扱いで十分なら単純化してよい。

## Home 用 Topics 集計ルール

Home の `Topics` セクションでは、全期間の全タグを見せない。

基本ルール:

- 直近 1 年の記事を対象に集計する
- その中から主要 Topics を抽出する
- 表示数は 6 から 12 程度に制限する

優先順位:

1. 直近 1 年内で出現回数が多い
2. 雑多な一回限りタグは落とす

追加ルール:

- `en`, `ja` のような言語タグは Topics 表示から除外してよい
- 運用上ノイズになるタグも除外候補にする

## Topic Index 用集計ルール

`/topics/` では、全 Topic を見せてよい。

表示方針:

- alphabetic or grouped
- count は補助情報
- 直近 1 年の主要 Topics は先頭セクションで分けてもよい

候補構成:

1. Recent major topics
2. All topics

## Language の扱い

### posts

`lang` は必須にする。

値:

- `en`
- `ja`

### 表示

- Post card に小さく表示する
- 記事ページのメタにも表示可能
- Home のフィルタには初期リリースで必須ではない

### 将来の拡張

将来的に日本語 / 英語の一覧切り替えを作る余地は残す。

## About のデータソース

About は記事 collection から一部を自動参照しつつ、著者情報は固定データとして別管理するとよい。

候補:

- `src/data/site.ts`
- `src/data/profile.ts`

格納するもの:

- site title
- tagline
- author name
- role
- location
- bio
- social links
- selected writing slugs

これにより、コンテンツ本文とプロフィール情報を分離できる。

## Recommended file structure

初期案:

```text
src/
  components/
  content/
    posts/
      my-post/
        index.mdx
    pages/
      about.mdx
      privacy-policy.mdx
  data/
    profile.ts
    site.ts
  layouts/
    BaseLayout.astro
    HomeLayout.astro
    PostLayout.astro
    PageLayout.astro
  lib/
    topics.ts
    posts.ts
    dates.ts
  pages/
    index.astro
    about.astro
    privacy-policy.astro
    topics/
      index.astro
      [topic].astro
```

## ページ別データ依存

### `/`

必要データ:

- latest posts
- paginated posts
- recent major topics
- trending / most read
- author summary

### `/<slug>/`

必要データ:

- single post
- related posts
- author summary
- computed TOC

### `/about/`

必要データ:

- profile data
- selected writing
- books / external writing

### `/topics/`

必要データ:

- all topics
- recent major topics

### `/topics/<topic>/`

必要データ:

- topic metadata
- posts in topic

## Related posts のルール

初期リリースでは、関連度計算はシンプルでよい。

優先順:

1. tags overlap
2. same language
3. recency

表示数:

- 3 件

除外条件:

- 自記事
- draft

## Trending / Most Read のルール

初期リリースで採用する。

方針:

- Home の補助セクションとしてのみ使う
- 記事ページには出さない
- 既存のロジックを流用する
- 露出は静かに保ち、Recent posts より視覚的に弱くする

## SEO / feed

### SEO

必要なもの:

- title
- description
- canonical
- og image
- article schema

### RSS

- `/rss.xml` を維持する

## 移行方針

### Phase 1

- Astro 基盤作成
- design tokens 実装
- Home / Post / About / Topics 実装
- Home pagination 実装
- 既存記事を `src/content/posts` に移行
- 既存 Trending / Most Read ロジックの移植

### Phase 2

- RSS
- 細部の polish
- 必要なら MDX が必要な記事のみ個別対応

### Phase 3

- 必要なら検索
- 必要なら言語別ビュー

## 確定事項

1. 既存記事は `src/content/posts` に移す
2. 基本は Markdown を使い、必要な場合のみ MDX を採用する
3. Topics slug の正規化ルールは実装側で単純に決める
4. `en` / `ja` タグは metadata に残す
5. Trending / Most read は初期リリースで入れる
