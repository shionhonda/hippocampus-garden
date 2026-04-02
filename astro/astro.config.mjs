import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import dotenv from "dotenv"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { remarkCodeMeta } from "./src/lib/remark-code-meta"

const astroDir = fileURLToPath(new URL(".", import.meta.url))
const repoRoot = path.resolve(astroDir, "..")
const mode = process.env.NODE_ENV === "production" ? "production" : "development"
const envPath = path.join(repoRoot, `.env.${mode}`)

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
}

export default defineConfig({
  site: "https://hippocampus-garden.com",
  trailingSlash: "always",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
    remarkPlugins: [remarkCodeMeta, remarkGfm, remarkMath],
    rehypePlugins: [
      [rehypeKatex, { strict: "ignore" }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Anchor link",
          },
          content: [
            {
              type: "text",
              value: "#",
            },
          ],
        },
      ],
    ],
  },
})
