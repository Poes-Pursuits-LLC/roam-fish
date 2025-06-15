import type { DynamoDBStreamEvent } from 'aws-lambda'
import { handleTripRecord } from './handle-trip-record'

export const main = async (event: DynamoDBStreamEvent) => {
    for (const record of event.Records) {
        const entityType = record.dynamodb?.NewImage?.type?.S

        switch (entityType) {
            case 'trip':
                await handleTripRecord(record)
                break
            default:
                return
        }
    }
}
