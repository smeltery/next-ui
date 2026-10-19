import { readFile } from "node:fs/promises"
import path from "node:path"
import { marked } from "marked"
import type { BundledLanguage } from "shiki"
import { highlight } from "./shiki"
import { DOCS } from "@/data/docs"
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}
export async function readDoc(doc: (typeof DOCS)[number]) {
  const source = await readFile(
    path.join(process.cwd(), "docs", doc.file),
    "utf8"
  )
  const headings = [...source.matchAll(/^## (.+)$/gm)].map((match) => ({
    title: match[1],
    id: headingId(match[1])
  }))
  const body = source
    .replace(/^# .+\n/, "")
    .replace(/\]\(([^)]+\.md)\)/g, (match, href: string) => {
      const target = DOCS.find((entry) => entry.file === href)
      return target ? `](/docs/${target.slug})` : match
    })
    .replace(
      /\]\(\.\.\/LICENSE\)/g,
      "](https://github.com/smeltery/next-ui/blob/master/LICENSE)"
    )
  let html = (await marked.parse(body)).replace(/<pre>/g, '<pre tabindex="0">')
  html = html.replace(
    /<h2>(.*?)<\/h2>/g,
    (_, title: string) => `<h2 id="${headingId(title)}">${title}</h2>`
  )
  const blocks = [
    ...html.matchAll(
      /<pre tabindex="0"><code class="language-(tsx|ts|typescript|sh|bash|json)">([\s\S]*?)<\/code><\/pre>/g
    )
  ]
  for (const block of blocks) {
    const code = block[2].replace(
      /&(lt|gt|quot|#39|amp);/g,
      (_, entity: string) =>
        ({ lt: "<", gt: ">", quot: '\"', "#39": "'", amp: "&" })[entity] || ""
    )
    const language = (block[1] === "sh" ? "bash" : block[1]) as BundledLanguage
    const rendered = (await highlight(code, "github-dark", language)).replace(
      "<code>",
      `<code class="language-${block[1]}">`
    )
    html = html.replace(block[0], rendered)
  }
  return { source, html, headings }
}
