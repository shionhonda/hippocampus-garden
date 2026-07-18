---
name: blog-writing-style-en
description: Write or revise English posts in Shion Honda's voice for this repository. Use for English prose in `astro/src/content/posts/*/index.md`, including technical explainers, research summaries, book reviews, project retrospectives, and personal essays; also use when translating a draft into natural English while preserving the author's argument and degree of certainty.
---

# Write English Blog Prose

Preserve the author's ideas and specificity while making the prose easier to follow.

## Calibrate Before Writing

1. Read the target draft completely.
2. Inspect 2–4 posts in `astro/src/content/posts/` that match its language and genre. Prefer recent dates, but include an older post when it is a closer structural match.
3. Treat the repository as the source of truth for unpublished and migrated content. Use the live site only when the user asks to match the currently published presentation.
4. Infer patterns from the samples instead of copying distinctive sentences.

Useful genre matches include:

- Technical explainer: `tool_calling_mcp_skills`, `llm_temperature`, `llm_serialization`
- Research roundup: `ai_papers_2025`, `deep_learning_2024`
- Book review: `book_review_petrov`, `book_review_huyen`
- Project retrospective: `gatsby_to_astro_redesign`

## Match the Voice

- Use a calm, analytical teaching voice.
- Lead with a concrete question, observation, experience, or reason for writing.
- Define specialized terms before building on them; spell out acronyms on first use when the audience may need it.
- Progress from context to mechanism, evidence or examples, limitations, and implications.
- Make opinions explicit and reasoned. Preserve caveats and separate evidence from inference.
- Prefer precise nouns and verbs over hype, generic praise, or abstract claims.
- Use first person when the author's experience genuinely supports the point.
- Keep paragraphs substantial when developing one argument, but split when the claim or function changes.
- Use lists, tables, equations, code, or diagrams only when they make a comparison or mechanism clearer.

## Revise Without Flattening

- Preserve technical detail, personal observations, humor, and deliberate informality.
- Tighten repetition and vague references.
- Add signposts only where the logical transition is otherwise unclear.
- Replace AI-slop phrasing with concrete claims, examples, or causal explanations. Avoid empty openings, generic transitions, overly symmetrical structure, inflated conclusions, repeated thesis restatements, and polished sentences that add no information.
- Do not add decorative or extended metaphors merely to make the prose vivid. Use an analogy only when it clarifies a difficult mechanism, keep it brief, and do not stack metaphors or expand one beyond the author's intent.
- Do not add facts, citations, experiments, or certainty that the source does not support.
- Do not force a `TL;DR`, conclusion, or rigid essay template when the draft does not need one.
- Keep Markdown, footnotes, links, inline HTML, code, and math intact unless the user asks to restructure them.

## Check the Result

- Confirm the opening states why the topic matters without clickbait.
- Confirm each section advances the argument.
- Confirm examples support the nearby claim.
- Confirm uncertainty and attribution survive the edit.
- Read the prose aloud mentally for awkward cadence, repeated transitions, and unnaturally polished language.
