import { highlight } from "@/lib/shiki"
import type { Lang } from "shiki"

type CodeProps = {
  code: string
  lang: Lang
}

export const Code = async ({ code, lang }: CodeProps) => {
  const component = await highlight(code, "github-dark", lang)

  return (
    <div
      className="relative overflow-auto"
      style={{ maxWidth: "100%", position: "relative" }}
    >
      <div
        className="p-4"
        style={{ whiteSpace: "pre", overflowX: "auto" }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML comes only from reviewed local source and trusted rendering.
        dangerouslySetInnerHTML={{ __html: component }}
      />
    </div>
  )
}
