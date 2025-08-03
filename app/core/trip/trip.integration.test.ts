import { it, expect } from 'vitest'
import { FishingStyleEnum, TripDurationEnum, TripStatusEnum } from './trip.model'
import { v4 } from 'uuid'

const SERVER_URL = `http://localhost:${process.env.SERVER_PORT}`

it('should be able to create and retrieve a trip', async () => {
    const createTripArgs = {
        startDate: '2026-05-21',
        duration: TripDurationEnum.Week,
        userId: 'user123',
        status: TripStatusEnum.Generating,
        destinationName: 'Yellowstone',
        headcount: '2',
    }

    const returnedTripId = await fetch(`${SERVER_URL}/createTrip`, {
        method: 'POST',
        body: JSON.stringify(createTripArgs),
    })
        .then((res) => res.json())
        .then((data) => data.tripId)

    const fetchedTrip = await fetch(
        `${SERVER_URL}/getTrip?tripId=${returnedTripId}`,
        {
            method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((data) => data.trip)

    expect(returnedTripId).toBeDefined()
    expect(fetchedTrip).toBeDefined()
    expect(fetchedTrip.tripId).toBe(returnedTripId)
    expect(fetchedTrip.startDate).toBe('2026-05-21')
    expect(fetchedTrip.duration).toBe(TripDurationEnum.Week)
    expect(fetchedTrip.userId).toBe('user123')
    expect(fetchedTrip.status).toBe(TripStatusEnum.Planned)
    expect(fetchedTrip.destinationName).toBe('Yellowstone')
    expect(fetchedTrip.headcount).toBe('2')
    expect(fetchedTrip.airport).toBeDefined()
    expect(Array.isArray(fetchedTrip.cities)).toBe(true)
    expect(Array.isArray(fetchedTrip.flies)).toBe(true)
    expect(Array.isArray(fetchedTrip.hatches)).toBe(true)
    expect(fetchedTrip.weather).toBeDefined()
    expect(fetchedTrip.fishingSummary).toBeDefined()
    expect(fetchedTrip.notes).toBeDefined()
    expect(fetchedTrip.contentId).toBeDefined()
    expect(Array.isArray(fetchedTrip.packingList)).toBe(true)
    expect(Array.isArray(fetchedTrip.budgetList)).toBe(true)
    expect(Array.isArray(fetchedTrip.checkList)).toBe(true)
    expect(fetchedTrip.fishingStyle).toBe(FishingStyleEnum.FlyFishing)
})

it('should be able to create and retrieve a spin fishing trip', async () => {
    const createTripArgs = {
        startDate: '2026-05-21',
        duration: TripDurationEnum.Week,
        userId: 'user123',
        status: TripStatusEnum.Generating,
        destinationName: 'Lake Superior',
        headcount: '2',
        fishingStyle: FishingStyleEnum.SpinFishing,
    }

    const returnedTripId = await fetch(`${SERVER_URL}/createTrip`, {
        method: 'POST',
        body: JSON.stringify(createTripArgs),
    })
        .then((res) => res.json())
        .then((data) => data.tripId)

    const fetchedTrip = await fetch(
        `${SERVER_URL}/getTrip?tripId=${returnedTripId}`,
        {
            method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((data) => data.trip)

    expect(returnedTripId).toBeDefined()
    expect(fetchedTrip).toBeDefined()
    expect(fetchedTrip.tripId).toBe(returnedTripId)
    expect(fetchedTrip.startDate).toBe('2026-05-21')
    expect(fetchedTrip.duration).toBe(TripDurationEnum.Week)
    expect(fetchedTrip.userId).toBe('user123')
    expect(fetchedTrip.status).toBe(TripStatusEnum.Planned)
    expect(fetchedTrip.destinationName).toBe('Lake Superior')
    expect(fetchedTrip.headcount).toBe('2')
    expect(fetchedTrip.airport).toBeDefined()
    expect(Array.isArray(fetchedTrip.cities)).toBe(true)
    expect(Array.isArray(fetchedTrip.lures)).toBe(true)
    expect(Array.isArray(fetchedTrip.techniques)).toBe(true)
    expect(fetchedTrip.weather).toBeDefined()
    expect(fetchedTrip.fishingSummary).toBeDefined()
    expect(fetchedTrip.notes).toBeDefined()
    expect(fetchedTrip.contentId).toBeDefined()
    expect(Array.isArray(fetchedTrip.packingList)).toBe(true)
    expect(Array.isArray(fetchedTrip.budgetList)).toBe(true)
    expect(Array.isArray(fetchedTrip.checkList)).toBe(true)
    expect(fetchedTrip.fishingStyle).toBe(FishingStyleEnum.SpinFishing)
})

it('should still create a trip if no userId is provided, as this means it is a visitor trying the app', async () => {
    const createTripArgs = {
        startDate: '2026-05-21',
        duration: TripDurationEnum.Week,
        status: TripStatusEnum.Generating,
        destinationName: 'Yellowstone',
        headcount: '2',
    }

    const returnedTripId = await fetch(`${SERVER_URL}/createTrip`, {
        method: 'POST',
        body: JSON.stringify(createTripArgs),
    })
        .then((res) => res.json())
        .then((data) => data.tripId)

    expect(returnedTripId).toBeDefined()
})

it('should update a trip', async () => {
    const createTripArgs = {
        startDate: '2026-05-21',
        duration: TripDurationEnum.Week,
        userId: 'user123',
        status: TripStatusEnum.Generating,
        destinationName: 'Yellowstone',
        headcount: '2',
    }

    const createdTripId = await fetch(`${SERVER_URL}/createTrip`, {
        method: 'POST',
        body: JSON.stringify(createTripArgs),
    })
        .then((response) => response.json())
        .then((data) => data.tripId)

    await fetch(`${SERVER_URL}/updateTrip`, {
        method: 'POST',
        body: JSON.stringify({
            tripId: createdTripId,
            updateFields: {
                packingList: [
                    {
                        id: 'id',
                        category: 'Toiletries',
                        name: 'Deodorant',
                        quantity: '50',
                    },
                ],
            },
        }),
    })

    const updatedTrip = await fetch(
        `${SERVER_URL}/getTrip?tripId=${createdTripId}`,
        {
            method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((data) => data.trip)

    expect(createdTripId).toBeDefined()
    expect(updatedTrip.tripId).toBe(createdTripId)
    expect(updatedTrip.startDate).toBe('2026-05-21')
    expect(updatedTrip.duration).toBe(TripDurationEnum.Week)
    expect(updatedTrip.userId).toBe('user123')
    expect(updatedTrip.status).toBe(TripStatusEnum.Planned)
    expect(updatedTrip.destinationName).toBe('Yellowstone')
    expect(updatedTrip.headcount).toBe('2')
    expect(updatedTrip.airport).toBeDefined()
    expect(Array.isArray(updatedTrip.cities)).toBe(true)
    expect(Array.isArray(updatedTrip.flies)).toBe(true)
    expect(Array.isArray(updatedTrip.hatches)).toBe(true)
    expect(updatedTrip.weather).toBeDefined()
    expect(updatedTrip.fishingSummary).toBeDefined()
    expect(updatedTrip.notes).toBeDefined()
    expect(updatedTrip.contentId).toBeDefined()
    expect(Array.isArray(updatedTrip.packingList)).toBe(true)
    expect(updatedTrip.packingList).toContainEqual({
        category: 'Toiletries',
        id: 'id',
        name: 'Deodorant',
        quantity: '50',
    })
    expect(Array.isArray(updatedTrip.budgetList)).toBe(true)
    expect(Array.isArray(updatedTrip.checkList)).toBe(true)
})

it('should fetch the asked-of amount of trips for a specific user in descending order', async () => {
    const userId = v4()
    const trips = [
        {
            startDate: '2026-05-19',
            duration: TripDurationEnum.Week,
            status: TripStatusEnum.Generating,
            destinationName: 'Iceland',
            headcount: '3',
        },
        {
            startDate: '2026-05-20',
            duration: TripDurationEnum.Week,
            userId,
            status: TripStatusEnum.Generating,
            destinationName: 'Idaho Falls',
            headcount: '2',
        },
        {
            startDate: '2026-03-20',
            duration: TripDurationEnum.Weekend,
            userId,
            status: TripStatusEnum.Generating,
            destinationName: 'Upper Peninsula',
            headcount: '2',
        },
        {
            startDate: '2026-05-21',
            duration: TripDurationEnum.Week,
            userId,
            status: TripStatusEnum.Generating,
            destinationName: 'Yellowstone',
            headcount: '2',
        },
    ]

    for (const trip of trips) {
        await fetch(`${SERVER_URL}/createTrip`, {
            method: 'POST',
            body: JSON.stringify(trip),
        })
    }

    const userTrips = await fetch(
        `${SERVER_URL}/getUserTrips?userId=${userId}&count=2`,
        {
            method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((data) => data.trips)

    expect(userTrips.length).toEqual(2)
    expect(userTrips[0].destinationName).toEqual('Yellowstone')
})
