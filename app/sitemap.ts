import type { MetadataRoute } from "next"
import { COMPONENTS_LIST } from "@/data/component-list"
import { DOCS } from "@/data/docs"
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.SITE_URL
  if (!origin) return []
  return [
    "/",
    "/components",
    "/brand",
    ...COMPONENTS_LIST.map((item) => `/${item.slug}`),
    ...DOCS.filter((item) => item.slug !== "brand").map(
      (item) => `/docs/${item.slug}`
    )
  ].map((route) => ({ url: new URL(route, origin).href }))
}
