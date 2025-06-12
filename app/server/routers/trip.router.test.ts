import { describe, expect, it, vi } from 'vitest'
import { testClient } from 'hono/testing'
import { tripService } from '~/core/trip/trip.service'
import { tripRouter } from './trip.router'
import { Hono } from 'hono'
import {
    TripDurationEnum,
    TripStatusEnum,
    type Trip,
} from '~/core/trip/trip.model'
import { createDefaultPackingList } from '~/core/trip/helpers/create-default-packing-list'
import { createDefaultBudgetList } from '~/core/trip/helpers/create-default-budget'
import { createDefaultCheckList } from '~/core/trip/helpers/create-defaultcheckList'

vi.mock('~/core/trip/trip.service.ts', () => ({
    tripService: {
        getTrip: vi.fn(),
        createTrip: vi.fn(),
        getUserTrips: vi.fn(),
        submitTripDetails: vi.fn(),
        getTripDetails: vi.fn(),
        updateTrip: vi.fn(),
    },
}))

vi.mock('~/core/trip/helpers/create-default-packing-list', () => {
    return {
        createDefaultPackingList: vi.fn(),
    }
})
vi.mock('~/core/trip/helpers/create-default-budget', () => {
    return {
        createDefaultBudgetList: vi.fn(),
    }
})
vi.mock('~/core/trip/helpers/create-defaultcheckList', () => {
    return {
        createDefaultCheckList: vi.fn(),
    }
})

vi.mock('../main', () => ({
    main: new Hono().route('/', tripRouter),
}))
import { main } from '../main'
import { createFormattedDate } from '~/utils'

describe('/create-trip', () => {
    it('should submit trip details to be generated and then create the trip and return its id', async () => {
        const client = testClient(main)
        const inputs = {
            startDate: '2027-04-12',
            userId: 'userId',
            headcount: '3',
            destinationName: 'Central Pennsylvania',
            duration: TripDurationEnum.Week,
        }
        const tripId = 'tripId'
        const contentId = 'contentId'
        const packingList = [
            {
                id: '1',
                category: '1',
                name: '1',
                quantity: '1',
            },
        ]
        const budgetList = [
            {
                id: '1',
                name: '1',
                price: '1',
            },
        ]
        const checkList = [
            { id: '1', name: 'Buy plane tickets', completed: false },
            { id: '2', name: 'Buy car rental', completed: false },
        ]

        const submitTripDetails = vi
            .mocked(tripService.submitTripDetails)
            .mockResolvedValue(contentId)
        const createTrip = vi
            .mocked(tripService.createTrip)
            .mockResolvedValue(tripId)
        vi.mocked(createDefaultPackingList).mockReturnValue(packingList)
        vi.mocked(createDefaultBudgetList).mockReturnValue(budgetList)
        vi.mocked(createDefaultCheckList).mockReturnValue(checkList)

        const response = await client.createTrip.$post({
            json: inputs,
        })

        expect(submitTripDetails).toHaveBeenCalledOnce()
        expect(submitTripDetails).toHaveBeenCalledWith(inputs)
        expect(createTrip).toHaveBeenCalledOnce()
        expect(createTrip).toHaveBeenCalledWith({
            ...inputs,
            contentId,
            packingList,
            budgetList,
            checkList,
            status: TripStatusEnum.Generating,
        })
        expect(await response.json()).toEqual({ tripId })
    })

    it('should still create a trip for guests when no userId is provided', async () => {
        const client = testClient(main)
        const inputs = {
            startDate: '2027-04-12',
            headcount: '3',
            destinationName: 'Central Pennsylvania',
            duration: TripDurationEnum.Week,
        }
        const tripId = 'tripId'
        const contentId = 'contentId'
        const packingList = [
            {
                id: '1',
                category: '1',
                name: '1',
                quantity: '1',
            },
        ]

        const submitTripDetails = vi
            .mocked(tripService.submitTripDetails)
            .mockResolvedValue(contentId)
        const createTrip = vi
            .mocked(tripService.createTrip)
            .mockResolvedValue(tripId)
        vi.mocked(createDefaultPackingList).mockReturnValue(packingList)

        const response = await client.createTrip.$post({
            json: inputs,
        })

        expect(submitTripDetails).toHaveBeenCalledOnce()
        expect(submitTripDetails).toHaveBeenCalledWith(inputs)
        expect(createTrip).toHaveBeenCalledOnce()
        expect(createTrip).toHaveBeenCalledWith({
            ...inputs,
            contentId,
            packingList,
            status: TripStatusEnum.Generating,
        })
        expect(await response.json()).toEqual({ tripId })
    })

    it('should throw an http exception and return a 500 status code if an error occurs', async () => {
        const client = testClient(main)
        const inputs = {
            startDate: '2027-04-12',
            headcount: '3',
            destinationName: 'Central Pennsylvania',
            duration: TripDurationEnum.Week,
        }

        const submitTripDetails = vi
            .mocked(tripService.submitTripDetails)
            .mockRejectedValue(new Error('Error'))

        const response = await client.createTrip.$post({
            json: inputs,
        })

        expect(submitTripDetails).toHaveBeenCalledOnce()
        expect(submitTripDetails).toHaveBeenCalledWith(inputs)
        expect(response.status).toBe(500)
    })
})

