import { readFile } from "node:fs/promises"
import path from "node:path"
import Link from "next/link"
import { notFound } from "next/navigation"
import { COMPONENTS_LIST } from "@/data/component-list"
import CodeBlock from "@/components/code-block"
import { CopyButton } from "@/components/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
interface Props {
  params: Promise<{ slug: string }>
}
export function generateStaticParams() {
  return COMPONENTS_LIST.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const component = COMPONENTS_LIST.find((item) => item.slug === slug)
  return {
    title: component?.name ?? "Component not found",
    description: component?.description
  }
}
export default async function ComponentPage({ params }: Props) {
  const { slug } = await params
  const item = COMPONENTS_LIST.find((component) => component.slug === slug)
  if (!item) notFound()
  const [source, usage] = await Promise.all([
    readFile(
      path.join(process.cwd(), "components/examples", `${item.slug}.tsx`),
      "utf8"
    ),
    readFile(
      path.join(process.cwd(), "components/demos", `${item.slug}-demo.tsx`),
      "utf8"
    )
  ])
  return (
    <div className="wrap component-page">
      <Link href="/components" className="back-link">
        ← All components
      </Link>
      <h1>{item.name}</h1>
      <p className="lead">{item.description}</p>
      <div className="component-demo dark">
        <item.component />
      </div>
      <Tabs defaultValue="component">
        <TabsList>
          <TabsTrigger value="component">Component</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        {[
          ["component", source],
          ["usage", usage]
        ].map(([value, code]) => (
          <TabsContent key={value} value={value}>
            <div className="source-panel">
              <div className="flex items-center justify-between px-4 pb-3">
                <span className="text-xs">
                  {value === "component"
                    ? `${item.slug}.tsx`
                    : `${item.slug}-demo.tsx`}
                </span>
                <CopyButton copyToClipboard={code} />
              </div>
              <CodeBlock code={code} lang="tsx" />
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {item.twConfig && (
        <section className="mt-10">
          <h2 className="text-2xl">Tailwind configuration</h2>
          <p className="mt-4">
            Merge these theme extensions into your existing configuration.
          </p>
          <div className="source-panel">
            <CopyButton
              copyToClipboard={JSON.stringify(item.twConfig, null, 2)}
            />
            <CodeBlock
              code={JSON.stringify(item.twConfig, null, 2)}
              lang="json"
            />
          </div>
        </section>
      )}
      <p className="mt-8 text-sm">
        New here?{" "}
        <Link className="underline" href="/docs/quick-start">
          Read the quick start
        </Link>{" "}
        for dependencies and setup.
      </p>
    </div>
  )
}
