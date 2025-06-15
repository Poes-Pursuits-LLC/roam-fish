import { it, expect, beforeAll, afterAll } from 'vitest'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'
import type { Destination } from '~/core/destination/destination.model'
import { DynamoDestination } from '~/core/destination/destination.dynamo'
import { createFormattedDate } from '~/utils'
import { nanoid } from 'nanoid'
import { setupServer, teardownServer } from '~/integration/setup-server'

const client = hc<AppType>(process.env.SERVER_URL!)

beforeAll(async () => {
    await setupServer()
})

afterAll(async () => {
    await teardownServer()
})

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

    await DynamoDestination().put(testDestinations).go()

    const response = await client.destinations.$get()
    const { destinations } = await response.json()
    const foundDestinations = destinations.filter((d: Destination) =>
        testDestinations.some((td) => td.destinationId === d.destinationId),
    )

    expect(destinations.length).toBeGreaterThanOrEqual(testDestinations.length)
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
