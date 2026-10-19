import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { DOCS } from "../data/docs"

test("catalog filters, empty state, and component source", async ({ page }) => {
  await page.goto("/")
  await expect(
    page.getByRole("heading", { name: "Small details. Better interfaces." })
  ).toBeVisible()
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
    page.getByRole("heading", { name: "Overview", exact: true })
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

for (const route of ["/", "/docs", "/spotlight"]) {
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
  for (const route of ["/", "/docs/quick-start", "/dynamic-grid-pattern"]) {
    await page.goto(route)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true)
  }
})
