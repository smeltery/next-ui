"use client"
import { useState } from "react"
import { Check, Copy } from "lucide-react"
const colors = [
  ["Canvas", "#080808", "A quiet foundation for the details."],
  ["Ink", "#f5f5f5", "Clear words and confident actions."],
  ["Accent", "#e0e0e0", "A softer emphasis, without adding color."],
  ["Surface", "#181818", "A little separation for related ideas."],
  ["Muted", "#a3a3a3", "Supporting words that stay readable."]
]
export function BrandPalette() {
  const [copied, setCopied] = useState("")
  const [fallback, setFallback] = useState("")
  async function copy(name: string, hex: string) {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(name)
      setFallback("")
    } catch {
      setCopied("")
      setFallback(hex)
    }
  }
  return (
    <>
      <div className="brand-palette">
        {colors.map(([name, hex, description]) => (
          <div key={name}>
            <button
              type="button"
              className="brand-swatch"
              onClick={() => copy(name, hex)}
              aria-label={`Copy ${name} ${hex}`}
            >
              <span className="brand-color" style={{ background: hex }} />
              <span className="brand-swatch-label">
                <span>{name}</span>
                <span className="brand-hex">{hex}</span>
                <span className="brand-copy" aria-hidden="true">
                  {copied === name ? <Check size={15} /> : <Copy size={15} />}
                </span>
              </span>
            </button>
            <p className="brand-color-note">{description}</p>
          </div>
        ))}
      </div>
      <p className={fallback ? "brand-copy-status" : "sr-only"} role="status">
        {fallback
          ? "Clipboard unavailable. Select and copy the value below."
          : copied
            ? `${copied} color copied.`
            : ""}
      </p>
      {fallback && (
        <input
          className="brand-copy-fallback"
          aria-label="Color hex value"
          readOnly
          value={fallback}
          onFocus={(event) => event.target.select()}
        />
      )}
    </>
  )
}
