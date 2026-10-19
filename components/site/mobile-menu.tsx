"use client"
import type { RefObject } from "react"
import Link from "next/link"
import { Icons } from "@/components/icons"
import {
  BookOpen,
  Compass,
  LayoutGrid,
  Layers,
  Search,
  Sparkles,
  X
} from "lucide-react"
import { Brand } from "./brand"
import { DOCS } from "@/data/docs"
import { usePathname } from "next/navigation"
export function MobileMenu({
  dialogRef,
  close,
  openSearch
}: {
  dialogRef: RefObject<HTMLDialogElement | null>
  close: () => void
  openSearch: () => void
}) {
  const docs = usePathname().startsWith("/docs")
  return (
    <dialog
      id="mobile-menu"
      ref={dialogRef}
      className="mobile-dialog"
      aria-labelledby="mobile-title"
      onClose={() => {
        if (!document.querySelector("dialog[open]"))
          document.documentElement.style.overflow = ""
      }}
    >
      <div className="mobile-panel-heading">
        <Brand />
        <button
          type="button"
          className="close-overlay"
          onClick={close}
          aria-label="Close navigation"
        >
          <X />
        </button>
      </div>
      <div className="mobile-panel-body">
        <p className="eyebrow">A little detail goes a long way</p>
        <h2 id="mobile-title">What’s next?</h2>
        <button
          className="mobile-search-trigger"
          onClick={openSearch}
          type="button"
        >
          <Search size={20} />
          <span>Search components & guides</span>
          <kbd>⌘ K</kbd>
        </button>
        <nav
          className="mobile-primary"
          aria-label="Mobile navigation"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) close()
          }}
        >
          <Link className="mobile-feature-card" href="/components">
            <span className="nav-card-icon">
              <LayoutGrid />
            </span>
            <span>
              <strong>Explore components</strong>
              <small>Find the detail your interface needs.</small>
            </span>
            <span className="nav-count">9</span>
          </Link>
          <div className="mobile-resource-grid">
            <Link href="/docs/quick-start">
              <BookOpen />
              <strong>Getting started</strong>
              <small>From preview to your first component.</small>
            </Link>
            <Link href="/docs/approach">
              <Compass />
              <strong>Our approach</strong>
              <small>Small details, made thoughtfully.</small>
            </Link>
          </div>
        </nav>
        <section className="mobile-tasks">
          <div className="mobile-section-label">
            <h3>{docs ? "Documentation" : "Browse by detail"}</h3>
            <span>Start with an idea</span>
          </div>
          <nav aria-label="Browse library">
            {docs
              ? DOCS.map((doc) => (
                  <Link
                    onClick={close}
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                  >
                    <span className="nav-card-icon">
                      <BookOpen />
                    </span>
                    <span>{doc.title}</span>
                  </Link>
                ))
              : [
                  ["Borders & light", "/spotlight-border", Layers],
                  ["Motion & depth", "/parallax", Compass],
                  ["Backgrounds", "/meteors", Sparkles]
                ].map(([label, href, Icon]) => {
                  const Glyph = Icon as typeof Layers
                  return (
                    <Link
                      onClick={close}
                      key={label as string}
                      href={href as string}
                    >
                      <span className="nav-card-icon">
                        <Glyph />
                      </span>
                      <span>{label as string}</span>
                    </Link>
                  )
                })}
          </nav>
        </section>
        <aside className="mobile-starter">
          <p className="eyebrow">Not sure where to begin?</p>
          <h3>Start with a little spotlight.</h3>
          <p>
            A soft light that follows your cursor. A small detail that makes a
            card feel alive.
          </p>
          <Link onClick={close} href="/spotlight">
            Explore Spotlight
          </Link>
        </aside>
      </div>
      <div className="mobile-panel-footer">
        <a href="https://github.com/smeltery/next-ui" className="icon-link">
          <Icons.github style={{ width: 18, height: 18 }} />
          GitHub
        </a>
        <a href="https://github.com/smeltery/next-ui/issues">
          Feedback & issues
        </a>
        <span className="mobile-footer-note">Made to fit your ideas.</span>
      </div>
    </dialog>
  )
}
