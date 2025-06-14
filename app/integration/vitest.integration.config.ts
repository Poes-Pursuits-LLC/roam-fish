import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        include: ['**/*.integration.test.ts'],
        environment: 'node',
        testTimeout: 30000,
        hookTimeout: 30000,
        watch: false,
        passWithNoTests: true,
        globalSetup: './app/integration/setup.integration.ts'
    },
})
