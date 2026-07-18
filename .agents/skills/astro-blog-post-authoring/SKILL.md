---
name: astro-blog-post-authoring
description: Create, edit, or structurally revise Markdown posts for this Astro blog. Use for `astro/src/content/posts/*/index.md`, new post folders, frontmatter, tags, slugs, links, footnotes, code, math, embeds, drafts, and publication-ready content checks; pair with the language-specific writing-style skill when prose voice matters.
---

# Author Astro Blog Posts

Edit posts without breaking the content collection, URLs, or Markdown rendering.

## Inspect Before Editing

1. Read `astro/src/content.config.ts` for the current schema.
2. Read 2–3 recent posts with the same language and genre.
3. Inspect the target folder's assets and existing links.
4. Reuse the repository's tag vocabulary by searching existing frontmatter.

## Create a Post

- Create `astro/src/content/posts/<slug>/index.md` and keep post-specific assets in that folder.
- Use a stable lowercase slug consistent with existing underscore-based slugs unless the user specifies one.
- For new posts, use this minimal frontmatter shape and add optional fields only when needed:

```md
---
title: "Post title"
date: "2026-07-18T12:00:00.000Z"
description: "A specific summary for listings and search results."
tags: ["topic"]
slug: "post_slug"
lang: "en"
draft: true
---
```

- Use `lang: "en"` or `lang: "ja"`; do not encode language as a tag in new content.
- Start new work as `draft: true` unless the user explicitly asks to publish or supplies a publication date and final content.
- Use `<slug>/<filename>` for `featuredImage` when adding a post image.
- Treat `astro/src/content.config.ts` as authoritative if this example and the schema diverge.

## Edit Safely

- Preserve the slug and folder name unless the user explicitly requests a URL change.
- Make surgical changes when the request is narrow.
- Do not silently rewrite tags, dates, links, affiliate parameters, citations, inline HTML, or embedded third-party content.
- Keep headings sequential and generally within `##` and `###`.
- Preserve syntax supported by `astro/astro.config.mjs`: GFM, math, footnotes, code metadata, and inline HTML.
- Prefer relative paths for local media and stable canonical URLs for published internal links.
- Use the matching English or Japanese writing-style skill for substantial prose drafting or polishing.

## Validate the Post

- Confirm required frontmatter is present and schema-valid.
- Confirm `date` and `updated` values are intentional ISO timestamps.
- Confirm the description is specific and not merely the title repeated.
- Confirm every local asset exists and every footnote has a matching definition.
- Check Markdown links, heading hierarchy, code fences, math delimiters, and raw HTML balance.
- Run `npm run check` for structural changes and `npm run build` before publication when feasible.

## Report

State the post path, frontmatter changes, assets added or removed, checks run, and anything intentionally left as a draft or placeholder.
