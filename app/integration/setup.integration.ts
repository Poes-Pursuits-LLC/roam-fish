import {
    DockerComposeEnvironment,
    Wait,
    type StartedDockerComposeEnvironment,
} from 'testcontainers'
import { createTestTable } from './create-test-table'

const oldEnv = {
    ...process.env,
}

process.env.TABLE_NAME = 'integration-table'
process.env.SERVER_URL = 'http://localhost:3000'
process.env.DYNAMO_ENDPOINT = 'http://127.0.0.1:8000'
process.env.AWS_ACCESS_KEY_ID = 'local'
process.env.AWS_SECRET_ACCESS_KEY = 'local'
process.env.AWS_REGION = 'us-east-1'

let dynamo: StartedDockerComposeEnvironment | undefined

export const setup = async () => {
    const composeFilePath = './app/integration'
    const composeFile = 'docker-compose.yml'

    console.info('Starting DynamoDB Local...')
    dynamo = await new DockerComposeEnvironment(composeFilePath, composeFile)
        .withWaitStrategy(
            'dynamodb-local',
            Wait.forHealthCheck().withStartupTimeout(30000),
        )
        .up()

    console.info('DynamoDB Local is healthy!')

    console.info('Creating test table...')
    await createTestTable()
    console.info('Running integration tests!')
}

export const teardown = async () => {
    try {
        if (dynamo) {
            console.info('Stopping DynamoDB Local...')
            await dynamo.down()
        }
        process.env = oldEnv
    } catch (error) {
        console.error('Error during teardown:', error)
        throw error
    }
}
