import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  fullyParallel: false,
  workers: process.env.CI ? 2 : 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3120',
    reducedMotion: 'reduce',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {},
  },
  projects: [
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
    { name: 'tablette', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'bureau', use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: 'npm run start -- --hostname 127.0.0.1 --port 3120',
    url: 'http://127.0.0.1:3120',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
