import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        include: ['**/*.integration.test.ts'],
        environment: 'node',
        testTimeout: 10000,
        hookTimeout: 10000,
        watch: false,
    },
})
