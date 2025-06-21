import { DynamoTrip } from './trip.dynamo'
import type { Trip } from './trip.model'
import { fetchTripDetails } from './helpers/fetch-trip-details'
import { postTripDetails } from './helpers/post-trip-details'
import { getTTL, isIntegrationTest } from '~/utils'

const getTrip = async (tripId: string) => {
    const { data: trip } = await DynamoTrip().get({ tripId }).go()
    return trip
}

const getTripDetails = async (contentId: string) => {
    if (isIntegrationTest()) {
        return {
            fishingSummary: 'fishingSummary',
            weather: 'weather',
            flies: ['fly1', 'fly2', 'fly3'],
            hatches: ['hatch1', 'hatch2', 'hatch3'],
            notes: 'notes',
            airport: 'airport',
            cities: ['city1', 'city2', 'city3'],
        }
    }
    const tripDetails = await fetchTripDetails(contentId)
    return tripDetails
}

const getUserTrips = async (userId: string, count?: number) => {
    const { data: trips } = await DynamoTrip().query.byUserId({ userId }).go({ order: 'desc', ...(count && { count }) })
    return trips
}

const createTrip = async (
    trip: Pick<
        Trip,
        | 'startDate'
        | 'duration'
        | 'userId'
        | 'contentId'
        | 'status'
        | 'destinationName'
        | 'headcount'
        | 'packingList'
        | 'budgetList'
        | 'checkList'
    >,
) => {
    const { data } = await DynamoTrip()
        .put({
            ...trip,
            ...(process.env.CICD_WEB_URL && { expireAt: getTTL(1) }),
        })
        .go()
    return data.tripId
}

const submitTripDetails = async (inputs: {
    destinationName: string
    startDate: string
    duration: string
    headcount: string
}) => {
    if (isIntegrationTest()) {
        return 'contentId'
    }

    const contentId = await postTripDetails(inputs)
    return contentId
}

const updateTrip = async (tripId: string, tripFields: Partial<Trip>) => {
    await DynamoTrip()
        .patch({ tripId })
        .set({
            ...tripFields,
        })
        .go()
}

export const tripService = {
    getTrip,
    getTripDetails,
    getUserTrips,
    createTrip,
    submitTripDetails,
    updateTrip,
}
