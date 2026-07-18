---
name: astro-blog-ui-review
description: Review or improve this Astro blog's UI, UX, accessibility, and visual consistency. Use for changes in `astro/src/components`, `layouts`, `pages`, `styles`, or UI-facing data and libraries, and for audits of reading comfort, navigation, responsiveness, SEO presentation, or the site's coral-reef design system.
---

# Review the Astro Blog UI

Apply repository-specific design constraints and verify the rendered experience.

## Read the Local Design Contract

Before substantial UI work, read the relevant sections of:

- `docs/astro-redesign-design-brief.md`
- `docs/astro-redesign-design-tokens.md`
- `docs/astro-redesign-architecture.md`
- `astro/src/styles/tokens.css`

Use the implementation as the source of truth when an older design note conflicts with current code. Preserve the core direction: quiet and intellectual, reading-first, generous spacing, restrained coral accents, minimal motion, and supporting—not dominant—discovery modules.

## Review or Implement

1. Trace the changed route through its page, layout, components, libraries, and styles.
2. Inspect semantics, keyboard behavior, data conditions, long content, and empty states in code.
3. Render the affected page before making visual claims.
4. Check representative desktop and mobile widths, plus Japanese and English content where typography or wrapping matters.
5. Test the affected interaction with keyboard input and visible focus.
6. Run proportionate static checks and a production build.

## Check Blog-Specific Risks

- Reading: line length, type scale, heading rhythm, code and table overflow, KaTeX, footnotes, captions, and long unbroken strings.
- Navigation: header, language filters, pagination, topics, table of contents, related posts, and 404 behavior.
- Content variability: long Japanese titles, mixed scripts, missing optional images, sparse tags, and posts with raw embeds.
- Accessibility: landmarks, heading order, accessible names, alt text, contrast, focus visibility, skip navigation, and reduced-motion preferences.
- Metadata: canonical URL, title and description, Open Graph image, RSS, sitemap, and language metadata.
- Performance: avoid unnecessary client JavaScript, layout shifts, heavy media, and repeated work during static generation.

## Report or Handoff

- For a review, lead with actionable findings ordered by impact and cite tight file/line locations. State what was not rendered or tested.
- For an implementation, summarize the visible outcome, files changed, checks run, and manual QA. Include screenshots only when they materially help verify the change.
