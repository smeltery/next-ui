import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { DOCS } from "../data/docs"

test("catalog filters, empty state, and component source", async ({ page }) => {
  await page.goto("/")
  await expect(
    page.getByRole("heading", { name: "Better React UI. Copy. Paste. Ship." })
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Explore 9 components", exact: true })
  ).toBeInViewport()
  await expect(
    page.getByRole("searchbox", { name: "Search components" })
  ).toHaveCount(0)
  await page
    .getByRole("link", { name: "Explore 9 components", exact: true })
    .click()
  await expect(page).toHaveURL(/\/components$/)
  await page.getByRole("button", { name: "Borders & light" }).click()
  await expect(page.locator(".component-card")).toHaveCount(5)
  await page
    .getByRole("searchbox", { name: "Search components" })
    .fill("missing-component")
  await expect(
    page.getByRole("heading", { name: "No components found." })
  ).toBeVisible()
  await page.getByRole("button", { name: "Reset filters" }).click()
  await expect(page.locator(".component-card")).toHaveCount(9)
  await page.locator('.component-description[href="/spotlight"]').click()
  await expect(
    page.getByRole("heading", { name: "Spotlight", exact: true })
  ).toBeVisible()
  await page.getByRole("tab", { name: "Usage", exact: true }).click()
  await expect(page.getByRole("tabpanel")).toContainText("SpotlightDemo")
  await expect(page.getByRole("button", { name: "Copy code" })).toBeVisible()
})

test("search supports no-results, keyboard selection, and Escape", async ({
  page
}) => {
  await page.goto("/")
  await page
    .getByRole("button", { name: "Search components and guides", exact: true })
    .click()
  const search = page.getByRole("searchbox", {
    name: "Search components and guides"
  })
  await search.fill("nothing-here")
  await expect(
    page.getByRole("heading", { name: "No matches this time." })
  ).toBeVisible()
  await page.getByRole("button", { name: "Reset search" }).click()
  await search.fill("Quick start")
  await search.press("ArrowDown")
  await page.keyboard.press("Enter")
  await expect(page).toHaveURL(/docs\/quick-start/)
  await page
    .getByRole("button", { name: "Search documentation", exact: true })
    .click()
  await page.keyboard.press("Escape")
  await expect(page.locator(".search-dialog")).not.toBeVisible()
  await expect(
    page.getByRole("button", { name: "Search documentation", exact: true })
  ).toBeFocused()
})

test("mobile navigation closes and restores scrolling", async ({
  page,
  isMobile
}) => {
  test.skip(!isMobile, "Mobile menu is hidden on desktop")
  await page.goto("/")
  await page.getByRole("button", { name: "Menu", exact: true }).click()
  await expect(page.getByRole("dialog", { name: "What’s next?" })).toBeVisible()
  await expect(page.getByRole("dialog", { name: "What’s next?" })).toHaveCSS(
    "opacity",
    "1"
  )
  await page.getByRole("button", { name: "Close navigation" }).click()
  await expect(
    page.getByRole("button", { name: "Menu", exact: true })
  ).toBeFocused()
  await page.getByRole("button", { name: "Menu", exact: true }).click()
  await page
    .locator(".mobile-resource-grid")
    .getByRole("link", { name: /Getting started/ })
    .click()
  await expect(page).toHaveURL(/docs\/quick-start/)
  await expect(page.locator("#mobile-menu")).not.toBeVisible()
  expect(
    await page.evaluate(() => document.documentElement.style.overflow)
  ).toBe("")
})

test("docs render Mermaid, navigate, and keep working local links", async ({
  page,
  request
}) => {
  await page.goto("/docs")
  await expect(
    page.getByRole("heading", {
      name: "Small components. Possibilities open.",
      exact: true
    })
  ).toBeVisible()
  await page
    .getByRole("heading", { name: "How it works", exact: true })
    .scrollIntoViewIfNeeded()
  await expect(page.locator(".doc-diagram svg")).toBeVisible({ timeout: 30000 })
  for (const doc of DOCS) {
    const response = await request.get(`/docs/${doc.slug}`)
    expect(response.status()).toBe(200)
  }
  const response = await request.get("/does-not-exist")
  expect(response.status()).toBe(404)
  for (const asset of ["/brand/og.png", "/brand/mark.svg", "/icon.svg"]) {
    expect((await request.get(asset)).status()).toBe(200)
  }
})

