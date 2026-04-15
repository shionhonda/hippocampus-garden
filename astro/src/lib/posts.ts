import { getCollection, type CollectionEntry } from "astro:content"
import { profile } from "../data/profile"
import { topicSlug } from "./topics"

export type Post = CollectionEntry<"posts">

export async function getAllPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft)
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export function getPostPath(post: Post) {
  return `/${getPostSlug(post)}/`
}

export function getPostSlug(post: Post) {
  return (
    post.data.slug ??
    post.id
      .replace(/\/index\.md$/, "")
      .replace(/\/index$/, "")
      .replace(/\.md$/, "")
  )
}

function stripNonProseContent(value: string) {
  return value
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, " ")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
}

function normalizeText(value: string) {
  return value.normalize("NFKC").toLowerCase()
}

function extractMarkdownText(value: string) {
  return stripNonProseContent(value)
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1 ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[#>*_~-]+/g, " ")
}

function tokenizeText(value: string) {
  const normalized = normalizeText(value)
  const tokens: string[] = []

  for (const match of normalized.matchAll(/[a-z0-9]+(?:[-_./:'][a-z0-9]+)*/g)) {
    const token = match[0]
    if (token.length >= 2) {
      tokens.push(token)
    }
  }

  for (const segment of normalized.match(
    /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+/g
  ) ?? []) {
    if (segment.length === 1) {
      tokens.push(segment)
      continue
    }
    for (let index = 0; index < segment.length - 1; index += 1) {
      tokens.push(segment.slice(index, index + 2))
    }
  }

  return tokens
}

function buildPostFeatureText(post: Post) {
  const title = `${post.data.title} ${post.data.title}`
  const description = `${post.data.description} ${post.data.description}`
  const body = extractMarkdownText(post.body)
  return `${title} ${description} ${body}`
}

function cosineSimilarity(
  left: Map<string, number>,
  right: Map<string, number>
) {
  if (left.size === 0 || right.size === 0) {
    return 0
  }

  let dotProduct = 0
  for (const [term, value] of left) {
    dotProduct += value * (right.get(term) ?? 0)
  }

  const leftNorm = Math.sqrt(
    [...left.values()].reduce((sum, value) => sum + value ** 2, 0)
  )
  const rightNorm = Math.sqrt(
    [...right.values()].reduce((sum, value) => sum + value ** 2, 0)
  )

  if (leftNorm === 0 || rightNorm === 0) {
    return 0
  }

  return dotProduct / (leftNorm * rightNorm)
}

function extractInternalLinks(value: string) {
  const prose = stripNonProseContent(value)
  const matches = prose.matchAll(
    /\[[^\]]*]\((https?:\/\/hippocampus-garden\.com\/[^)\s#?]+\/?|\/[^)\s#?]+\/?)\)/g
  )
  const slugs = new Set<string>()

  for (const match of matches) {
    const rawTarget = match[1]
      .replace(/^https?:\/\/hippocampus-garden\.com/, "")
      .replace(/^\/+|\/+$/g, "")

    if (rawTarget.length > 0) {
      slugs.add(rawTarget)
    }
  }

  return slugs
}

function buildTfIdfVector(
  tokens: string[],
  documentFrequency: Map<string, number>,
  totalDocuments: number
) {
  const termFrequency = new Map<string, number>()
  for (const token of tokens) {
    termFrequency.set(token, (termFrequency.get(token) ?? 0) + 1)
  }

  const vector = new Map<string, number>()
  const maxFrequency = Math.max(...termFrequency.values(), 1)

  for (const [term, count] of termFrequency) {
    const tf = count / maxFrequency
    const df = documentFrequency.get(term) ?? 0
    const idf = Math.log((1 + totalDocuments) / (1 + df)) + 1
    vector.set(term, tf * idf)
  }

  return vector
}

function buildTagDocumentFrequency(posts: Post[]) {
  const tagDocumentFrequency = new Map<string, number>()

  for (const post of posts) {
    for (const tag of new Set(post.data.tags)) {
      tagDocumentFrequency.set(tag, (tagDocumentFrequency.get(tag) ?? 0) + 1)
    }
  }

  return tagDocumentFrequency
}

function getTagOverlapScore(
  source: Post,
  candidate: Post,
  tagDocumentFrequency: Map<string, number>,
  totalDocuments: number
) {
  if (source.data.tags.length === 0 || candidate.data.tags.length === 0) {
    return 0
  }

  const sourceTags = new Set(source.data.tags)
  let score = 0
  for (const tag of candidate.data.tags) {
    if (!sourceTags.has(tag)) continue
    const df = tagDocumentFrequency.get(tag) ?? 0
    score += Math.log((1 + totalDocuments) / (1 + df)) + 1
  }

  return score
}

type RelatedPostFeatures = {
  inboundLinks: Set<string>
  outboundLinks: Set<string>
  slug: string
  tfidfVector: Map<string, number>
}

async function buildRelatedPostFeatures(posts: Post[]) {
  const postsByLanguage = new Map<string, Post[]>()
  for (const post of posts) {
    const language = post.data.lang ?? "unknown"
    postsByLanguage.set(language, [
      ...(postsByLanguage.get(language) ?? []),
      post,
    ])
  }

  const featureMap = new Map<string, RelatedPostFeatures>()

  for (const group of postsByLanguage.values()) {
    const documentFrequency = new Map<string, number>()
    const tokenMap = new Map<string, string[]>()

    for (const post of group) {
      const slug = getPostSlug(post)
      const tokens = tokenizeText(buildPostFeatureText(post))
      tokenMap.set(slug, tokens)

      for (const token of new Set(tokens)) {
        documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1)
      }
    }

    for (const post of group) {
      const slug = getPostSlug(post)
      featureMap.set(slug, {
        slug,
        outboundLinks: extractInternalLinks(post.body),
        inboundLinks: new Set<string>(),
        tfidfVector: buildTfIdfVector(
          tokenMap.get(slug) ?? [],
          documentFrequency,
          group.length
        ),
      })
    }
  }

  for (const features of featureMap.values()) {
    for (const targetSlug of features.outboundLinks) {
      featureMap.get(targetSlug)?.inboundLinks.add(features.slug)
    }
  }

  return featureMap
}

function countLatinWords(value: string) {
  return (value.match(/[A-Za-z0-9]+(?:[-'./_:][A-Za-z0-9]+)*/g) ?? []).length
}

function countCjkCharacters(value: string) {
  return (
    value.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) ?? []
  ).length
}

export function getReadingTime(post: Post) {
  const body = stripNonProseContent(post.body)
  const latinWords = countLatinWords(body)
  const cjkCharacters = countCjkCharacters(body)
  const englishMinutes = latinWords / 220
  const japaneseMinutes = cjkCharacters / 500
  return Math.max(1, Math.ceil(englishMinutes + japaneseMinutes))
}

export async function getSelectedWriting(
  posts?: Post[],
  selectedSlugs = profile.selectedWritingSlugs
) {
  const allPosts = posts ?? (await getAllPosts())
  return selectedSlugs
    .map((slug) => allPosts.find((post) => getPostSlug(post) === slug))
    .filter((post): post is Post => Boolean(post))
}

// Related posts are ranked primarily by same-language TF-IDF similarity over
// title, description, and prose-only body text. Internal links add a strong
// editorial signal, while tag overlap and recency only act as tie-breakers.
export async function getRelatedPosts(post: Post, limit = 3) {
  const allPosts = await getAllPosts()
  const relatedPostFeatures = await buildRelatedPostFeatures(allPosts)
  const tagDocumentFrequency = buildTagDocumentFrequency(allPosts)
  const sourceSlug = getPostSlug(post)
  const sourceFeatures = relatedPostFeatures.get(sourceSlug)

  if (!sourceFeatures) {
    return []
  }

  return allPosts
    .filter((candidate) => getPostSlug(candidate) !== sourceSlug)
    .filter(
      (candidate) =>
        !post.data.lang ||
        !candidate.data.lang ||
        candidate.data.lang === post.data.lang
    )
    .map((candidate) => {
      const candidateSlug = getPostSlug(candidate)
      const candidateFeatures = relatedPostFeatures.get(candidateSlug)
      const tfidfSimilarity = candidateFeatures
        ? cosineSimilarity(
            sourceFeatures.tfidfVector,
            candidateFeatures.tfidfVector
          )
        : 0
      const linkScore =
        (sourceFeatures.outboundLinks.has(candidateSlug) ? 0.35 : 0) +
        (sourceFeatures.inboundLinks.has(candidateSlug) ? 0.15 : 0)
      const tagScore =
        getTagOverlapScore(
          post,
          candidate,
          tagDocumentFrequency,
          allPosts.length
        ) * 0.02
      const recencyScore = candidate.data.date.getTime() / 1e13

      return {
        candidate,
        score: tfidfSimilarity + linkScore + tagScore + recencyScore * 0.01,
      }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

export async function getPostsForTopic(topic: string) {
  const posts = await getAllPosts()
  return posts.filter((post) =>
    post.data.tags.some((tag) => topicSlug(tag) === topic)
  )
}

export function paginatePosts(posts: Post[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize))
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const start = (currentPage - 1) * pageSize
  return {
    currentPage,
    totalPages,
    items: posts.slice(start, start + pageSize),
  }
}
