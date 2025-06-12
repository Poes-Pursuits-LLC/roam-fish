import { DynamoTrip } from './trip.dynamo'
import type { Trip } from './trip.model'
import { fetchTripDetails } from './helpers/fetch-trip-details'
import { postTripDetails } from './helpers/post-trip-details'

const getTrip = async (tripId: string) => {
    const { data: trip } = await DynamoTrip().get({ tripId }).go()
    return trip
}

const getTripDetails = async (contentId: string) => {
    const tripDetails = await fetchTripDetails(contentId)
    return tripDetails
}

const getUserTrips = async (userId: string) => {
    const { data: trips } = await DynamoTrip().query.byUserId({ userId }).go()
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
    const { data } = await DynamoTrip().put(trip).go()
    return data.tripId
}

const submitTripDetails = async (inputs: {
    destinationName: string
    startDate: string
    duration: string
    headcount: string
}) => {
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
