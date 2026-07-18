---
name: astro-blog-preview-publish
description: Validate, preview, smoke-test, or publish this Astro blog. Use for root npm scripts (`dev`, `check`, `build`, `preview`), browser QA of posts or UI changes, Netlify deployment checks, scheduled rebuilds, and diagnosing build or asset failures.
---

# Preview and Publish the Astro Blog

Validate locally first, then perform only the deployment action the user authorized.

## Use Root Commands

Run the repository's proxy scripts from the root:

```sh
npm run dev
npm run check
npm run build
npm run preview
npm run lint
npm run format:check
```

Inspect `package.json`, `astro/package.json`, `netlify.toml`, and workflow files before assuming commands or deployment behavior.

## Validate Locally

1. Run `npm run check` for content-schema or Astro/TypeScript changes.
2. Run `npm run lint` and `npm run format:check` for source or configuration changes.
3. Run `npm run build` for publication, routing, content, SEO, or non-trivial UI changes.
4. Start `npm run dev` for fast iteration or `npm run preview` after a successful build for production-like QA.
5. Check the affected page plus relevant home, language, topic, pagination, RSS, sitemap, or 404 routes.
6. Inspect desktop and mobile layouts, console errors, broken assets, code, math, footnotes, embeds, canonical metadata, and social images as applicable.

Missing Google Analytics credentials are not automatically a blocker: the current analytics loader falls back to the checked-in legacy data. Diagnose an environment problem only when logs or behavior support it.

## Publish Safely

- Treat a local edit or preview request as non-deploying.
- Push to the Netlify-connected branch only when the user requests publishing or the broader task clearly includes it.
- Use a manual Netlify deploy, production deploy, or build-hook request only with explicit authorization for that action.
- Treat build-hook URLs and deployment credentials as secrets; do not print them in logs or responses.
- Verify the deployed URL and critical pages after production publication.

## Report

List commands and outcomes, pages checked, visual or environment limitations, and the exact deployment action taken. Distinguish local preview, deploy preview, and production.
