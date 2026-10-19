"use client"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
export function CopyButton({
  className,
  copyToClipboard
}: {
  className?: string
  copyToClipboard: string
}) {
  const [status, setStatus] = useState("")
  useEffect(() => {
    if (!status) return
    const timeout = setTimeout(() => setStatus(""), 3000)
    return () => clearTimeout(timeout)
  }, [status])
  async function copy() {
    try {
      await navigator.clipboard.writeText(copyToClipboard)
      setStatus("Copied")
    } catch {
      setStatus("Copy failed. Select the code and copy it manually.")
    }
  }
  return (
    <div>
      <button
        type="button"
        aria-label="Copy code"
        className={cn("rounded-md bg-muted p-3", className)}
        onClick={copy}
      >
        {status === "Copied" ? (
          <Check className="size-4" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <span className="sr-only" role="status">
        {status}
      </span>
    </div>
  )
}
