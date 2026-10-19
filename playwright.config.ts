import { defineConfig, devices } from "@playwright/test"
export default defineConfig({
  testDir: "./tests",
  testIgnore: "**/unit/**",
  timeout: 45000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: { baseURL: "http://127.0.0.1:3188", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" }
    }
  ],
  webServer: {
    command: "bun run start --hostname 127.0.0.1 --port 3188",
    url: "http://127.0.0.1:3188",
    reuseExistingServer: !process.env.CI,
    timeout: 60000
  }
})
