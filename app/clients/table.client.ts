import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

let client: DynamoDBClient | undefined

export const getDynamoClient = () => {
    if (!client) {
        client = new DynamoDBClient({
            ...(process.env.DYNAMO_ENDPOINT && {
                endpoint: process.env.DYNAMO_ENDPOINT,
                region: 'us-east-1',
                credentials: {
                    accessKeyId: 'local',
                    secretAccessKey: 'local',
                },
            }),
        })
    }
    return client
}
