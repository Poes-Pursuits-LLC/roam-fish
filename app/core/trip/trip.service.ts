import { DynamoTrip } from './trip.dynamo'
import type { Trip } from './trip.model'
import { getTripDetails as getTripDetailsHelper } from './helpers/get-trip-details'
import { postTripDetails } from './helpers/post-trip-details'

const getTrip = async (tripId: string) => {
    const { data: trip } = await DynamoTrip().get({ tripId }).go()
    return trip
}

const getTripDetails = async (contentId: string) => {
    const tripDetails = await getTripDetailsHelper(contentId)
    return tripDetails
}

const getUserTrips = async (userId: string) => {
    const { data: trips } = await DynamoTrip().query.byUserId({ userId }).go()
    return trips
}

const createTrip = async (
    trip: Pick<
        Trip,
        'startDate' | 'endDate' | 'userId' | 'contentId' | 'status'
    >,
) => {
    const { data } = await DynamoTrip().put(trip).go()
    return data.tripId
}

const submitTripDetails = async (inputs: {
    destinationName: string
    startDate: string
    endDate: string
}) => {
    const contentId = await postTripDetails(inputs)
    return contentId
}

const updateTrip = async (trip: Trip) => {
    await DynamoTrip()
        .patch({ tripId: trip.tripId })
        .set({
            name: trip.name,
            description: trip.description,
            status: trip.status,
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
