"use client"
import { useState, type RefObject } from "react"
import { Search, X, Code2, BookOpen } from "lucide-react"
import Link from "next/link"
import { COMPONENTS_LIST } from "@/data/component-list"
import { DOCS } from "@/data/docs"
const entries = [
  ...COMPONENTS_LIST.map((item) => ({
    title: item.name,
    description: item.description,
    href: `/${item.slug}`,
    kind: "Component"
  })),
  ...DOCS.map((doc) => ({
    title: doc.title,
    description: doc.description,
    href: `/docs/${doc.slug}`,
    kind: "Guide"
  }))
]
export function SearchDialog({
  dialogRef,
  close
}: {
  dialogRef: RefObject<HTMLDialogElement | null>
  close: () => void
}) {
  const [query, setQuery] = useState("")
  const [scope, setScope] = useState("Everything")
  const results = entries.filter(
    (item) =>
      (scope === "Everything" || item.kind === scope) &&
      `${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
  )
  return (
    <dialog
      ref={dialogRef}
      className="search-dialog"
      aria-labelledby="search-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault()
          close()
        }
      }}
      onClose={() => {
        if (!document.querySelector("dialog[open]"))
          document.documentElement.style.overflow = ""
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="overlay-heading">
        <div>
          <p className="eyebrow">The Next UI library</p>
          <h2 id="search-title">Find your next detail.</h2>
        </div>
        <button
          type="button"
          className="close-overlay"
          aria-label="Close search"
          onClick={close}
        >
          <X />
        </button>
      </div>
      <div className="panel-search">
        <Search />
        <label className="sr-only" htmlFor="global-search">
          Search components and guides
        </label>
        <input
          id="global-search"
          type="search"
          value={query}
          placeholder="Search components or guides…"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              dialogRef.current
                ?.querySelector<HTMLAnchorElement>(".search-result")
                ?.focus()
            }
          }}
        />
      </div>
      <fieldset className="search-scopes" aria-label="Search within">
        {["Everything", "Component", "Guide"].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={scope === item}
            onClick={() => setScope(item)}
          >
            {item}
          </button>
        ))}
      </fieldset>
      <div className="search-results-scroll">
        <nav
          aria-label="Search results"
          onKeyDown={(event) => {
            const links = [...event.currentTarget.querySelectorAll("a")]
            const index = links.indexOf(
              document.activeElement as HTMLAnchorElement
            )
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault()
              links[
                (index + (event.key === "ArrowDown" ? 1 : -1) + links.length) %
                  links.length
              ]?.focus()
            }
          }}
        >
          {results.map((item) => (
            <Link
              key={item.href}
              className="search-result"
              href={item.href}
              onClick={close}
            >
              <span className="result-icon">
                {item.kind === "Component" ? <Code2 /> : <BookOpen />}
              </span>
              <span className="result-copy">
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <span className="result-kind">{item.kind}</span>
            </Link>
          ))}
        </nav>
        {!results.length && (
          <div className="search-no-results">
            <h3>No matches this time.</h3>
            <p>Try “border”, “motion”, or “setup”.</p>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                setQuery("")
                setScope("Everything")
              }}
            >
              Reset search
            </button>
          </div>
        )}
      </div>
      <div className="search-panel-footer">
        <p role="status">{results.length} results</p>
        <span className="search-key-help">↑ ↓ Move · ↵ Open · esc Close</span>
      </div>
    </dialog>
  )
}
