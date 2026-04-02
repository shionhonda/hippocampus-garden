import { defineConfig } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { remarkCodeMeta } from "./src/lib/remark-code-meta"

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
