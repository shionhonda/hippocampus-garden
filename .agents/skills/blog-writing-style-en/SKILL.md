---
name: blog-writing-style-en
description: Write and polish English blog posts in Shion Honda's style for this repository. Use when drafting or revising English posts in `content/blog/*/index.md`, translating ideas into the author's English voice, or preserving style while improving clarity, structure, and precision.
---

# Blog Writing Style (EN)

Match the author's recent English blog style for technical and reflective posts, then improve clarity without flattening voice.

## Style Calibration Set (10 recent EN posts analyzed)

1. `content/blog/ai_papers_2025/index.md`
2. `content/blog/pass_k/index.md`
3. `content/blog/llm_temperature/index.md`
4. `content/blog/llm_serialization/index.md`
5. `content/blog/book_review_petrov/index.md`
6. `content/blog/claude_mcp/index.md`
7. `content/blog/book_review_huyen/index.md`
8. `content/blog/ordinal_regression/index.md`
9. `content/blog/deep_learning_2024/index.md`
10. `content/blog/preference_optimization/index.md`

## Style Fingerprint (EN)

### Core tone

- Analytical and explanatory, with a calm teaching voice.
- Opinionated when needed, but usually framed as reasoned argument rather than hot takes.
- Comfortable mixing practitioner observations with research references.
- Accessible to technical readers: define terms, then deepen the analysis.

### Common opening patterns

- Start with context and why-now framing ("2025 was a year...", "As we move into 2025...").
- Start with a concrete puzzle or misconception, then explain why it matters.
- Start with a recent personal action for reviews/tutorials ("I recently read...", "If you follow the latest news...").
- Occasionally use a short quoted question/hook before the first section.
- `TL;DR` appears sometimes for dense technical topics, but not by default.

### Structure patterns

- Clear sectioned essays with `##` headings and descriptive labels.
- Strong use of progressive exposition: recap -> definition -> examples -> implications.
- Frequent use of bullets/numbered lists when comparing methods, papers, or takeaways.
- Book reviews often use a stable pattern: general thoughts -> summary -> chapter/part breakdown.
- Technical posts often include equations, code fences, or toy examples when they improve intuition.

### Language patterns

- Prefer precise nouns/verbs over hype language.
- Explain acronyms on first mention and often bold important terms.
- Use signposting phrases: "To answer this...", "In this post...", "However...", "In practice...", "The key idea is...".
- Use examples and counterexamples to clarify distinctions.
- Use long paragraphs when building an argument, but break into lists for scanability.

## Writing Workflow (EN)

1. Identify post type: technical explainer, paper roundup, tutorial, book review, or reflective analysis.
2. Draft the intro with one of the opening patterns above.
3. Build a section outline with descriptive `##` headings before full drafting.
4. Add definitions/recaps before advanced discussion when introducing specialized concepts.
5. Add examples, experiments, or comparisons (not just claims).
6. End with a concise conclusion or explicit takeaway section when the argument is complex.

## Voice-Preserving Polishing (EN)

When polishing, improve quality without making it sound generic.

### Keep

- The author's explanatory pace
- Technical specificity
- Cautious claims and explicit uncertainty where appropriate
- Practitioner framing (why this matters in real use)

### Improve

- Replace vague pronouns with precise referents
- Break oversized paragraphs when topic shifts
- Add signposts between sections
- Tighten repetitive phrases
- Convert dense comparisons into bullets/tables when readability improves
- Clarify what is hypothesis vs evidence
- Replace AI-sounding phrasing with concrete claims (avoid generic transitions, inflated summaries, and abstract “this highlights/underscores” filler unless genuinely needed)

### Do not introduce

- Clickbait framing
- Overly casual/slangy tone
- Marketing-style adjectives ("revolutionary", "game-changing") unless quoted/contextualized
- Empty summaries that repeat the title
- AI-slop tone: symmetrical paragraph cadence, vague thesis restatements, empty “In today’s fast-changing world” style framing, or polished-but-noncommittal wording

## Revision Prompts This Skill Should Handle Well

- "Rewrite this section to sound more like my recent technical posts."
- "Polish this English draft but preserve my voice and technical nuance."
- "Add a TL;DR and clearer headings without changing the argument."
- "Turn this paper summary into a more structured explainer in my style."
