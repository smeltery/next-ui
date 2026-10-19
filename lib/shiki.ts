import { codeToHtml, type BundledLanguage, type BundledTheme } from "shiki"

export function highlight(
  code: string,
  theme: BundledTheme,
  lang: BundledLanguage
) {
  // Shiki caches its highlighter and loads themes and languages on demand.
  return codeToHtml(code, {
    theme,
    lang,
    rootStyle: "background-color:transparent"
  })
}
