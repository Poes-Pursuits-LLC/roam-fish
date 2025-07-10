import { GenericContainer, StartedNetwork, Wait } from 'testcontainers'

export const setupServer = async ({
    endpoint,
    network,
}: {
    endpoint: string
    network: StartedNetwork
}) => {
    const serverContainer = await new GenericContainer('node:20-alpine')
        .withCopyFilesToContainer([
            { source: './package.json', target: '/app/package.json' },
            { source: 'package-lock.json', target: '/app/package-lock.json' },
            { source: 'tsconfig.json', target: '/app/tsconfig.json' },
            {
                source: './app/integration/http-wrapper.ts',
                target: '/app/index.ts',
            },
        ])
        .withCopyDirectoriesToContainer([
            { source: './app', target: '/app/app' },
        ])
        .withCommand(['sh', '-c', 'cd /app && npm install && npx tsx index.ts'])
        .withExposedPorts(3000)
        .withNetwork(network)
        .withEnvironment({
            DYNAMODB_ENDPOINT: endpoint,
            TABLE_NAME: 'integration-table',
            INTEGRATION_TEST_FLAG: 'true',
        })
        .withStartupTimeout(60000)
        .withWaitStrategy(Wait.forListeningPorts())
        .withLogConsumer((stream) => {
            stream.on('data', (line) => console.log(line))
            stream.on('err', (line) => console.error(line))
            stream.on('end', () => console.log('Stream closed'))
        })
        .start()

    return serverContainer
}
