import { expect, it, vi } from 'vitest'
import { main } from './main'
import type { DynamoDBStreamEvent } from 'aws-lambda'
import { handleTripRecord } from './handle-trip-record'

// Mock the handle-trip-record module
vi.mock('./handle-trip-record', () => ({
    handleTripRecord: vi.fn(),
}))
const mockHandleTripRecord = vi.mocked(handleTripRecord).mockResolvedValue()

it('should process stream event records for trips with MODIFY events', async () => {
    const event: DynamoDBStreamEvent = {
        Records: [
            {
                eventName: 'MODIFY',
                eventID: 'test-1',
                eventVersion: '1.0',
                eventSource: 'aws:dynamodb',
                awsRegion: 'us-east-1',
                dynamodb: {
                    ApproximateCreationDateTime: 1234567890,
                    Keys: {
                        tripId: { S: '123' },
                    },
                    NewImage: {
                        tripId: { S: '123' },
                        type: { S: 'trip' },
                        userId: { S: 'user123' },
                    },
                    SequenceNumber: '1',
                    SizeBytes: 100,
                    StreamViewType: 'NEW_AND_OLD_IMAGES',
                },
            },
            {
                eventName: 'INSERT',
                eventID: 'test-2',
                eventVersion: '1.0',
                eventSource: 'aws:dynamodb',
                awsRegion: 'us-east-1',
                dynamodb: {
                    ApproximateCreationDateTime: 1234567890,
                    Keys: {
                        tripId: { S: '456' },
                    },
                    NewImage: {
                        tripId: { S: '456' },
                        type: { S: 'trip' },
                        userId: { S: 'user123' },
                    },
                    SequenceNumber: '2',
                    SizeBytes: 100,
                    StreamViewType: 'NEW_AND_OLD_IMAGES',
                },
            },
        ],
    }

    await main(event)

    expect(mockHandleTripRecord).toHaveBeenCalledTimes(1)
    expect(mockHandleTripRecord).toHaveBeenCalledWith(event.Records[0])
})

it('should not process stream event records for entities other than trips', async () => {
    const event: DynamoDBStreamEvent = {
        Records: [
            {
                eventName: 'INSERT',
                eventID: 'test-1',
                eventVersion: '1.0',
                eventSource: 'aws:dynamodb',
                awsRegion: 'us-east-1',
                dynamodb: {
                    ApproximateCreationDateTime: 1234567890,
                    Keys: {
                        tripId: { S: '123' },
                    },
                    NewImage: {
                        tripId: { S: '123' },
                        type: { S: 'other' },
                        userId: { S: 'user123' },
                    },
                    SequenceNumber: '1',
                    SizeBytes: 100,
                    StreamViewType: 'NEW_AND_OLD_IMAGES',
                },
            },
        ],
    }

    await main(event)

    expect(mockHandleTripRecord).not.toHaveBeenCalled()
})

it('should not process stream events if type is missing', async () => {
    const event: DynamoDBStreamEvent = {
        Records: [
            {
                eventName: 'INSERT',
                eventID: 'test-1',
                eventVersion: '1.0',
                eventSource: 'aws:dynamodb',
                awsRegion: 'us-east-1',
                dynamodb: {
                    ApproximateCreationDateTime: 1234567890,
                    Keys: {
                        tripId: { S: '123' },
                    },
                    NewImage: {
                        tripId: { S: '123' },
                        userId: { S: 'user123' },
                    },
                    SequenceNumber: '1',
                    SizeBytes: 100,
                    StreamViewType: 'NEW_AND_OLD_IMAGES',
                },
            },
        ],
    }

    await main(event)

    expect(mockHandleTripRecord).not.toHaveBeenCalled()
})
