import { DynamoDestination } from './destination.dynamo'

const getDestinations = async () => {
    const { data: destinations } = await DynamoDestination()
        .query.getAll({ gsi1pk: 'destination' })
        .go()
    return destinations
}

export const destinationService = {
    getDestinations,
}
