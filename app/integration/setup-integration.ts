import {
    Network,
    StartedNetwork,
    type StartedTestContainer,
} from 'testcontainers'
import { setupDynamo } from './setup-dynamo'
import { setupTable } from './setup-table'
import { setupServer } from './setup-server'

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
    console.info('Table setup completed successfully')

    console.info('Setting up server')
    server = await setupServer({ endpoint: containerEndpoint, network })
    const serverPort = server.getMappedPort(3000)
    process.env.SERVER_PORT = serverPort.toString()

    console.info('Integration setup complete')
}

export const teardown = async () => {
    await dynamo?.stop()
    await server?.stop()
    process.env = originalEnv
}
