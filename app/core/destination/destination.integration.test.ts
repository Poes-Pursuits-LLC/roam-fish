import { it, expect } from 'vitest'
import type { Destination } from '~/core/destination/destination.model'
import { createFormattedDate } from '~/utils'
import { nanoid } from 'nanoid'

const SERVER_URL = `http://localhost:${process.env.SERVER_PORT}`

it('should retrieve all destinations', async () => {
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

    await fetch(`${SERVER_URL}/createDestinations`, {
        method: 'POST',
        body: JSON.stringify({
            destinations: testDestinations,
        }),
    })

    const response = await fetch(
        `http://localhost:${process.env.SERVER_PORT}/destinations`,
    ).then((res) => res.json())

    const { destinations } = response

    expect(destinations.length).toEqual(testDestinations.length)
    destinations.forEach((destination: Destination) => {
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
