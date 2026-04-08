import type { APIRoute } from "astro"
import { site } from "../data/site"

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nDisallow:\nSitemap: ${site.siteUrl}/sitemap.xml\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  )
