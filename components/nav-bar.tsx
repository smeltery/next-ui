"use client"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { Menu, Search } from "lucide-react"
import { Brand } from "./site/brand"
import { DocsMobileNavigation } from "./docs/mobile-navigation"
import { MobileMenu } from "./site/mobile-menu"
import { SearchDialog } from "./site/search-dialog"

export function Navbar() {
  const pathname = usePathname()
  const menu = useRef<HTMLDialogElement>(null)
  const search = useRef<HTMLDialogElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const docs = pathname.startsWith("/docs")
  function close() {
    menu.current?.close()
    search.current?.close()
    setMenuOpen(false)
    document.documentElement.style.overflow = ""
  }
  function openSearch() {
    menu.current?.close()
    setMenuOpen(false)
    search.current?.showModal()
    search.current?.querySelector("input")?.focus()
    document.documentElement.style.overflow = "hidden"
  }
  useEffect(() => {
    close()
  }, [pathname])
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        openSearch()
      }
    }
    document.addEventListener("keydown", shortcut)
    return () => document.removeEventListener("keydown", shortcut)
  }, [])
  return (
    <>
      <header className={docs ? "docs-header" : "site-header"}>
        <div className={docs ? "docs-header-inner" : "wrap header-inner"}>
          <Brand />
          {docs && <span className="docs-header-label">Documentation</span>}
          <nav className="desktop-nav" aria-label="Main navigation">
            {(docs
              ? [
                  ["API reference", "/docs/api"],
                  ["Examples", "/components"]
                ]
              : [
                  ["Explore components", "/components"],
                  ["Getting started", "/docs/quick-start"],
                  ["Our approach", "/docs/approach"]
                ]
            ).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="header-search-trigger"
            aria-label={
              docs ? "Search documentation" : "Search components and guides"
            }
            onClick={openSearch}
          >
            <Search size={17} />
            <span>{docs ? "Search docs" : "Search"}</span>
            <kbd>⌘ K</kbd>
          </button>
          <a
            className="github-link"
            aria-label="GitHub repository"
            href="https://github.com/smeltery/next-ui"
          >
            <Icons.github style={{ width: 16, height: 16 }} />
            <span>GitHub</span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              menu.current?.showModal()
              setMenuOpen(true)
              document.documentElement.style.overflow = "hidden"
            }}
          >
            {docs ? <span className="sr-only">Menu</span> : "Menu"}{" "}
            <Menu size={18} />
          </button>
        </div>
      </header>
      {docs ? (
        <DocsMobileNavigation dialogRef={menu} close={close} />
      ) : (
        <MobileMenu dialogRef={menu} close={close} openSearch={openSearch} />
      )}
      <SearchDialog dialogRef={search} close={close} />
    </>
  )
}
