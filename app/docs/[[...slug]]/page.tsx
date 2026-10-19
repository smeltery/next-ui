import { notFound } from "next/navigation"
import Link from "next/link"
import { DOCS } from "@/data/docs"
import { readDoc } from "@/lib/docs"
import { DocActions } from "@/components/docs/doc-actions"
import { Diagrams } from "@/components/docs/diagrams"
export function generateStaticParams() {
  return DOCS.map((doc) => ({ slug: doc.slug ? doc.slug.split("/") : [] }))
}
export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const doc = DOCS.find((item) => item.slug === (params.slug?.join("/") || ""))
  return {
    title: doc?.title ?? "Page not found",
    description: doc?.description
  }
}
export default async function DocsPage({
  params
}: {
  params: { slug?: string[] }
}) {
  const doc = DOCS.find((item) => item.slug === (params.slug?.join("/") || ""))
  if (!doc) notFound()
  const { source, html, headings } = await readDoc(doc)
  const index = DOCS.indexOf(doc)
  return (
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <nav aria-label="Documentation pages">
          <Link href="/#library">Component library</Link>
          {["Start here", "Guides", "Project", "Resources"].map((group) => (
            <div className="docs-nav-group" key={group}>
              <p>{group}</p>
              {DOCS.filter((item) => item.group === group).map((item) => (
                <Link
                  key={item.slug}
                  href={`/docs/${item.slug}`}
                  aria-current={doc.slug === item.slug ? "page" : undefined}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <article className="docs-main">
        <header className="doc-article-heading">
          <p className="eyebrow">{doc.group}</p>
          <h1>{doc.title}</h1>
          <p className="docs-lead">{doc.description}</p>
        </header>
        <details className="mobile-toc">
          <summary>On this page</summary>
          <nav>
            {headings.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.title}
              </a>
            ))}
          </nav>
        </details>
        <div
          className="doc-content"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML comes only from reviewed local source and trusted rendering.
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Diagrams />
        {DOCS[index + 1] && (
          <Link className="doc-next" href={`/docs/${DOCS[index + 1].slug}`}>
            <span>Up next</span>
            {DOCS[index + 1].title}
          </Link>
        )}
      </article>
      <aside className="docs-toc">
        <p className="eyebrow">On this page</p>
        <nav aria-label="On this page">
          {headings.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.title}
            </a>
          ))}
        </nav>
        <DocActions source={source} file={doc.file} title={doc.title} />
      </aside>
    </div>
  )
}
