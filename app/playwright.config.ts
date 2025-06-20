import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './app/e2e',
    fullyParallel: true,
    forbidOnly: Boolean(!process.env.CI),
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: 'html',
    use: {
        baseURL: `${process.env.WEB_URL!}`,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
    ],
})
