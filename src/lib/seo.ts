import { site } from "../data/site"
import { getFeaturedImage } from "./post-images"
import { getPostPath, type Post } from "./posts"

export function toAbsoluteUrl(path?: string) {
  if (!path) return undefined
  if (/^https?:\/\//.test(path)) return path
  return new URL(path, site.siteUrl).toString()
}

export function getDefaultSocialImage() {
  return toAbsoluteUrl(site.defaultOgImage)
}

export function getPostCanonicalUrl(post: Post) {
  return post.data.canonicalUrl ?? toAbsoluteUrl(getPostPath(post))
}

export function getPostSocialImage(post: Post) {
  const featuredImage = getFeaturedImage(post)
  if (featuredImage) {
    return toAbsoluteUrl(featuredImage.src)
  }

  if (post.data.ogImage) {
    return toAbsoluteUrl(post.data.ogImage)
  }

  return getDefaultSocialImage()
}
