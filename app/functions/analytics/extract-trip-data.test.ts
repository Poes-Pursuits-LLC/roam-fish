import type { DynamoDBRecord } from 'aws-lambda'
import { extractTripData } from './extract-trip-data'
import { expect, it } from 'vitest'
import { TripDurationEnum } from '~/core/trip/trip.model'

it('should extract basic trip data correctly', () => {
    const tripRecord = {
        dynamodb: {
            NewImage: {
                tripId: { S: '123' },
                type: { S: 'trip' },
                userId: { S: 'user123' },
                destinationName: { S: 'Yellowstone' },
                startDate: { S: '2024-03-20' },
                duration: { S: TripDurationEnum.Weekend },
                budgetList: { L: [] },
            },
        },
    } as DynamoDBRecord

    const result = extractTripData(tripRecord)
    expect(result).toEqual({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-03-20',
        duration: TripDurationEnum.Weekend,
        totalCost: 0,
    })
})

it('should calculate total cost from budgetList correctly', () => {
    const tripRecord = {
        dynamodb: {
            NewImage: {
                tripId: { S: '123' },
                type: { S: 'trip' },
                userId: { S: 'user123' },
                destinationName: { S: 'Yellowstone' },
                startDate: { S: '2024-03-20' },
                duration: { S: TripDurationEnum.Weekend },
                budgetList: {
                    L: [
                        {
                            M: {
                                id: { S: '1' },
                                name: { S: 'Fishing License' },
                                price: { S: '45.50' },
                            },
                        },
                        {
                            M: {
                                id: { S: '2' },
                                name: { S: 'Lodging' },
                                price: { S: '200.00' },
                            },
                        },
                    ],
                },
            },
        },
    } as DynamoDBRecord

    const result = extractTripData(tripRecord)
    expect(result?.totalCost).toBe(245.5)
})
