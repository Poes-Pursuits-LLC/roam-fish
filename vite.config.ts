/// <reference types="vitest/config" />

import { sentryVitePlugin } from '@sentry/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        tailwindcss(),
        reactRouter(),
        tsconfigPaths(),
        sentryVitePlugin({
            org: 'roam-fish',
            project: 'roam-fish',
            telemetry: false,
        }),
    ],
    test: {
        watch: false,
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit-tests',
                    include: ['./app/**/*.test.ts'],
                    exclude: ['**/*.integration.test.ts'],
                    mockReset: true,
                },
            },
            {
                plugins: [tailwindcss(), tsconfigPaths()],
                test: {
                    name: 'ui-tests',
                    include: ['./app/**/*.spec.tsx'],
                    environment: 'jsdom',
                    setupFiles: ['./app/ui/ui-test-setup.ts'],
                    globals: true,
                    mockReset: true,
                },
            },
            {
                plugins: [tsconfigPaths()],
                test: {
                    name: 'integration-tests',
                    include: ['**/*.integration.test.ts'],
                    globalSetup: './app/integration/setup-integration.ts',
                    testTimeout: 10000,
                    hookTimeout: 60000,
                    globals: true,
                },
            },
        ],
    },
    build: {
        sourcemap: true,
    },
})
