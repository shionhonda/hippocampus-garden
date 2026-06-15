import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(["en", "ja"]).optional(),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
    updated: z.coerce.date().optional(),
    featuredImage: z.string().optional(),
    thumbnail: z.string().optional(),
    thumbnailAlt: z.string().optional(),
    hero: z.string().optional(),
    heroAlt: z.string().optional(),
    series: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    ogImage: z.string().optional(),
    featured: z.boolean().optional(),
  }),
})

export const collections = { posts }
