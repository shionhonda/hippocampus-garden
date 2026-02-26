---
name: gatsby-blog-image-workflow
description: Prepare and verify blog images for this Gatsby site. Use when adding or editing screenshots, diagrams, photos, or OGP images in `content/blog/*`, updating `featuredImage`, improving image clarity, or checking image references/rendering in posts.
---

# Gatsby Blog Image Workflow

Manage inline and OGP images so posts render correctly and stay readable.

## Repo Conventions

- Store post-specific images in the same folder as the post markdown: `content/blog/<slug>/`.
- Use relative markdown image paths from `index.md` (for example `![alt](figure.png)`).
- Set frontmatter `featuredImage` to a path relative to `content/blog` (for example `<slug>/ogp.jpg`).
- Keep `ogp.jpg` or `ogp.png` in the post folder for social previews.

## Format Guidance

- Prefer `png` for screenshots, charts, and images with text.
- Prefer `jpg` for photos and image-heavy visuals.
- Use `gif` only when animation is necessary.
- Preserve filenames once referenced in published posts unless the user explicitly wants a migration.

## Workflow

1. Inventory image references in the post before changing files.
2. Capture or generate the new image (browser screenshot, exported chart, diagram, etc.).
3. Improve clarity if needed (crop, sharpen, resize) before committing.
4. Save into the post folder with stable names (`ogp.jpg`, `figure-1.png`, etc.).
5. Update markdown/frontmatter references.
6. Preview the page and verify sizing, legibility, and alt text.

## Quality Checks

- Confirm every referenced image path exists on disk.
- Check large screenshots for readable text on mobile width.
- Keep file sizes reasonable for web delivery (especially OGP and long posts with many screenshots).
- Use descriptive alt text; avoid repeating the caption verbatim.
- Verify social preview image path (`featuredImage`) matches the post folder slug.

## Tooling Notes

- Prefer browser/tool-specific screenshots (Playwright/browser tools) over OS-level screenshots when capturing page UI.
- Use local image editors/CLI tools only when needed; keep originals if the user asks for enhancement passes.
