---
name: gatsby-blog-ui-review
description: Review and improve this Gatsby blog's UI, UX, and accessibility. Use when changing files in `src/components`, `src/templates`, `src/pages`, or layout/theme styles, and when asked to audit readability, navigation, responsive behavior, SEO/OG metadata presentation, or overall frontend design quality.
---

# Gatsby Blog UI Review

Audit or implement frontend changes with a blog-specific review lens: readability first, then navigation, responsiveness, accessibility, and metadata quality.

## Primary Review Targets

- `src/components/*` (header, navbar, footer, related posts, share widgets)
- `src/templates/*` (post and list rendering)
- `src/pages/*` (standalone pages)
- Styles in `*.scss`
- SEO/OG components such as `src/components/seo.jsx` and `src/components/ogp.js`

## Review Workflow

1. Identify the changed UI surface and the templates/components it flows through.
2. Read code first to spot regressions (semantics, keyboard support, conditional rendering).
3. Run local preview when behavior or layout is uncertain.
4. Check desktop and mobile layouts.
5. Report findings with file/line references and concrete fixes.

## Blog-Specific Checks

- Readability: heading hierarchy, paragraph width, code block overflow, KaTeX spacing, footnote usability.
- Navigation: homepage pagination, tag pages, previous/next links, related posts visibility.
- Sharing/metadata: OGP, Twitter cards, canonical metadata, article title/description rendering.
- Media embeds: YouTube/Spotify iframe responsiveness and overflow.
- Performance risks: large images, repeated queries, heavy client-side behavior in templates/components.

## Accessibility Checks

- Use semantic elements for nav, main, article, footer.
- Verify interactive elements have accessible names and keyboard focus visibility.
- Check color contrast after style tweaks.
- Confirm image alt text paths flow correctly into rendered content.

## Output Style (for Reviews)

- Prioritize bugs and regressions first.
- Include file + line references.
- Call out testing gaps when visual verification was not run.

## Implementation Guidance (when asked to build UI)

- Preserve the existing site language and typography choices unless the user requests a redesign.
- Make targeted changes that fit the current Gatsby templates and content density.
- Avoid generic redesign patterns that disrupt the blog's established look.
