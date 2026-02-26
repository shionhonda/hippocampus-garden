---
name: gatsby-blog-post-authoring
description: Create, edit, and refine posts for this Gatsby Markdown blog. Use when working on `content/blog/*/index.md` posts, adding new post folders, updating frontmatter (`title`, `date`, `description`, `featuredImage`, `tags`), or polishing long-form technical/personal writing while preserving the repository's publishing conventions.
---

# Gatsby Blog Post Authoring

Write and edit posts in this repository without breaking Gatsby content conventions.

## Repo Conventions

- Create one folder per post under `content/blog/<slug>/`.
- Put the article body in `content/blog/<slug>/index.md`.
- Keep post assets (images, GIFs, diagrams) in the same folder.
- Use frontmatter fields in this order when possible:

```md
---
title: "Post title"
date: "2026-02-26T12:00:00.000Z"
description: "1-2 sentence summary for lists and SEO."
featuredImage: <slug>/ogp.jpg
tags: ["en", "topic-tag", "another-tag"]
---
```

- Include a language tag (`"en"` or `"ja"`) in `tags`.
- Point `featuredImage` to a path relative to `content/blog` (for example `llm_temperature/ogp.png`), not a local `./` path.

## Authoring Workflow

1. Inspect 2-3 recent posts with similar topic/language to match tone and structure.
2. Create the new post folder and draft `index.md` with complete frontmatter first.
3. Build an outline before writing long sections (especially technical posts).
4. Add images with meaningful alt text and short captions when context helps.
5. Keep headings shallow and readable (`##`, `###`); avoid skipping levels.
6. Preserve existing voice; edit for clarity and flow before stylistic rewrites.

## Editing Rules

- Prefer surgical edits when the user asks for a revision.
- Do not rename the post folder unless the user explicitly wants slug changes.
- Do not silently change tags taxonomy; reuse existing tags where possible.
- Keep code/math formatting compatible with current remark plugins (Prism, KaTeX, footnotes).
- Preserve bilingual content and punctuation style used by the author.

## Quality Checks

- Confirm all referenced local images exist in the post folder.
- Confirm `featuredImage` file exists and matches extension case exactly.
- Confirm `date` is a valid ISO timestamp string.
- Confirm `description` is present and specific (not just a copy of the title).
- Scan for broken markdown links and malformed footnotes.

## Handoff

When finishing a content change, report:

- Post path changed
- Whether frontmatter changed
- Any new asset files added
- Whether local preview/build verification was run
