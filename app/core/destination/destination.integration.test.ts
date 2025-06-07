import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import {
    setupTestEnvironment,
    teardownTestEnvironment,
} from '../../integration/setupIntegration'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'
import type { Destination } from '~/core/destination/destination.model'
import { DynamoDestination } from '~/core/destination/destination.dynamo'
import { createFormattedDate } from '~/utils'
import { nanoid } from 'nanoid'

describe('Destination Service Integration', () => {
    let client: ReturnType<typeof hc<AppType>>
    let serverUrl: string

    beforeAll(async () => {
        const env = await setupTestEnvironment()
        serverUrl = env.serverUrl
        client = hc<AppType>(serverUrl)
    })

    afterAll(async () => {
        await teardownTestEnvironment()
    })

    describe('Destination Retrieval', () => {
        it('should retrieve all destinations from DynamoDB', async () => {
            const testDestinations: Destination[] = [
                {
                    destinationId: nanoid(),
                    name: 'Yellowstone River',
                    province: 'Montana',
                    country: 'USA',
                    type: 'destination',
                    imageUrl: 'https://example.com/yellowstone.jpg',
                    createdAt: createFormattedDate(),
                    updatedAt: createFormattedDate(),
                },
                {
                    destinationId: nanoid(),
                    name: 'Snake River',
                    province: 'Wyoming',
                    country: 'USA',
                    type: 'destination',
                    imageUrl: 'https://example.com/snake.jpg',
                    createdAt: createFormattedDate(),
                    updatedAt: createFormattedDate(),
                },
            ]

            for (const destination of testDestinations) {
                await DynamoDestination().put(destination).go()
            }

            const response = await client.destinations.$get()
            const { destinations } = await response.json()

            expect(destinations).toBeDefined()
            expect(destinations.length).toBeGreaterThanOrEqual(
                testDestinations.length,
            )

            const foundDestinations = destinations.filter((d: Destination) =>
                testDestinations.some(
                    (td) => td.destinationId === d.destinationId,
                ),
            )
            expect(foundDestinations).toHaveLength(testDestinations.length)

            foundDestinations.forEach((destination: Destination) => {
                expect(destination).toMatchObject({
                    destinationId: expect.any(String),
                    name: expect.any(String),
                    province: expect.any(String),
                    country: expect.any(String),
                    type: 'destination',
                    imageUrl: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            })
        })
    })
})
