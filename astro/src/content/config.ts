import { defineCollection, z } from "astro:content"

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(["en", "ja"]).optional(),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
    updated: z.coerce.date().optional(),
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
