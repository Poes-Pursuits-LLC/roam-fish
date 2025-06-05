import { beforeEach, describe, expect, it, vi } from 'vitest'
import { main } from '../main'
import { tripService } from '~/core/trip/trip.service'

vi.mock('~/core/destination/trip.service.ts', () => ({
    tripService: {
        getUserTrips: vi.fn(),
        createTrip: vi.fn(),
        createTripDetails: vi.fn(),
    },
}))

beforeEach(() => {
    vi.resetAllMocks()
})

describe('/create-trip', () => {
    it('should create a trip and open a stream to get the trip contents while also saving the final trip details', async () => {
        const inputs = {
            startDate: '2027-04-12',
            endDate: '2027-05-12',
            userId: 'userId',
            destinationName: 'Central Pennsylvania',
            travelerCount: 2,
        }
        const mockCreateTrip = vi
            .spyOn(tripService, 'createTrip')
            .mockResolvedValue()
        const mockCreateTripDetails = vi.spyOn(tripService, 'createTripDetails')
        const mockSaveTripDetailsFromStream = vi.spyOn(
            tripService,
            'saveTripDetailsFromStream',
        )

        const res = await main.request('/create-trip', {
            method: 'POST',
            body: JSON.stringify(inputs),
        })

        expect(mockCreateTrip).toHaveBeenCalledWith({
            userId: inputs.userId,
            startDate: inputs.startDate,
            endDate: inputs.endDate,
        })
        expect(mockCreateTrip).toHaveBeenCalledOnce()

        expect(mockCreateTripDetails).toHaveBeenCalledWith({
            userId: inputs.userId,
            destinationName: inputs.destinationName,
            travelerCount: inputs.travelerCount,
        })
        expect(mockCreateTripDetails).toHaveBeenCalledOnce()

        expect(mockSaveTripDetailsFromStream).toHaveBeenCalledWith(
            typeof stream,
        )
        expect(mockSaveTripDetailsFromStream).toHaveBeenCalledOnce()

        expect(res.status).toEqual(200)
        expect(res.headers.get('content-type')).toEqual('stream')
    })
})
