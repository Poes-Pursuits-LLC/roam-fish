import {
    Network,
    StartedNetwork,
    type StartedTestContainer,
} from 'testcontainers'
import { setupDynamo } from './helpers/setup-dynamo'
import { setupTable } from './helpers/set-table'
import { setupServer } from './helpers/setup-server'

let network: StartedNetwork | undefined
let dynamo: StartedTestContainer | undefined
let server: StartedTestContainer | undefined
const originalEnv = process.env

export const setup = async () => {
    console.info('Setting up network')
    network = await new Network().start()

    console.info('Setting up dynamo')
    dynamo = await setupDynamo(network)
    const host = dynamo.getHost()
    const port = dynamo.getMappedPort(8000)
    const hostEndpoint = `http://${host}:${port}`
    const containerEndpoint = `http://dynamodb:8000`

    console.info('Setting up table')
    await setupTable(hostEndpoint)
    console.info(
        'Table setup completed successfully for endpoint:',
        hostEndpoint,
    )
    // Adding a delay to ensure table is ready in DynamoDB
    console.info('Waiting for table to be fully ready in DynamoDB...')
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.info('Proceeding to server setup after delay.')

    console.info('Setting up server')
    server = await setupServer({ endpoint: containerEndpoint, network })
    const serverPort = server.getMappedPort(3000)
    process.env.SERVER_PORT = serverPort.toString()

    console.info('Integration setup complete')
}

export const teardown = () => {
    console.info('Tearing down network')
    network?.stop()
    dynamo?.stop()
    server?.stop()
    process.env = originalEnv
}
