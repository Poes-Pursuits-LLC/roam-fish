import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        include: ['**/*.integration.test.ts'],
        environment: 'node',
        testTimeout: 5000,
        hookTimeout: 5000,
        watch: false,
        server: {
            deps: {
                inline: ['testcontainers', 'dockerode', 'electrodb'],
            },
        },
    },
})
