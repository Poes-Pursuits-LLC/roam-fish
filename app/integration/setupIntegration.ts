import type { StartedTestContainer } from 'testcontainers'
import { GenericContainer, Wait } from 'testcontainers'
import { vi } from 'vitest'
import { main } from '~/server/main'
import { serve } from '@hono/node-server'

let dynamoContainer: StartedTestContainer
let server: ReturnType<typeof serve>

vi.mock('sst', () => ({
    Resource: {
        Table: {
            name: 'test-table',
        },
    },
}))

export async function setupTestEnvironment() {
    dynamoContainer = await new GenericContainer('amazon/dynamodb-local:latest')
        .withExposedPorts(8000)
        .withCommand(['-jar', 'DynamoDBLocal.jar', '-sharedDb'])
        .withEnvironment({
            AWS_ACCESS_KEY_ID: 'local',
            AWS_SECRET_ACCESS_KEY: 'local',
            AWS_REGION: 'us-east-1',
        })
        .withWaitStrategy(Wait.forLogMessage('Initializing DynamoDB Local'))
        .start()

    const dynamoPort = dynamoContainer.getMappedPort(8000)
    const dynamoEndpoint = `http://localhost:${dynamoPort}`

    process.env.DYNAMODB_ENDPOINT = dynamoEndpoint
    process.env.AWS_ACCESS_KEY_ID = 'local'
    process.env.AWS_SECRET_ACCESS_KEY = 'local'
    process.env.AWS_REGION = 'us-east-1'
    process.env.NODE_ENV = 'test'

    server = serve({
        fetch: main.fetch,
        port: 3000,
    })

    return {
        serverUrl: 'http://localhost:3000',
        dynamoEndpoint,
    }
}

export async function teardownTestEnvironment() {
    server?.close()
    await dynamoContainer?.stop()
}
