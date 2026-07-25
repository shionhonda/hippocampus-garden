import type { ImageMetadata } from "astro"
import type { Post } from "./posts"
import { getPostSlug } from "./posts"

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "../content/posts/**/*.{png,jpg,jpeg,webp,avif,gif}",
  {
    eager: true,
  }
)

const imagesByKey = new Map<string, ImageMetadata>()

for (const [modulePath, value] of Object.entries(imageModules)) {
  const image = value.default
  const normalizedPath = modulePath
    .replace("../content/posts/", "")
    .replace(/^\/+/, "")
  imagesByKey.set(normalizedPath, image)
}

export function getFeaturedImage(post: Post) {
  const candidates = [
    post.data.featuredImage,
    post.data.ogImage,
    post.data.thumbnail,
  ].filter(Boolean) as string[]

  for (const candidate of candidates) {
    const trimmed = candidate.replace(/^\.?\//, "")
    const normalized = trimmed.startsWith(`${getPostSlug(post)}/`)
      ? trimmed
      : `${getPostSlug(post)}/${trimmed}`

    const asset = imagesByKey.get(normalized)
    if (asset) return asset
  }

  return null
}
