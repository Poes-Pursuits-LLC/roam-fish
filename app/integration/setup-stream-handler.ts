import { GenericContainer, StartedNetwork, Wait } from 'testcontainers'

export const setupStreamHandler = async ({
    endpoint,
    streamArn,
    network,
}: {
    endpoint: string
    streamArn: string
    network: StartedNetwork
}) => {
    const streamContainer = await new GenericContainer('node:20-alpine')
        .withCopyFilesToContainer([
            { source: './package.json', target: '/app/package.json' },
            { source: 'package-lock.json', target: '/app/package-lock.json' },
            { source: 'tsconfig.json', target: '/app/tsconfig.json' },
            {
                source: './app/integration/stream-handler.ts',
                target: '/app/index.ts',
            },
        ])
        .withExposedPorts(3001)
        .withWaitStrategy(Wait.forListeningPorts())
        .withCopyDirectoriesToContainer([
            { source: './app', target: '/app/app' },
        ])
        .withCommand(['sh', '-c', 'cd /app && npm install && npx tsx index.ts'])
        .withNetwork(network)
        .withEnvironment({
            DYNAMODB_ENDPOINT: endpoint,
            TABLE_NAME: 'integration-table',
            STREAM_ARN: streamArn,
        })
        .withStartupTimeout(30000)
        .withLogConsumer((stream) => {
            stream.on('data', (line) => console.log(line))
            stream.on('err', (line) => console.error(line))
            stream.on('end', () => console.log('Stream closed'))
        })
        .start()

    return streamContainer
}
