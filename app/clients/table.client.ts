import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

let client: DynamoDBClient | undefined

export const getDynamoClient = (endpoint?: string) => {
    if (!client) {
        client = new DynamoDBClient({
            ...(endpoint && {
                endpoint,
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
