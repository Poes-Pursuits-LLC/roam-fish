import {
    CreateTableCommand,
    DeleteTableCommand,
    ListTablesCommand,
} from '@aws-sdk/client-dynamodb'
import { getDynamoClient } from '~/clients/table.client'

export const createTestTable = async () => {
    console.info('Creating test integration table...')
    const client = getDynamoClient()
    const tableName = 'integration-table'

    const { TableNames } = await client!.send(new ListTablesCommand({}))
    if (TableNames?.includes(tableName)) {
        await client!.send(new DeleteTableCommand({ TableName: tableName }))
        console.info('Deleting old table...')
    }

    await client!.send(
        new CreateTableCommand({
            TableName: tableName,
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
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        }),
    )
}
