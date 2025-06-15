import { it, expect, beforeAll, afterAll } from 'vitest'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'
import { TripDurationEnum, TripStatusEnum } from './trip.model'
import { setupServer, teardownServer } from '~/integration/setup-server'

let client: ReturnType<typeof hc<AppType>>

beforeAll(async () => {
    await setupServer({
        tripService: {
            submitTripDetails: async () => 'mock-content-id',
        },
    })
    client = hc<AppType>(process.env.SERVER_URL!)
})

afterAll(async () => {
    await teardownServer()
})

it('should be able to create and retrieve a trip', async () => {
    const createTripArgs = {
        startDate: '2026-05-21',
        duration: TripDurationEnum.Week,
        userId: 'user123',
        status: TripStatusEnum.Generating,
        destinationName: 'Yellowstone',
        headcount: '2',
    }

    const returnedTripId = await client.createTrip
        .$post({
            json: createTripArgs,
        })
        .then((response) => response.json())
        .then((data) => data.tripId)

    const fetchedTrip = await client.getTrip.$get({
        query: {
            tripId: returnedTripId!,
        },
    })

    expect(returnedTripId).toBeDefined()
    expect(fetchedTrip).toEqual({
        tripId: returnedTripId,
        startDate: '2026-05-21',
        duration: TripDurationEnum.Week,
        userId: 'user123',
        status: TripStatusEnum.Generating,
        destinationName: 'Yellowstone',
        headcount: '2',
        packingList: expect.any([]),
        budgetList: expect.any([]),
        checkList: expect.any([]),
    })
})
