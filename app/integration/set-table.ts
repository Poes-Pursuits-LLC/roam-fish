import {
    CreateTableCommand,
    DescribeTableCommand,
    DynamoDBClient,
} from '@aws-sdk/client-dynamodb'

export const setupTable = async (endpoint: string) => {
    const client = new DynamoDBClient({
        endpoint,
        region: 'us-east-1',
        credentials: {
            accessKeyId: 'dummy',
            secretAccessKey: 'dummy',
        },
    })
    const table = 'integration-table'

    try {
        await client.send(new DescribeTableCommand({ TableName: table }))
        console.info('Table already exists:', table)
    } catch (error: unknown) {
        if ((error as { name?: string }).name === 'ResourceNotFoundException') {
            console.info('Table not found, creating table:', table)
            await client.send(
                new CreateTableCommand({
                    TableName: table,
                    AttributeDefinitions: [
                        { AttributeName: 'pk', AttributeType: 'S' },
                        { AttributeName: 'sk', AttributeType: 'S' },
                        { AttributeName: 'gsi1pk', AttributeType: 'S' },
                        { AttributeName: 'gsi1sk', AttributeType: 'S' },
                    ],
                    KeySchema: [
                        { AttributeName: 'pk', KeyType: 'HASH' },
                        { AttributeName: 'sk', KeyType: 'RANGE' },
                    ],
                    GlobalSecondaryIndexes: [
                        {
                            IndexName: 'gsi1pk-gsi1sk-index',
                            KeySchema: [
                                { AttributeName: 'gsi1pk', KeyType: 'HASH' },
                                { AttributeName: 'gsi1sk', KeyType: 'RANGE' },
                            ],
                            Projection: { ProjectionType: 'ALL' },
                            ProvisionedThroughput: {
                                ReadCapacityUnits: 5,
                                WriteCapacityUnits: 5,
                            },
                        },
                    ],
                    BillingMode: 'PAY_PER_REQUEST',
                }),
            )
        } else {
            throw error
        }
    }
}
