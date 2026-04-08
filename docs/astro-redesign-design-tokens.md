# Hippocampus's Garden Astro Redesign Design Tokens

## 目的

このドキュメントは、Astro リビルドで使うデザイントークン仕様を定義する。

目的は以下。

1. 色、余白、タイポグラフィ、境界、幅の判断を一貫させる
2. Home / Post / About / Topics の見た目を同じ設計言語で統一する
3. 「静かで知的」「珊瑚礁」のブランド方針を UI の部品レベルまで落とし込む

参照元:

- [astro-redesign-design-brief.md](/Users/shionhonda/Projects/hippocampus-garden/docs/astro-redesign-design-brief.md)
- [astro-redesign-wireframes.md](/Users/shionhonda/Projects/hippocampus-garden/docs/astro-redesign-wireframes.md)

## トークン設計原則

- 本文可読性をブランド表現より優先する
- 色で主張しすぎず、余白と階層で品位を出す
- 日本語と英語の混在を前提にする
- 大きな演出ではなく、小さな精度で印象を作る
- アニメーション前提の設計はしない

## Color

### Brand

- `--color-reef-deep: #062b38;`
- `--color-reef-surface: #0e3f52;`
- `--color-reef-teal: #1e8c8a;`
- `--color-reef-aqua: #9edfd6;`
- `--color-reef-coral: #ff7a6b;`
- `--color-reef-sand: #f3e7d3;`

### Neutral

- `--color-ink-strong: #102129;`
- `--color-ink: #1e2f36;`
- `--color-ink-soft: #41545b;`
- `--color-muted: #5f737b;`
- `--color-line-strong: #c5d2d7;`
- `--color-line: #d7e1e4;`
- `--color-line-soft: #e7eef0;`
- `--color-paper: #ffffff;`
- `--color-panel: #f7fafa;`
- `--color-canvas: #f3f8f8;`

### Functional

- `--color-link: var(--color-reef-surface);`
- `--color-link-hover: var(--color-reef-coral);`
- `--color-accent: var(--color-reef-coral);`
- `--color-success: #2f7d67;`
- `--color-warning: #9a6a23;`
- `--color-code-bg: #0f2230;`
- `--color-code-text: #eaf4f6;`

### 使用ルール

- 本文テキストは `ink` 系を使う
- 背景は `paper` と `canvas` の差で静かに区切る
- 強いブランド色はポイント用途に限定する
- `reef-coral` は hover、active、注目ラベル用に絞る
- 境界線は影より優先する

## Typography

### Font family 方針

実際の採用フォントは実装時に決めるが、役割は次のように分ける。

- `--font-body-ja`
- `--font-body-en`
- `--font-ui`
- `--font-code`

### Font role

- Body copy: 読書に強い本文書体
- UI text: ニュートラルで視認性の高い sans-serif
- Code: 幅と記号視認性の安定した monospace

### Type scale

- `--text-xs: 0.75rem;`
- `--text-sm: 0.875rem;`
- `--text-md: 1rem;`
- `--text-lg: 1.125rem;`
- `--text-xl: 1.25rem;`
- `--text-2xl: 1.5rem;`
- `--text-3xl: 1.875rem;`
- `--text-4xl: 2.25rem;`

### Line height

- `--leading-tight: 1.2;`
- `--leading-snug: 1.35;`
- `--leading-normal: 1.6;`
- `--leading-relaxed: 1.75;`

### Letter spacing

- `--tracking-tight: -0.02em;`
- `--tracking-normal: 0;`
- `--tracking-wide: 0.04em;`

### Font weight

- `--weight-regular: 400;`
- `--weight-medium: 500;`
- `--weight-semibold: 600;`
- `--weight-bold: 700;`

### Type role mapping

- Site title: `text-2xl` to `text-3xl`, `weight-semibold`, `tracking-tight`
- Section heading: `text-xl` to `text-2xl`, `weight-semibold`
- Post title: `text-3xl` to `text-4xl`, `weight-semibold`
- Body: `text-md` to `text-lg`, `leading-relaxed`
- Meta text: `text-sm`, `font-ui`, `color-muted`
- Tag label: `text-xs` or `text-sm`, `font-ui`

## Spacing

8px ベースで統一する。

- `--space-1: 0.25rem;`
- `--space-2: 0.5rem;`
- `--space-3: 0.75rem;`
- `--space-4: 1rem;`
- `--space-5: 1.25rem;`
- `--space-6: 1.5rem;`
- `--space-8: 2rem;`
- `--space-10: 2.5rem;`
- `--space-12: 3rem;`
- `--space-16: 4rem;`
- `--space-20: 5rem;`

