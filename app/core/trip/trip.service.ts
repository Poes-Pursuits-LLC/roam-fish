import { PromptEnum, xAiClient } from '~/clients/xai.client'
import { DynamoTrip } from './trip.dynamo'
import type { Trip } from './trip.model'

const getUserTrips = async (userId: string) => {
    const { data: trips } = await DynamoTrip().query.byUserId({ userId }).go()
    return trips
}

const createTrip = async (
    trip: Pick<Trip, 'startDate' | 'endDate' | 'userId'>,
) => {
    await DynamoTrip().put(trip).go()
}

const createTripDetails = async (inputs: {
    destinationName: string
    startDate: string
    endDate: string
    travelerCount: number
}) => {
    const tripDetails = await xAiClient.submitPrompt({
        inputs,
        prompt: PromptEnum.CreateTripDetails,
    })
    return tripDetails
}

const saveTripDetails = async (trip: Trip) => {
    await DynamoTrip().put(trip).go()
}

const saveTripDetailsFromStream = () => {}

export const tripService = {
    getUserTrips,
    createTrip,
    createTripDetails,
    saveTripDetails,
    saveTripDetailsFromStream,
}
