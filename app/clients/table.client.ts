import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

let client: DynamoDBClient | undefined

export function getDynamoClient() {
    if (!client) {
        client = new DynamoDBClient()
    }
    return client
}
