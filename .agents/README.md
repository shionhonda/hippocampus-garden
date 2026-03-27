# Hippocampus Garden Agent Guide

This directory is the repo-local source of truth for Codex-specific guidance.

## Layout

- Load repo-local skills from `.agents/skills/<skill-name>/SKILL.md`.
- Keep per-skill UI metadata in `.agents/skills/<skill-name>/agents/openai.yaml`.
- Keep shared guidance in this file rather than in the repo root.

## Available Skills

- `gatsby-blog-post-authoring`
  - Content drafting and editing for `content/blog/*/index.md` with this repo's frontmatter and tag conventions.
- `gatsby-blog-image-workflow`
  - Screenshot, image prep, and asset verification for post-local images and OGP assets.
- `gatsby-blog-ui-review`
  - UI review and frontend QA for Gatsby templates and components in this repo.
- `gatsby-blog-preview-publish`
  - Local preview, smoke-test, and publishing workflow guidance for this Gatsby + Netlify setup.
- `blog-writing-style-en`
  - English writing style guidance based on recent posts.
- `blog-writing-style-ja`
  - Japanese writing style guidance based on recent posts.
- `twitter-post-optimizer`
  - X/Twitter post drafting and optimization for blog promotion in EN and JA.

## Working Rules

- Prefer loading only the one or two skills needed for the current task.
- Preserve repository conventions instead of introducing new content or asset patterns.
- Update the relevant skill when a reusable workflow changes.

## Notes

- These skills were adapted for this repository from broader open-source skill patterns.
- The previous repo-local `skills/` directory was migrated to `.agents/skills/` so Codex desktop can discover the skills as repo-local skills.
