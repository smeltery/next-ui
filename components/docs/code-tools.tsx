"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
export function CodeTools() {
  const pathname = usePathname()
  useEffect(() => {
    const controls: HTMLElement[] = []
    for (const pre of document.querySelectorAll<HTMLElement>(
      ".doc-content pre"
    )) {
      const code = pre.querySelector("code")
      if (!code || code.classList.contains("language-mermaid")) continue
      const toolbar = document.createElement("div")
      toolbar.className = "docs-code-heading"
      const label = document.createElement("span")
      label.textContent = code.className.replace("language-", "") || "Code"
      const button = document.createElement("button")
      button.type = "button"
      button.textContent = "Copy"
      button.setAttribute("aria-label", "Copy code example")
      button.setAttribute("aria-live", "polite")
      button.onclick = async () => {
        try {
          await navigator.clipboard.writeText(code.textContent || "")
          button.textContent = "Copied"
        } catch {
          const selection = window.getSelection()
          const range = document.createRange()
          range.selectNodeContents(code)
          selection?.removeAllRanges()
          selection?.addRange(range)
          button.textContent = "Select and copy below"
        }
      }
      toolbar.append(label, button)
      pre.before(toolbar)
      pre.classList.add("with-toolbar")
      controls.push(toolbar)
    }
    return () => {
      for (const control of controls) control.remove()
    }
  }, [pathname])
  return null
}
