import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import dotenv from "dotenv"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { remarkCodeMeta } from "./src/lib/remark-code-meta"
import { remarkMermaid } from "./src/lib/remark-mermaid"

const astroDir = fileURLToPath(new URL(".", import.meta.url))
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development"
const envPath = path.join(astroDir, `.env.${mode}`)

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
      // `white-space: pre` keeps mobile WebKit from text-autosizing code.
      wrap: false,
    },
    remarkPlugins: [remarkCodeMeta, remarkMermaid, remarkGfm, remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: "ignore" }], rehypeSlug],
  },
})
