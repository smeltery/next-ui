import { notFound } from "next/navigation"
import Link from "next/link"
import { DOCS } from "@/data/docs"
import { readDoc } from "@/lib/docs"
import { DocActions } from "@/components/docs/doc-actions"
import { DocsNavigation } from "@/components/docs/navigation"
import { CodeTools } from "@/components/docs/code-tools"
import { Diagrams } from "@/components/docs/diagrams"
export function generateStaticParams() {
  return DOCS.map((doc) => ({ slug: doc.slug ? doc.slug.split("/") : [] }))
}
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const doc = DOCS.find((item) => item.slug === (slug?.join("/") || ""))
  return {
    title: doc?.title ?? "Page not found",
    description: doc?.description
  }
}
export default async function DocsPage({
  params
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const doc = DOCS.find((item) => item.slug === (slug?.join("/") || ""))
  if (!doc) notFound()
  const { source, html, headings } = await readDoc(doc)
  const index = DOCS.indexOf(doc)
  return (
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <DocsNavigation slug={doc.slug} />
      </aside>
      <article className="docs-main">
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
        <header
          className={
            doc.slug === "api" || doc.slug === ""
              ? "doc-api-heading"
              : "doc-article-heading"
          }
        >
          <p className="eyebrow">
            {doc.slug === "api" || doc.slug === ""
              ? "Developer documentation"
              : doc.group}
          </p>
          {doc.slug === "api" || doc.slug === "" ? (
            <h1>
              Small components.
              <br />
              <em>Possibilities open.</em>
            </h1>
          ) : (
            <h1>{doc.title}</h1>
          )}
          <p className="docs-lead">{doc.description}</p>
          {(doc.slug === "api" || doc.slug === "") && (
            <>
              <div className="docs-notice">
                Source you can read and adapt. Components run in your
                application; no hosted service or component package is required.
              </div>
              <div className="docs-base">
                <span>React + TypeScript · source directory</span>
                <code>components/examples/</code>
              </div>
              <p className="docs-flow">
                <Link href="/components">Find a component</Link>,{" "}
                <Link href="/docs/quick-start">copy its source</Link>, then{" "}
                <Link href="/docs/customization">make it your own</Link>.
              </p>
            </>
          )}
        </header>
        <div
          className="doc-content"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML comes only from reviewed local source and trusted rendering.
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Diagrams />
        <CodeTools />
        <div className="mobile-doc-actions">
          <DocActions source={source} file={doc.file} title={doc.title} />
        </div>
        {DOCS[index + 1] && (
          <Link className="doc-next" href={`/docs/${DOCS[index + 1].slug}`}>
            <span>Up next</span>
            {DOCS[index + 1].title}
          </Link>
        )}
        <footer className="docs-footer">
          <Link href="/">Next UI home</Link>
          <a href="https://github.com/smeltery/next-ui/tree/master/docs">
            View documentation source
          </a>
        </footer>
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
