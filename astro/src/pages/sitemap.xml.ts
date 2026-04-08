import type { APIRoute } from "astro"
import { site } from "../data/site"
import { getAllPosts, getPostPath, paginatePosts } from "../lib/posts"
import { getAllTopics } from "../lib/topics"

function urlEntry(path: string, lastmod?: Date) {
  const location = new URL(path, site.siteUrl).toString()
  const updatedAt = lastmod?.toISOString()

  return [
    "  <url>",
    `    <loc>${location}</loc>`,
    ...(updatedAt ? [`    <lastmod>${updatedAt}</lastmod>`] : []),
    "  </url>",
  ].join("\n")
}

export const GET: APIRoute = async () => {
  const posts = await getAllPosts()
  const topics = getAllTopics(posts)
  const totalPages = paginatePosts(posts, 1, site.postsPerPage).totalPages

  const entries = [
    urlEntry("/"),
    urlEntry("/about/"),
    urlEntry("/about-ja/"),
    urlEntry("/privacy-policy/"),
    urlEntry("/topics/"),
    ...Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) =>
      urlEntry(`/page/${index + 2}/`)
    ),
    ...topics.map((topic) => urlEntry(`/topics/${topic.slug}/`)),
    ...posts.map((post) =>
      urlEntry(getPostPath(post), post.data.updated ?? post.data.date)
    ),
  ]

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...entries,
      "</urlset>",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    }
  )
}
