import Link from "next/link"
import { DOCS } from "@/data/docs"
export function DocsNavigation({ slug }: { slug: string }) {
  return (
    <nav aria-label="Documentation pages">
      <Link href="/docs/api" aria-current={slug === "api" ? "page" : undefined}>
        Component API
      </Link>
      {["Start here", "Guides", "Project", "Resources"].map((group) => (
        <div className="docs-nav-group" key={group}>
          <p>{group}</p>
          {DOCS.filter((item) => item.group === group).map((item) => (
            <Link
              key={item.slug}
              href={item.slug === "brand" ? "/brand" : `/docs/${item.slug}`}
              aria-current={slug === item.slug ? "page" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
      <Link className="docs-home" href="/components">
        Explore the component library
      </Link>
    </nav>
  )
}
