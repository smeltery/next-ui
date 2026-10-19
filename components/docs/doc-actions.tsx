"use client"
import { useState } from "react"
import { ArrowUp, Copy, Github, MessageSquare, Check } from "lucide-react"
export function DocActions({
  source,
  file,
  title
}: {
  source: string
  file: string
  title: string
}) {
  const [status, setStatus] = useState("")
  async function copy() {
    try {
      await navigator.clipboard.writeText(source)
      setStatus("Markdown copied")
    } catch {
      setStatus(
        "Clipboard unavailable. Use Edit on GitHub to read and copy the source."
      )
    }
  }
  const prompt = encodeURIComponent(
    `Help me use Next UI. This is the ${title} documentation:\n\n${source}`
  )
  return (
    <div className="doc-actions">
      <a href={`https://github.com/smeltery/next-ui/edit/master/docs/${file}`}>
        <Github size={17} />
        Edit on GitHub
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={17} />
        Scroll to top
      </button>
      <button type="button" onClick={copy}>
        {status === "Markdown copied" ? (
          <Check size={17} />
        ) : (
          <Copy size={17} />
        )}
        Copy as Markdown
      </button>
      <details>
        <summary>
          <MessageSquare size={17} />
          Open in chat
        </summary>
        <div className="chat-links">
          <a
            href={`https://chatgpt.com/?prompt=${prompt}`}
            target="_blank"
            rel="noreferrer"
          >
            ChatGPT
          </a>
          <a
            href={`https://claude.ai/new?q=${prompt}`}
            target="_blank"
            rel="noreferrer"
          >
            Claude
          </a>
          <a
            href={`https://v0.app/?q=${prompt}`}
            target="_blank"
            rel="noreferrer"
          >
            v0
          </a>
          <a
            href={`https://cursor.com/link/prompt?text=${prompt}`}
            target="_blank"
            rel="noreferrer"
          >
            Cursor
          </a>
        </div>
      </details>
      <p role="status">{status}</p>
    </div>
  )
}
