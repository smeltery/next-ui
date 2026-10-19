import { readFileSync, existsSync, readdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { marked } from "marked"
import { JSDOM } from "jsdom"
const dom = new JSDOM("<!doctype html><html><body></body></html>")
Object.assign(globalThis, { window: dom.window, document: dom.window.document })
const { default: mermaid } = await import("mermaid")
import { DOCS } from "../data/docs"
const files = [
  "README.md",
  ...readdirSync("docs")
    .filter((file) => file.endsWith(".md"))
    .map((file) => `docs/${file}`)
]
let diagrams = 0
for (const file of files) {
  const source = readFileSync(file, "utf8")
  for (const token of marked.lexer(source)) {
    if (token.type === "code" && token.lang === "mermaid") {
      try {
        await mermaid.parse(token.text)
        diagrams++
      } catch (error) {
        throw new Error(`${file}: invalid Mermaid diagram`, { cause: error })
      }
    }
  }
  for (const match of source.matchAll(
    /!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g
  )) {
    const href = match[1]
    if (/^(https?:|mailto:|#)/.test(href)) continue
    const target = href.split("#")[0]
    const local = target.startsWith("/")
      ? resolve("public", target.slice(1))
      : resolve(dirname(file), target)
    const route =
      target.startsWith("/") &&
      (target === "/" ||
        target === "/docs" ||
        target === "/components" ||
        DOCS.some((doc) => `/docs/${doc.slug}` === target) ||
        existsSync(`components/examples/${target.slice(1)}.tsx`))
    if (!route && !existsSync(local))
      throw new Error(`${file}: broken local link ${href}`)
  }
}
for (const doc of DOCS) {
  if (!existsSync(`docs/${doc.file}`))
    throw new Error(`Missing document: ${doc.file}`)
}
console.log(
  `Validated ${files.length} Markdown files and ${diagrams} Mermaid diagrams`
)
