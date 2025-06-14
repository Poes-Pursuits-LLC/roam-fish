import type { DynamoDBStreamEvent } from 'aws-lambda'
import { handleTripEvent } from './handle-trip-event'

export const main = async (event: DynamoDBStreamEvent) => {
    for (const record of event.Records) {
        const entityType = record.dynamodb?.NewImage?.type.S

        switch (entityType) {
            case 'trip':
                await handleTripEvent(record)
                break
            default:
                return
        }
    }
}
