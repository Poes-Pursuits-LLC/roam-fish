import { GenericContainer, StartedNetwork, Wait } from 'testcontainers'

// TODO: goal: copy the minimum of files from target to enable successful server.

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
                source: './app/integration/helpers/http-wrapper.ts',
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
            TEST_FLAG_INTEGRATION: 'true',
        })
        .withStartupTimeout(30000)
        .withWaitStrategy(Wait.forListeningPorts())
        .withLogConsumer((stream) => {
            stream.on('data', (line) => console.log(line))
            stream.on('err', (line) => console.error(line))
            stream.on('end', () => console.log('Stream closed'))
        })
        .start()

    return serverContainer
}
