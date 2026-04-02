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

export function getReadingTime(post: Post) {
  const words = post.body.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export async function getSelectedWriting(posts?: Post[]) {
  const allPosts = posts ?? (await getAllPosts())
  return profile.selectedWritingSlugs
    .map((slug) => allPosts.find((post) => getPostSlug(post) === slug))
    .filter((post): post is Post => Boolean(post))
}

export async function getRelatedPosts(post: Post, limit = 3) {
  const allPosts = await getAllPosts()
  const sourceTags = new Set(post.data.tags)

  return allPosts
    .filter((candidate) => getPostSlug(candidate) !== getPostSlug(post))
    .map((candidate) => {
      const overlap = candidate.data.tags.filter((tag) => sourceTags.has(tag)).length
      const sameLanguage = candidate.data.lang === post.data.lang ? 1 : 0
      const recency = candidate.data.date.getTime()
      return { candidate, score: overlap * 10 + sameLanguage * 3 + recency / 1e13 }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

export async function getPostsForTopic(topic: string) {
  const posts = await getAllPosts()
  return posts.filter((post) =>
    post.data.tags.some((tag) => topicSlug(tag) === topic),
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
