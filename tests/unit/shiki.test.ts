import { expect, test } from "bun:test"
import { highlight } from "../../lib/shiki"

test("concurrent component and configuration highlighting registers both languages", async () => {
  const [component, configuration] = await Promise.all([
    highlight("export const Demo = () => <div />", "github-dark", "tsx"),
    highlight(
      '{"animation": "meteor 5s linear infinite"}',
      "github-dark",
      "json"
    )
  ])
  expect(component).toContain("Demo")
  expect(configuration).toContain("meteor 5s linear infinite")
  expect(await highlight('{"duration": 5}', "github-dark", "json")).toContain(
    "duration"
  )
})
