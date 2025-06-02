import { DynamoDestination } from './destination.dynamo'
import type { Destination } from './destination.model'

const getDestinations = async () => {
    const { data: destinations } = await DynamoDestination().find({}).go()
    return destinations
}

const createDestination = async (destination: Destination) => {
    await DynamoDestination().create(destination).go()
}

export const destinationService = {
    getDestinations,
    createDestination,
}
