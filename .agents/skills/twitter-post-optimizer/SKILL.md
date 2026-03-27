---
name: twitter-post-optimizer
description: Draft and optimize X/Twitter posts and threads for sharing blog posts, technical ideas, and reading notes from this repository. Use when writing announcement tweets for new posts, creating bilingual (EN/JA) variants, improving hooks, or turning long posts into concise thread outlines without clickbait.
---

# Twitter Post Optimizer

Create high-signal X/Twitter posts for this blog and the author's topics (AI, ML, programming, books, career).

## Primary Use Cases

- Announce a new blog post from `content/blog/*/index.md`
- Turn a post into a short thread outline (3-10 posts).
- Produce EN and JA variants for the same article, often posting both.
- Rewrite a draft tweet for clarity, specificity, and stronger engagement.
- Generate quote-tweet replies or follow-up posts after publishing.

## Optimization Principles (adapted for this repo and author's style)

- Lead with the most interesting insight, specific detail (e.g., paper title, metric like pass@k, surprising result), or reflective question, as seen in past posts (e.g., starting with "Wrapped up 2025 with... my top 5 AI papers" or "AIによって知識がコモディティ化...").
- Be specific (metric, distinction, surprising result, practical takeaway).
- Match audience intent: AI/ML researchers/practitioners care about what changed, why it matters, and technical nuances—use terms like "DeepSeek-R1", "Elo vs Bradley-Terry" to attract them.
- Prefer honest curiosity, clear claims, and personal reflection over engagement bait.
- End with a useful action: read, compare, discuss, or share an edge case; keep it low-pressure like "If you enjoy thinking about evaluation quirks...".
- Incorporate bilingual elements: Often post EN and JA versions separately or together for broader reach to English and Japanese-speaking audiences.
- Draw from author's style: Thoughtful, expert tone; mix English technical terms in JA posts; summarize yearly reads or top papers with lists.

## Blog-to-Tweet Workflow

1. Read the post title, intro, and section headings.
2. Extract 1-3 strongest claims or takeaways, prioritizing technical specifics (e.g., model names, evaluation methods).
3. Choose a format:
   - Single tweet (announcement)
   - Thread opener + bullet thread outline
   - EN+JA pair (default for announcements)
4. Draft variants with different hooks (question, contrast, result, misconception), inspired by past examples like reflecting on AI commoditization or LLM quirks.
5. Keep tone aligned with the post: technical, thoughtful, not hype-heavy; preserve nuance/uncertainty.

## Recommended Formats

### Single post announcement

- Hook (insight/problem with specific example)
- One-line why-it-matters or personal reflection
- Link + short CTA (e.g., "Here's how it actually works 👇")

### Thread opener

- Clear promise (what the thread explains, e.g., "my top 5 AI papers of the year")
- 3-5 bullets of what readers will get, with specifics (e.g., "DeepSeek-R1, RLVR limitations")
- Optional link to full post in final line

### Bilingual pair (EN/JA)

- Keep the core claim identical
- Adapt phrasing naturally, not word-for-word translation
- Preserve technical terms in English when clearer (common in author's JA posts)
- Post as separate tweets or a thread for cross-audience reach

## Voice Constraints (enhanced from analysis)

- Avoid clickbait or exaggerated certainty.
- Avoid generic self-promotion; focus on content value.
- Prefer explanatory framing, practical relevance, and subtle personal touch (e.g., "I've been asked this question a few times").
- If the post contains nuance or uncertainty, preserve it in the tweet.
- Match author's voice: Concise yet detailed; use emojis sparingly (e.g., 😁 or 👇); blend EN/JA for authenticity; emphasize curiosity about AI quirks, evaluations, or translations.

## Polishing Checklist

- Is the main claim obvious in the first line?
- Is there a concrete detail (term, metric, example, distinction)?
- Does it sound like a human expert (e.g., reflective summaries of papers/books), not a growth-hacking template?
- Is the CTA useful and low-pressure?
- If thread: does each post advance the argument instead of repeating the opener?
- Does it appeal to target readers: Include AI-specific jargon to attract practitioners; bilingual for global reach?

## Output Options This Skill Should Offer

- 3 single-tweet variants (EN, JA, mixed)
- 1 thread opener + thread outline
- EN + JA versions (default)
- "Safer/more neutral" and "stronger hook" variants
- Personalized variants based on past post patterns (e.g., year-end summaries, technical deep dives)