使用ルール:

- セクション間は `space-12` 以上
- カード内部は `space-4` か `space-5`
- 本文の段落間は `space-5` 基準
- タイトルとメタの間は `space-3`

## Radius

- `--radius-sm: 0.375rem;`
- `--radius-md: 0.75rem;`
- `--radius-lg: 1rem;`
- `--radius-xl: 1.5rem;`
- `--radius-pill: 999px;`

使用ルール:

- 基本は `radius-md`
- panel や card は `radius-lg` まで
- badge / topic pill は `radius-pill`
- 過度に丸くしない

## Border

- `--border-thin: 1px solid var(--color-line);`
- `--border-soft: 1px solid var(--color-line-soft);`
- `--border-strong: 1px solid var(--color-line-strong);`

使用ルール:

- セクション境界、カード境界、TOC、code header に使用
- 強いシャドウより境界線を優先する

## Shadow

- `--shadow-none: none;`
- `--shadow-soft: 0 10px 30px rgba(6, 43, 56, 0.06);`
- `--shadow-lift: 0 18px 40px rgba(6, 43, 56, 0.1);`

使用ルール:

- 通常は `shadow-none` または `shadow-soft`
- hover で少しだけ lift してよい
- ベタなカード UI に見えるほど影を強くしない

## Layout widths

- `--width-page-max: 80rem;`
- `--width-content-max: 46rem;`
- `--width-reading-max: 42rem;`
- `--width-wide-max: 60rem;`
- `--width-narrow-max: 32rem;`

### 用途

- Home main container: `width-page-max`
- Intro / About prose: `width-content-max`
- Article body: `width-reading-max`
- Wide utility sections: `width-wide-max`

## Grid

### Home post grid

- Desktop: `repeat(2, minmax(0, 1fr))`
- Tablet: `repeat(1 or 2, minmax(0, 1fr))`
- Mobile: `1fr`

### About layout

- Desktop: 2-column where useful
- Tablet and mobile: 1 column

## Component tokens

### Header

- Background: mostly transparent or `canvas`
- Bottom border: `border-soft`
- Title color: `ink-strong`
- Descriptor color: `muted`

### Post card

- Background: `paper`
- Border: `border-soft`
- Radius: `radius-lg`
- Padding: `space-5`
- Hover border: `line-strong`
- Hover shadow: `shadow-soft`

### Topic pill

- Background: transparent or `panel`
- Border: `border-soft`
- Text: `font-ui`, `text-sm`
- Active / hover accent: `reef-coral`

### Author block

- Background: `panel`
- Border: `border-soft`
- Icon size: visually balanced, not dominant
- Name: `text-lg` or `text-xl`
- Bio text: `text-sm` to `text-md`

### TOC

- Background: `panel`
- Border: `border-soft`
- Font: `font-ui`
- Active item color: `reef-surface`

### Code block

- Background: `code-bg`
- Text: `code-text`
- Radius: `radius-lg`
- Padding: `space-4` or `space-5`

## Topics naming

UI 上の表示名は原則 `Topics` を使う。

使い分け:

- URL や内部データ構造では `tags` を維持してよい
- ユーザー向け表示では `Topics` を優先する

## Responsive behavior

### Mobile

- 余白は保つが詰めすぎない
- タイトルの行数増加を許容する
- メタ情報は折り返してよい
- TOC は展開式

### Tablet

- Home の card は 1 から 2 列
- About の複数ブロックは自然に縦積み

### Desktop

- ワイドモニタでも本文幅を一定以上広げない
- 情報密度を上げすぎない

## Motion

初期リリースでは motion token は定義だけにとどめ、実装は行わない。

- `--duration-fast: 120ms;`
- `--duration-normal: 180ms;`
- `--ease-standard: ease;`

使う場合の制約:

- hover や focus のみに限定する
- `transform` と `opacity` のみ
- ページロード演出は入れない

## 実装メモ

Astro 実装時は、まず CSS variables として global token を定義する。

推奨順:

1. color
2. typography
3. spacing
4. width
5. border / radius / shadow
6. component-level token mapping

## 未決事項

実装前に確定すべきこと:

1. 日本語本文フォント
2. 英語本文フォント
3. UI フォント
4. code font
5. SNS アイコンの最終セット
6. Topics の切り出しルール
