"use client"
import { useState } from "react"
import Link from "next/link"
import { Search, LayoutGrid, Layers, Sparkles, Move } from "lucide-react"
import { COMPONENTS_LIST } from "@/data/component-list"
const groups = [
  "All components",
  "Borders & light",
  "Motion & depth",
  "Backgrounds"
]
const icons = [LayoutGrid, Layers, Move, Sparkles]
function category(slug: string) {
  return ["parallax", "infinite-carousel"].includes(slug)
    ? "Motion & depth"
    : ["meteors", "dynamic-grid-pattern"].includes(slug)
      ? "Backgrounds"
      : "Borders & light"
}
export function ComponentCatalog() {
  const [group, setGroup] = useState(groups[0])
  const [query, setQuery] = useState("")
  const items = COMPONENTS_LIST.filter(
    (item) =>
      (group === groups[0] || category(item.slug) === group) &&
      `${item.name} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
  )
  return (
    <div className="catalog-layout">
      <aside className="catalog-filters">
        <p className="eyebrow">Browse by detail</p>
        <fieldset aria-label="Component category">
          {groups.map((name, index) => {
            const Icon = icons[index]
            return (
              <button
                type="button"
                aria-pressed={group === name}
                key={name}
                onClick={() => setGroup(name)}
              >
                <Icon size={17} />
                {name}
                <span>
                  {index === 0
                    ? 9
                    : COMPONENTS_LIST.filter(
                        (item) => category(item.slug) === name
                      ).length}
                </span>
              </button>
            )
          })}
        </fieldset>
        <div className="catalog-help">
          <BookHint />
          <strong>A good place to start.</strong>
          <p>Everything you need to bring a component into your project.</p>
          <Link href="/docs/quick-start">Read the quick start</Link>
        </div>
      </aside>
      <div className="catalog-results">
        <label className="catalog-search">
          <Search size={18} />
          <span className="sr-only">Search components</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What detail are you looking for?"
          />
          <kbd>/</kbd>
        </label>
        <p className="result-count" role="status">
          {items.length} components <span>Preview. Copy. Customize.</span>
        </p>
        <div className="component-grid">
          {items.map((item, index) => (
            <article className="component-card" key={item.slug}>
              <div className="component-demo dark">
                <item.component />
              </div>
              <Link href={`/${item.slug}`} className="component-description">
                <span className="component-number">
                  {String(index + 1).padStart(2, "0")} / {category(item.slug)}
                </span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="view-component">
                  View component <CodeIcon />
                </span>
              </Link>
            </article>
          ))}
        </div>
        {!items.length && (
          <div className="empty-state">
            <h3>No components found.</h3>
            <p>Try “light”, “border”, or “motion”.</p>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                setQuery("")
                setGroup(groups[0])
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
function BookHint() {
  return <Layers size={22} />
}
function CodeIcon() {
  return <span aria-hidden="true">&lt;/&gt;</span>
}
