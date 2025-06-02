import type {} from './.sst/platform/config'

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

        const fs = await import('fs')

        for (const value of fs.readdirSync('./infrastructure/')) {
            const result = await import('./infrastructure/' + value)
            if (result.outputs) Object.assign(outputs, result.outputs)
        }

        return outputs
    },
})
