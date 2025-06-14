import { expect, it, vi } from 'vitest'
import { main } from './main'
import type { DynamoDBRecord } from 'aws-lambda'
import { handleTripEvent } from './handle-trip-event'

vi.mock('./handle-trip-event', () => ({
    handleTripEvent: vi.fn(),
}))
const mockHandleTripEvent = vi.mocked(handleTripEvent)

it('should process stream events for trips', async () => {
    const event = {
        Records: [
            {
                eventName: 'INSERT',
                dynamodb: {
                    NewImage: {
                        id: { S: '123' },
                        name: { S: 'Test Trip' },
                        type: { S: 'trip' },
                    },
                },
            },
            {
                eventName: 'INSERT',
                dynamodb: {
                    NewImage: {
                        id: { S: '123' },
                        type: { S: 'trip' },
                    },
                },
            },
        ] as unknown as DynamoDBRecord[],
    }

    await main(event)

    expect(mockHandleTripEvent).toHaveBeenCalledTimes(2)
    expect(mockHandleTripEvent).toHaveBeenCalledWith(event.Records[0])
    expect(mockHandleTripEvent).toHaveBeenCalledWith(event.Records[1])
})

it('should not process stream events for other entities', async () => {
    const event = {
        Records: [
            {
                eventName: 'INSERT',
                dynamodb: {
                    NewImage: {
                        id: { S: '123' },
                        type: { S: 'Other' },
                    },
                },
            },
        ] as unknown as DynamoDBRecord[],
    }

    await main(event)

    expect(mockHandleTripEvent).not.toHaveBeenCalled()
})