describe('/getTrip', () => {
    it('should get a trip based on the provided tripId', async () => {
        const client = testClient(main)
        const tripId = 'tripId'
        const trip = {
            tripId,
            startDate: '2026-02-11',
        } as Trip
        const getTrip = vi.mocked(tripService.getTrip).mockResolvedValue(trip)

        const response = await client.getTrip.$get({
            query: {
                tripId,
            },
        })

        expect(getTrip).toHaveBeenCalledOnce()
        expect(getTrip).toHaveBeenCalledWith(tripId)
        expect(await response.json()).toEqual({ trip })
    })

    it('should, for a trip whose content was still generating, self-heal by calling xAi to get its contents and save them to the trip before returning it', async () => {
        const client = testClient(main)
        const tripId = 'tripId'
        const contentId = 'contentId'
        const trip = {
            tripId,
            startDate: '2026-02-11',
            status: TripStatusEnum.Generating,
            contentId,
        } as Trip
        const tripDetails = {
            name: 'name',
            description: 'description',
        }
        const updatedTrip = {
            ...trip,
            ...tripDetails,
            status: TripStatusEnum.Planned,
        } as Trip

        const getTrip = vi
            .mocked(tripService.getTrip)
            .mockResolvedValueOnce(trip)
            .mockResolvedValueOnce(updatedTrip)
        const getTripDetails = vi
            .mocked(tripService.getTripDetails)
            .mockResolvedValue(tripDetails)
        const updateTrip = vi.mocked(tripService.updateTrip)

        const response = await client.getTrip.$get({
            query: {
                tripId,
            },
        })

        expect(getTrip).toHaveBeenCalledTimes(2)
        expect(getTrip).toHaveBeenCalledWith(tripId)
        expect(getTripDetails).toHaveBeenCalledOnce()
        expect(getTripDetails).toHaveBeenCalledWith(contentId)
        expect(updateTrip).toHaveBeenCalledOnce()
        expect(updateTrip).toHaveBeenCalledWith(tripId, {
            ...tripDetails,
            status: TripStatusEnum.Planned,
        })
        expect(await response.json()).toEqual({ trip: updatedTrip })
    })

    it('should throw an http exception and return a 500 status code if an error occurs', async () => {
        const client = testClient(main)
        const tripId = 'tripId'
        const getTrip = vi
            .mocked(tripService.getTrip)
            .mockRejectedValue(new Error('Error'))

        const response = await client.getTrip.$get({
            query: {
                tripId,
            },
        })

        expect(getTrip).toHaveBeenCalledOnce()
        expect(getTrip).toHaveBeenCalledWith(tripId)
        expect(response.status).toBe(500)
    })
})

describe('/getUserTrips', () => {
    it('should get a list of trips for a user', async () => {
        const client = testClient(main)
        const userId = 'userId'
        const trips = [{ tripId: 'tripId' }] as Trip[]
        const getUserTrips = vi
            .mocked(tripService.getUserTrips)
            .mockResolvedValue(trips)

        const response = await client.getUserTrips.$get({
            query: {
                userId,
            },
        })

        expect(getUserTrips).toHaveBeenCalledOnce()
        expect(getUserTrips).toHaveBeenCalledWith(userId)
        expect(await response.json()).toEqual({ trips })
    })

    it('should throw an HTTP exception and return a 500 status code if an error occurs', async () => {
        const client = testClient(main)
        const userId = 'userId'
        const getUserTrips = vi
            .mocked(tripService.getUserTrips)
            .mockRejectedValue(new Error('Error'))

        const response = await client.getUserTrips.$get({
            query: {
                userId,
            },
        })

        expect(getUserTrips).toHaveBeenCalledOnce()
        expect(getUserTrips).toHaveBeenCalledWith(userId)
        expect(response.status).toBe(500)
    })
})

describe('/updateTrip', () => {
    it('should update a trip with provided fields', async () => {
        const client = testClient(main)
        const tripId = 'tripId'
        const updateTrip = vi.mocked(tripService.updateTrip)

        const updateFields = {
            status: TripStatusEnum.Planned,
        }

        const response = await client.updateTrip.$post({
            json: {
                tripId,
                updateFields,
            },
        })
        console.info(response)

        expect(updateTrip).toHaveBeenCalledOnce()
        expect(updateTrip).toHaveBeenCalledWith(tripId, {
            ...updateFields,
            updatedAt: createFormattedDate(),
        })
        expect(await response.json()).toEqual({ tripId })
    })

    it('should throw an HTTP exception and return a 500 status code if an error occurs', async () => {
        const client = testClient(main)
        const tripId = 'tripId'
        const updateTrip = vi
            .mocked(tripService.updateTrip)
            .mockRejectedValue(new Error('Error'))
        const updateFields = {
            status: TripStatusEnum.Planned,
        }

        const response = await client.updateTrip.$post({
            json: {
                tripId,
                updateFields,
            },
        })

        expect(updateTrip).toHaveBeenCalledOnce()
        expect(updateTrip).toHaveBeenCalledWith(tripId, {
            ...updateFields,
            updatedAt: createFormattedDate(),
        })
        expect(response.status).toBe(500)
    })
})
