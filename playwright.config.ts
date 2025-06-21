import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    fullyParallel: true,
    forbidOnly: Boolean(!process.env.CI),
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: process.env.CICD_WEB_URL,
    },
    timeout: 60000,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
})
