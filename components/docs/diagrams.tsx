"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
export function Diagrams() {
  const pathname = usePathname()
  useEffect(() => {
    let cancelled = false
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer.unobserve(entry.target)
          render(entry.target as HTMLElement)
        }
      },
      { rootMargin: "200px" }
    )
    async function render(code: HTMLElement) {
      try {
        const { default: mermaid } = await import("mermaid")
        if (cancelled || !code.isConnected) return
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            primaryColor: "#edf2e5",
            primaryTextColor: "#526447",
            primaryBorderColor: "#b5c89f",
            lineColor: "#84976f",
            fontFamily: "sans-serif"
          }
        })
        const { svg } = await mermaid.render(
          `diagram-${crypto.randomUUID()}`,
          code.textContent || ""
        )
        if (cancelled || !code.isConnected) return
        const figure = document.createElement("figure")
        figure.className = "doc-diagram"
        figure.tabIndex = 0
        figure.setAttribute("aria-label", "Workflow diagram")
        figure.innerHTML = svg
        code.parentElement?.replaceWith(figure)
      } catch (error) {
        console.error("Diagram rendering failed", error)
        code.setAttribute(
          "aria-label",
          "Diagram source; visual rendering unavailable"
        )
      }
    }
    for (const code of document.querySelectorAll<HTMLElement>(
      ".doc-content .language-mermaid"
    ))
      observer.observe(code)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [pathname])
  return null
}
