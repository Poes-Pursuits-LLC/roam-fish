import { vi } from 'vitest'
import { TripDurationEnum } from '../trip.model'
import type { Trip } from '../trip.model'
import { createDefaultPackingList } from '../helpers/create-default-packing-list'
import { createDefaultBudgetList } from '../helpers/create-default-budget'
import { createDefaultCheckList } from '../helpers/create-defaultcheckList'

const mockData = {
    contentId: 'contentId',
    packingList: createDefaultPackingList('2'),
    budgetList: createDefaultBudgetList('2', TripDurationEnum.Week),
    checkList: createDefaultCheckList(),
    flies: ['Leech'],
    hatches: ['cicadas'],
    weather: 'Sunny',
    fishingSummary: 'Do well my son',
    cities: ['New York', 'Buffalo'],
    airport: 'JFK'
}

// Create a lazy-loaded reference to the actual service
const getActualService = async () => {
    const actualTripService = await import('../trip.service')
    return actualTripService.tripService
}

export const tripService = {
    getTrip: async (tripId: string) => {
        const actual = await getActualService()
        return actual.getTrip(tripId)
    },
    updateTrip: async (tripId: string, tripFields: Partial<Trip>) => {
        const actual = await getActualService()
        return actual.updateTrip(tripId, tripFields)
    },
    getUserTrips: async (userId: string) => {
        const actual = await getActualService()
        return actual.getUserTrips(userId)
    },
    createTrip: async (trip: Pick<Trip, 'startDate' | 'duration' | 'userId' | 'contentId' | 'status' | 'destinationName' | 'headcount' | 'packingList' | 'budgetList' | 'checkList'>) => {
        const actual = await getActualService()
        return actual.createTrip(trip)
    },
    getTripDetails: vi.fn().mockResolvedValue({
        packingList: mockData.packingList,
        budgetList: mockData.budgetList,
        checkList: mockData.checkList,
        flies: mockData.flies,
        hatches: mockData.hatches,
        weather: mockData.weather,
        fishingSummary: mockData.fishingSummary,
        cities: mockData.cities,
        airport: mockData.airport
    }),
    submitTripDetails: vi.fn().mockResolvedValue(mockData.contentId)
} 