/// <reference types="vitest/config" />

import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
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
                    include: ['./app/**/*.ui.test.tsx'],
                    environment: 'jsdom',
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
                    hookTimeout: 120000,
                    globals: true,
                },
            },
        ],
    },
})
