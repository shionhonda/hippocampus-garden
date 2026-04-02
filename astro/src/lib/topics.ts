import { site } from "../data/site"

type PostLike = {
  data: {
    date: Date
    tags: string[]
  }
}

export function topicSlug(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\s/]+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function isDisplayTopic(tag: string) {
  return tag !== "en" && tag !== "ja" && tag !== "internal"
}

export function getRecentMajorTopics<T extends PostLike>(posts: T[]) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - site.majorTopicsWindowDays)

  const counts = new Map<string, number>()
  for (const post of posts) {
    if (post.data.date < cutoff) continue
    for (const tag of post.data.tags.filter(isDisplayTopic)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([label, count]) => ({ label, slug: topicSlug(label), count }))
}

export function getAllTopics<T extends PostLike>(posts: T[]) {
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.data.tags.filter(isDisplayTopic)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([label, count]) => ({ label, slug: topicSlug(label), count }))
}
