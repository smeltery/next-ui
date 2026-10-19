import type React from "react"

import { Code } from "@/code"
import type { BundledLanguage } from "shiki"

type CodeBlockProps = {
  code: string
  lang: BundledLanguage
  fileName?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang, fileName }) => {
  return (
    <div className="relative overflow-x-auto rounded-md border border-neutral-800 p-4">
      <Code code={code} lang={lang} />
    </div>
  )
}

export default CodeBlock