for (const route of [
  "/",
  "/components",
  "/brand",
  "/docs",
  "/docs/api",
  "/spotlight"
]) {
  test(`accessible and no overflow: ${route}`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze()
    expect(results.violations).toEqual([])
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true)
  })
}

test("320px reflow and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  for (const route of [
    "/",
    "/components",
    "/brand",
    "/docs/api",
    "/docs/quick-start",
    "/dynamic-grid-pattern"
  ]) {
    await page.goto(route)
    const brand = await page.locator("header .brand").boundingBox()
    const search = await page.locator(".header-search-trigger").boundingBox()
    expect(brand && search && brand.x + brand.width <= search.x).toBe(true)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true)
  }
})

test("clipboard success and failure feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.goto("/spotlight")
  await page.getByRole("button", { name: "Copy code" }).click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain("Spotlight")
  await page.goto("/docs")
  const copy = page
    .getByRole("button", { name: "Copy as Markdown" })
    .filter({ visible: true })
  await copy.click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain("# Overview")
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new Error("denied"))
    })
  })
  await page
    .getByRole("button", { name: "Markdown copied" })
    .filter({ visible: true })
    .click()
  await expect(
    page
      .getByRole("textbox", { name: "Page Markdown" })
      .filter({ visible: true })
  ).toHaveValue(/# Overview/)
})

test("marketing FAQ and closing CTA lead to the catalog", async ({ page }) => {
  await page.goto("/")
  await page
    .locator(".marketing-faq summary")
    .filter({ hasText: "Do I need to install a component package?" })
    .click()
  await expect(page.locator(".marketing-faq details[open]")).toContainText(
    "Copy the source"
  )
  await page.getByRole("link", { name: "Find your first component" }).click()
  await expect(page).toHaveURL(/\/components$/)
})

test("documentation drawer and code-copy work", async ({
  page,
  isMobile,
  context
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.goto("/docs/api")
  if (isMobile) {
    await page.getByRole("button", { name: "Menu", exact: true }).click()
    const drawer = page.getByRole("dialog", {
      name: "Documentation navigation"
    })
    await expect(drawer).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(drawer).not.toBeVisible()
    await expect(
      page.getByRole("button", { name: "Menu", exact: true })
    ).toBeFocused()
    await page.getByRole("button", { name: "Menu", exact: true }).click()
    await drawer.getByRole("link", { name: "Quick start", exact: true }).click()
    await expect(page).toHaveURL(/docs\/quick-start/)
    await expect(drawer).not.toBeVisible()
    await page.goto("/docs/api")
  }
  await page.getByRole("button", { name: "Copy code example" }).first().click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain("spotlightColor")
})

test("brand palette copies colors and recovers from clipboard denial", async ({
  page,
  context
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.goto("/brand")
  await page.getByRole("button", { name: "Copy Canvas #080808" }).click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe("#080808")
  await expect(page.getByRole("status")).toHaveText("Canvas color copied.")
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new Error("denied"))
    })
  )
  await page.getByRole("button", { name: "Copy Ink #f5f5f5" }).click()
  await expect(
    page.getByRole("textbox", { name: "Color hex value" })
  ).toHaveValue("#f5f5f5")
})

test("brand route preserves the old URL and downloads original assets", async ({
  page,
  request
}) => {
  await page.goto("/docs/brand")
  await expect(page).toHaveURL(/\/brand$/)
  await page.getByRole("link", { name: "Get the assets" }).click()
  await expect(page).toHaveURL(/\/brand#downloads$/)
  const download = page.waitForEvent("download")
  await page.getByRole("link", { name: "Download vector mark" }).click()
  expect((await download).suggestedFilename()).toBe("mark.svg")
  for (const asset of ["mark.svg", "og.png", "icon.png"]) {
    const response = await request.get(`/brand/${asset}`)
    expect(response.status()).toBe(200)
    expect(response.headers()["content-type"]).toContain(
      asset.endsWith("svg") ? "image/svg+xml" : "image/png"
    )
  }
})
