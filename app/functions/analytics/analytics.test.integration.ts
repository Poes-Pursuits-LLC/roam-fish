import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoUserAnalytics } from '~/core/analytics/user-analytics.dynamo'
import { TripDurationEnum } from '~/core/trip/trip.model'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import { main } from './main'
import type { DynamoDBStreamEvent } from 'aws-lambda'

// Local DynamoDB setup
const dynamoClient = new DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'local',
    credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
})

const docClient = DynamoDBDocumentClient.from(dynamoClient)

describe('Analytics Stream Integration', () => {
    const analytics = DynamoUserAnalytics()
    const userId = 'test-user-123'

    beforeAll(async () => {
        // Ensure tables exist with streams enabled
        // This would typically be done in your SST config
        // For local testing, you can use DynamoDB Local with streams
    })

    afterAll(async () => {
        // Clean up test data
        // You might want to delete the test user's analytics
    })

    it('should process a new trip and update analytics', async () => {
        // Create a test trip
        const testTrip = {
            tripId: 'test-trip-123',
            userId,
            destinationName: 'Yellowstone',
            startDate: '2024-03-20',
            duration: TripDurationEnum.Weekend,
            budgetList: [
                {
                    id: '1',
                    name: 'Fishing License',
                    price: '45.50',
                },
                {
                    id: '2',
                    name: 'Lodging',
                    price: '200.00',
                },
            ],
            type: 'trip',
            status: 'PLANNED',
            headcount: '2',
            packingList: [],
            checkList: [],
        }

        // Insert the trip (this will trigger the stream)
        await docClient.send(
            new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: testTrip,
            }),
        )

        // Simulate the stream event
        const streamEvent: DynamoDBStreamEvent = {
            Records: [
                {
                    eventName: 'INSERT' as const,
                    eventID: 'test-event-1',
                    eventVersion: '1.0',
                    eventSource: 'aws:dynamodb',
                    awsRegion: 'local',
                    dynamodb: {
                        ApproximateCreationDateTime: new Date().getTime(),
                        Keys: {
                            tripId: { S: testTrip.tripId },
                        },
                        NewImage: {
                            tripId: { S: testTrip.tripId },
                            userId: { S: testTrip.userId },
                            destinationName: { S: testTrip.destinationName },
                            startDate: { S: testTrip.startDate },
                            duration: { S: testTrip.duration },
                            budgetList: {
                                L: testTrip.budgetList.map((item) => ({
                                    M: {
                                        id: { S: item.id },
                                        name: { S: item.name },
                                        price: { S: item.price },
                                    },
                                })),
                            },
                            type: { S: testTrip.type },
                        },
                        SequenceNumber: '1',
                        SizeBytes: 100,
                        StreamViewType: 'NEW_AND_OLD_IMAGES',
                    },
                },
            ],
        }

        // Process the stream event
        await main(streamEvent)

        // Verify analytics were updated
        const userAnalytics = await analytics.get({ userId }).go()
        expect(userAnalytics.data).toEqual({
            userId,
            totalDaysFishing: 2,
            uniqueDestinations: ['Yellowstone'],
            totalTripCost: 245.5,
            tripCount: 1,
        })
    })

    it('should handle multiple trips for the same user', async () => {
        // Create another test trip
        const secondTrip = {
            tripId: 'test-trip-456',
            userId,
            destinationName: 'Yellowstone', // Same destination
            startDate: '2024-04-20',
            duration: TripDurationEnum.Week, // 7 days
            budgetList: [
                {
                    id: '1',
                    name: 'Fishing License',
                    price: '60.00',
                },
            ],
            type: 'trip',
            status: 'PLANNED',
            headcount: '2',
            packingList: [],
            checkList: [],
        }

        // Insert the second trip
        await docClient.send(
            new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: secondTrip,
            }),
        )

        // Simulate the stream event
        const streamEvent: DynamoDBStreamEvent = {
            Records: [
                {
                    eventName: 'INSERT' as const,
                    eventID: 'test-event-2',
                    eventVersion: '1.0',
                    eventSource: 'aws:dynamodb',
                    awsRegion: 'local',
                    dynamodb: {
                        ApproximateCreationDateTime: new Date().getTime(),
                        Keys: {
                            tripId: { S: secondTrip.tripId },
                        },
                        NewImage: {
                            tripId: { S: secondTrip.tripId },
                            userId: { S: secondTrip.userId },
                            destinationName: { S: secondTrip.destinationName },
                            startDate: { S: secondTrip.startDate },
                            duration: { S: secondTrip.duration },
                            budgetList: {
                                L: secondTrip.budgetList.map((item) => ({
                                    M: {
                                        id: { S: item.id },
                                        name: { S: item.name },
                                        price: { S: item.price },
                                    },
                                })),
                            },
                            type: { S: secondTrip.type },
                        },
                        SequenceNumber: '2',
                        SizeBytes: 100,
                        StreamViewType: 'NEW_AND_OLD_IMAGES',
                    },
                },
            ],
        }

        // Process the stream event
        await main(streamEvent)

        // Verify analytics were updated correctly
        const userAnalytics = await analytics.get({ userId }).go()
        expect(userAnalytics.data).toEqual({
            userId,
            totalDaysFishing: 9, // 2 days + 7 days
            uniqueDestinations: ['Yellowstone'], // Still just one unique destination
            totalTripCost: 305.5, // 245.50 + 60.00
            tripCount: 2,
        })
    })
})
