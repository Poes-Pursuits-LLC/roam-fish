import { GenericContainer, StartedNetwork, Wait } from 'testcontainers'

export const setupDynamo = async (network: StartedNetwork) => {
    const dynamoContainer = await new GenericContainer('amazon/dynamodb-local')
        .withExposedPorts(8000)
        .withNetwork(network)
        .withNetworkAliases('dynamodb')
        .withCommand([
            '-jar',
            'DynamoDBLocal.jar',
            '-sharedDb',
            '-dbPath',
            '/home/dynamodblocal/data',
        ])
        .withWaitStrategy(Wait.forListeningPorts())
        .withLogConsumer((stream) => {
            stream.on('data', (line) => console.log(line))
            stream.on('err', (line) => console.error(line))
            stream.on('end', () => console.log('Stream closed'))
        })
        .start()

    return dynamoContainer
}
