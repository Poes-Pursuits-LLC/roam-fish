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

vi.mock('~/core/trip/trip.service.ts', () => ({
    tripService: {
        getTrip: vi.fn(),
        createTrip: vi.fn(),
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

vi.mock('../main', () => ({
    main: new Hono().route('/', tripRouter),
}))
import { main } from '../main'

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
})
