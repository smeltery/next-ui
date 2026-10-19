import type { Highlighter, Lang, Theme } from "shiki"
import { getHighlighter, renderToHtml } from "shiki"

let highlighter: Promise<Highlighter> | undefined

export async function highlight(code: string, theme: Theme, lang: Lang) {
  // Share initialization across concurrent static pages and register both source formats.
  highlighter ??= getHighlighter({ langs: ["tsx", "json"], theme })
  const instance = await highlighter
  if (!instance.getLoadedLanguages().includes(lang)) {
    await instance.loadLanguage(lang)
  }
  const tokens = instance.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false
  })
  return renderToHtml(tokens, { bg: "transparent" })
}
