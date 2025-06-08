import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        include: ['**/*.integration.test.ts'],
        environment: 'node',
        testTimeout: 20000,
        hookTimeout: 20000,
        watch: false,
    },
})
