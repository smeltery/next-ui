"use client"
import { useState } from "react"
import { ArrowUp, Copy, MessageSquare } from "lucide-react"
export function DocActions({
  source,
  file,
  title
}: {
  source: string
  file: string
  title: string
}) {
  const [status, setStatus] = useState("Copy as Markdown")
  const [fallback, setFallback] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(source)
      setStatus("Markdown copied")
    } catch {
      setFallback(true)
      setStatus("Select Markdown below")
    }
  }
  const prompt = encodeURIComponent(
    `Help me use Next UI. This is the ${title} documentation:\n\n${source}`
  )
  const providers = [
    ["ChatGPT", "chatgpt", `https://chatgpt.com/?prompt=${prompt}`],
    ["Claude", "claude", `https://claude.ai/new?q=${prompt}`],
    ["v0", "v0", `https://v0.app/?q=${prompt}`],
    ["T3 Chat", "t3", `https://t3.chat/new?q=${prompt}`],
    ["Scira", "scira", `https://scira.ai/?q=${prompt}`],
    ["Cursor", "cursor", `https://cursor.com/link/prompt?text=${prompt}`]
  ]
  return (
    <div className="doc-actions">
      <a href={`https://github.com/smeltery/next-ui/edit/master/docs/${file}`}>
        <img src="/brand/github.svg" width="19" height="19" alt="" />
        Edit on GitHub
      </a>
      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth"
          })
        }
      >
        <ArrowUp size={19} />
        Scroll to top
      </button>
      <button type="button" onClick={copy} aria-live="polite">
        <Copy size={19} />
        {status}
      </button>
      {fallback && (
        <textarea
          readOnly
          aria-label="Page Markdown"
          value={source}
          onFocus={(event) => event.target.select()}
        />
      )}
      <details>
        <summary>
          <MessageSquare size={19} />
          Open in chat
          <span className="action-chevron" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="chat-links">
          {providers.map(([name, icon, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer">
              <img
                src={`/brand/chat/${icon}.svg`}
                width="19"
                height="19"
                alt=""
              />
              {name}
            </a>
          ))}
        </div>
        <p>Opens with this page’s documentation in the prompt.</p>
      </details>
    </div>
  )
}
