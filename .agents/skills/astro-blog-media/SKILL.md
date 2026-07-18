---
name: astro-blog-media
description: Add, edit, or verify images and other post media for this Astro blog. Use for screenshots, diagrams, photos, animated media, featured or social images, Markdown image references, alt text, and visual QA in `astro/src/content/posts/*`.
---

# Manage Astro Blog Media

Keep post media local, legible, accessible, and compatible with the repository's Astro image pipeline.

## Follow Repository Conventions

- Store post-specific media beside `index.md` in `astro/src/content/posts/<slug>/`.
- Use relative Markdown references such as `![Description](figure.png)` or `![Description](./figure.png)`.
- For list cards and social metadata, set `featuredImage` to `<slug>/<filename>` unless preserving an existing valid convention.
- Treat `astro/src/lib/post-images.ts` and `astro/src/content.config.ts` as the source of truth for supported frontmatter and image lookup.
- Preserve published filenames unless the user requests a migration; renaming can break old URLs, Markdown, or social caches.

## Choose and Prepare Media

1. Inventory Markdown and frontmatter references before editing files.
2. Reuse an existing asset when it already communicates the point.
3. Capture, generate, or edit only the media needed for the post.
4. Prefer PNG for UI screenshots, diagrams, and text-heavy graphics; JPEG or WebP for photographic imagery; GIF only when motion is essential.
5. Crop empty space, ensure labels remain readable at mobile article width, and avoid oversized source files without a quality benefit.
6. Keep originals only when they are useful for future edits or the user requests them.

## Verify

- Confirm every local reference exists with matching case.
- Confirm the featured image resolves through the current Astro build.
- Write alt text for the image's purpose and information, not its filename; use empty alt only for truly decorative media.
- Keep captions separate from alt text when both are useful.
- Preview the post at desktop and mobile widths when legibility or layout could change.
- Check the browser console and built output for missing assets.
