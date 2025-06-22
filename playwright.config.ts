import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    fullyParallel: true,
    forbidOnly: Boolean(!process.env.CI),
    retries: process.env.CI ? 1 : 0,
    workers: 2,
    reporter: 'html',
    use: {
        baseURL: process.env.CICD_WEB_URL,
    },
    testMatch: '**/e2e.spec.ts',
    timeout: 45000,
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
