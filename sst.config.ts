/// <reference path="./.sst/platform/config.d.ts" />

import { readdirSync } from 'fs'

export default $config({
    app(input) {
        return {
            name: 'roam-fish',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            protect: ['production'].includes(input?.stage),
            home: 'aws',
        }
    },
    async run() {
        const outputs = {}

        for (const value of readdirSync('./infrastructure/')) {
            const result = await import('./infrastructure/' + value)
            if (result.outputs) Object.assign(outputs, result.outputs)
        }

        return outputs
    },
})
