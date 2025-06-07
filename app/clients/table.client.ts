import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

let client: DynamoDBClient | undefined

export const getDynamoClient = () => {
    if (!client) {
        client = new DynamoDBClient({
            ...(process.env.DYNAMODB_ENDPOINT && {
                endpoint: process.env.DYNAMODB_ENDPOINT,
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
