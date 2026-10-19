import { execFileSync } from "node:child_process"
import { readFileSync, existsSync } from "node:fs"
import { dirname } from "node:path"
const config = JSON.parse(
  readFileSync(process.argv[2] || "scripts/budgets.json", "utf8")
)
const files = [
  ...new Set(
    execFileSync(
      "git",
      ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
      { encoding: "utf8" }
    )
      .split("\0")
      .filter(Boolean)
  )
].filter(
  (file) =>
    existsSync(file) &&
    !config.exclude.some(
      (prefix: string) => file === prefix || file.startsWith(prefix)
    ) &&
    /\.(tsx?|m?js|css|md|json|ya?ml|toml|sh)$/.test(file)
)
const directories = new Map<string, number>()
const failures: string[] = []
for (const file of files) {
  const lines = readFileSync(file, "utf8").trimEnd().split("\n").length
  const budget = config.files[file]?.limit ?? config.defaultLines
  if (lines > budget)
    failures.push(`${file}: ${lines} lines > budget ${budget}`)
  const directory = dirname(file)
  directories.set(directory, (directories.get(directory) || 0) + 1)
}
for (const [directory, count] of directories) {
  const budget = config.directories[directory]?.limit ?? config.defaultFiles
  if (count > budget)
    failures.push(`${directory}: ${count} direct files > budget ${budget}`)
}
if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log(
  `LOC budgets passed: ${files.length} files, ${directories.size} directories`
)
