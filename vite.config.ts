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
                    environment: 'node',
                    mockReset: true,
                },
            },
            {
                plugins: [tailwindcss(), tsconfigPaths()],
                test: {
                    name: 'ui-tests',
                    include: ['./app/**/*.ui.test.ts'],
                    environment: 'jsdom',
                    mockReset: true,
                },
            },
            {
                extends: true,
                test: {
                    name: 'integration-tests',
                    include: ['**/*.integration.test.ts'],
                    globalSetup: './app/integration/setup-integration.ts',
                    environment: 'node',
                    testTimeout: 20000,
                    hookTimeout: 20000,
                },
            },
        ],
    },
})
