/// <reference types="vitest/config" />

import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    test: {
        include: ['./app/**/*.test.ts'],
        environment: 'node',
        silent: 'passed-only',
        mockReset: true,
        watch: false,
    },
})
