import type { MetadataRoute } from "next"
export default function robots(): MetadataRoute.Robots {
  const origin = process.env.SITE_URL
  return {
    rules: { userAgent: "*", ...(origin ? { allow: "/" } : { disallow: "/" }) },
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {})
  }
}
