import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getAllPosts, getPostPath } from "../lib/posts"
import { site } from "../data/site"

export async function GET(context: APIContext) {
  const posts = await getAllPosts()
  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: getPostPath(post),
    })),
  })
}
