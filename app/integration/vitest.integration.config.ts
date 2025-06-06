import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        include: ['**/*.integration.test.ts'],
        environment: 'node',
        testTimeout: 3000,
        hookTimeout: 3000,
        watch: false,
        server: {
            deps: {
                inline: ['testcontainers', 'dockerode', 'electrodb'],
            },
        },
    },
})
