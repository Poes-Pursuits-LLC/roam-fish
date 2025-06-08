import {
    DockerComposeEnvironment,
    Wait,
    type StartedDockerComposeEnvironment,
} from 'testcontainers'
import { createTestTable } from './create-test-table'
import { serve, type ServerType } from '@hono/node-server'
import { main } from '~/server/main'

const oldEnv = {
    ...process.env,
}

process.env.DYNAMO_ENDPOINT = 'http://localhost:8000'
process.env.AWS_ACCESS_KEY_ID = 'local'
process.env.AWS_SECRET_ACCESS_KEY = 'local'
process.env.AWS_REGION = 'us-east-1'

let dynamo: StartedDockerComposeEnvironment | undefined
let server: ServerType | undefined

export const setupIntegrationEnvironment = async () => {
    try {
        const composeFilePath = './app/integration'
        const composeFile = 'docker-compose.yml'

        dynamo = await new DockerComposeEnvironment(
            composeFilePath,
            composeFile,
        )
            .withWaitStrategy(
                'dynamodb-local',
                Wait.forLogMessage('Initializing DynamoDB Local'),
            )
            .up()

        server = serve({
            fetch: main.fetch,
            port: 3000,
        })

        await createTestTable()

        return {
            serverUrl: 'http://localhost:3000',
        }
    } catch (error) {
        console.error(error)
        throw new Error((error as Error).message)
    }
}

export const tearDownIntegrationEnvironment = async () => {
    try {
        await dynamo?.down()
        server?.close()
        process.env = oldEnv
    } catch (error) {
        console.error(error)
        throw new Error((error as Error).message)
    }
}
