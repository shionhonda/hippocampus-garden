---
name: gatsby-blog-preview-publish
description: Preview, smoke test, build, and publish this Gatsby blog. Use when validating changes locally (`npm run develop`, `npm run build`, `npm run serve`), checking rendered pages in a browser, or triggering/pushing Netlify deployments or rebuilds for content/UI updates.
---

# Gatsby Blog Preview Publish

Run local preview/build checks and handle Netlify publish/rebuild steps safely for this repository.

## Local Commands

Use the existing npm scripts:

```bash
npm run develop
npm run build
npm run serve
npm test
npm run clean
```

## Environment Caveat (Important)

`gatsby-node.js` loads `.env.development` / `.env.production` and fetches Google Analytics data in `sourceNodes`. Local builds may fail if required env vars (for example `CLIENT_EMAIL`, `PRIVATE_KEY`) are missing or malformed.

Before debugging Gatsby itself, check env loading first.

## Preview and Smoke Test Workflow

1. Start `npm run develop`.
2. Open the changed page(s) and confirm render.
3. Check homepage, target post page, and any affected tag page.
4. Verify images, embeds, code blocks, and footnotes render correctly.
5. If UI changed, check mobile layout with browser tools.
6. Run `npm run build` for production-style validation when the change is non-trivial.
7. Run `npm run serve` and re-check critical pages after a successful build.

## Browser Verification

- Prefer browser automation/Playwright tools for repeatable smoke tests.
- Capture screenshots only when visual diffs matter or when reporting regressions.
- Check console/network logs for 404s (missing images, broken assets).

## Publish / Rebuild Workflow

Use the least invasive method first:

1. Push commits (if the site is already connected to Netlify via Git).
2. Trigger a manual Netlify rebuild only when requested or when content needs a rebuild without code changes.
3. Use Netlify CLI (`npx netlify ...`) only when interactive deployment/linking is needed.

## Netlify Notes for This Repo

- A GitHub Actions workflow (`.github/workflows/main.yml`) triggers a Netlify build hook on a schedule.
- Treat the build hook URL as sensitive. Do not echo or paste the full URL in responses/logs.
- If using Netlify CLI, follow the standard auth/status/link/deploy flow (`npx netlify status`, `deploy`, `deploy --prod`) and request escalated permissions when sandbox networking blocks outbound calls.

## Release Report Checklist

Report:

- Commands run
- Pages checked
- Build/serve status
- Any env-related blockers
- Deployment/rebuild action taken (and whether it was preview or production)
