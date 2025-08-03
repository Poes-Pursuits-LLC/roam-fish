import { DynamoTrip } from './trip.dynamo'
import type { Trip } from './trip.model'
import { FishingStyleEnum } from './trip.model'
import { fetchTripDetails } from './helpers/fetch-trip-details'
import { postTripDetails } from './helpers/post-trip-details'
import { createFormattedDate, getTTL, isIntegrationTest } from '~/utils'

const getTrip = async (tripId: string) => {
    const { data: trip } = await DynamoTrip().get({ tripId }).go()
    return trip
}

const getTripDetails = async (contentId: string, fishingStyle?: FishingStyleEnum) => {
    if (isIntegrationTest()) {
        const baseDetails = {
            fishingSummary: 'fishingSummary',
            weather: 'weather',
            notes: 'notes',
            airport: 'airport',
            cities: ['city1', 'city2', 'city3'],
        }
        
        if (fishingStyle === FishingStyleEnum.SpinFishing) {
            return {
                ...baseDetails,
                lures: ['lure1', 'lure2', 'lure3'],
                techniques: ['technique1', 'technique2', 'technique3'],
            }
        }
        
        return {
            ...baseDetails,
            flies: ['fly1', 'fly2', 'fly3'],
            hatches: ['hatch1', 'hatch2', 'hatch3'],
        }
    }
    const tripDetails = await fetchTripDetails(contentId)
    return tripDetails
}

const getUserTrips = async (userId: string, count?: number) => {
    const { data: trips } = await DynamoTrip()
        .query.byUserId({ userId })
        .go({ order: 'desc', ...(count && { count }) })
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
        | 'fishingStyle'
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
    prompt: string
    destinationName: string
    startDate: string
    duration: string
    headcount: string
    fishingStyle?: FishingStyleEnum
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
            updatedAt: createFormattedDate(),
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
