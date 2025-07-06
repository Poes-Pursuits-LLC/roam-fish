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
        const budgetConfig = await import('./infrastructure/configs')

        $transform(sst.aws.Function, (args, _opts, name) => {
            args.tags ??= {
                'function:name': `${$app.name}-${$app.stage}-${name}`,
            }
            args = { ...args, ...budgetConfig }
        })

        const outputs = {}

        const fs = await import('fs')

        for (const value of fs.readdirSync('./infrastructure/')) {
            const result = await import('./infrastructure/' + value)
            if (result.outputs) Object.assign(outputs, result.outputs)
        }

        return outputs
    },
})
