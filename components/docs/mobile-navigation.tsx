"use client"
import type { RefObject } from "react"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { DocsNavigation } from "./navigation"
export function DocsMobileNavigation({
  dialogRef,
  close
}: {
  dialogRef: RefObject<HTMLDialogElement | null>
  close: () => void
}) {
  const pathname = usePathname()
  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      className="docs-drawer"
      aria-label="Documentation navigation"
      onCancel={close}
      onClick={(event) => {
        if (
          event.target === event.currentTarget ||
          (event.target as HTMLElement).closest("a")
        )
          close()
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault()
          close()
        }
      }}
    >
      <div className="docs-drawer-heading">
        <span>Documentation</span>
        <button type="button" onClick={close} aria-label="Close navigation">
          <X size={20} />
        </button>
      </div>
      <div className="docs-sidebar">
        <DocsNavigation slug={pathname.replace(/^\/docs\/?/, "")} />
      </div>
    </dialog>
  )
}
