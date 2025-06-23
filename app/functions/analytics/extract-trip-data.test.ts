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
        netCostChange: 0,
        currentBudgetTotal: 0,
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
    expect(result?.netCostChange).toBe(245.5)
    expect(result?.currentBudgetTotal).toBe(245.5)
})

it('should return null if no userId is present', () => {
    const record = {
        dynamodb: {
            NewImage: {
                tripId: { S: '123' },
            },
        },
    } as DynamoDBRecord

    const result = extractTripData(record)
    expect(result).toBeNull()
})

it('should calculate net cost change from budgetList correctly', () => {
    const tripRecord = {
        dynamodb: {
            OldImage: {
                tripId: { S: '123' },
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
            NewImage: {
                tripId: { S: '123' },
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
                                price: { S: '50.00' }, // Price increased
                            },
                        },
                        {
                            M: {
                                id: { S: '2' },
                                name: { S: 'Lodging' },
                                price: { S: '180.00' }, // Price decreased
                            },
                        },
                        {
                            M: {
                                id: { S: '3' },
                                name: { S: 'New Item' },
                                price: { S: '100.00' }, // New item added
                            },
                        },
                    ],
                },
            },
        },
    } as DynamoDBRecord

    const result = extractTripData(tripRecord)
    expect(result).toEqual({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-03-20',
        duration: TripDurationEnum.Weekend,
        netCostChange: 84.5,
        currentBudgetTotal: 330.0,
    })
})

it('should handle missing budgetList in old image', () => {
    const tripRecord = {
        dynamodb: {
            OldImage: {
                tripId: { S: '123' },
                userId: { S: 'user123' },
                destinationName: { S: 'Yellowstone' },
                startDate: { S: '2024-03-20' },
                duration: { S: TripDurationEnum.Weekend },
            },
            NewImage: {
                tripId: { S: '123' },
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
                    ],
                },
            },
        },
    } as DynamoDBRecord

    const result = extractTripData(tripRecord)
    expect(result).toEqual({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-03-20',
        duration: TripDurationEnum.Weekend,
        netCostChange: 45.5, // New cost - 0 (no old cost) = 45.50
        currentBudgetTotal: 45.5,
    })
})

it('should handle missing budgetList in new image', () => {
    const tripRecord = {
        dynamodb: {
            OldImage: {
                tripId: { S: '123' },
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
                    ],
                },
            },
            NewImage: {
                tripId: { S: '123' },
                userId: { S: 'user123' },
                destinationName: { S: 'Yellowstone' },
                startDate: { S: '2024-03-20' },
                duration: { S: TripDurationEnum.Weekend },
            },
        },
    } as DynamoDBRecord

    const result = extractTripData(tripRecord)
    expect(result).toEqual({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-03-20',
        duration: TripDurationEnum.Weekend,
        netCostChange: -45.5, // 0 (no new cost) - 45.50 (old cost) = -45.50
        currentBudgetTotal: 0,
    })
})

it('should handle identical budgetList in old and new image', () => {
    const tripRecord = {
        dynamodb: {
            OldImage: {
                tripId: { S: '123' },
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
            NewImage: {
                tripId: { S: '123' },
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
    expect(result).toEqual({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-03-20',
        duration: TripDurationEnum.Weekend,
        netCostChange: 0, // Same cost in both images = no change
        currentBudgetTotal: 245.5,
    })
})

it('should handle INSERT events (trip creation) correctly', () => {
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
    expect(result).toEqual({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-03-20',
        duration: TripDurationEnum.Weekend,
        netCostChange: 245.5, // New cost - 0 (no old cost) = 245.50
        currentBudgetTotal: 245.5,
    })
})
