import { DynamoDestination } from './destination.dynamo'

const getDestinations = async () => {
    const { data: destinations } = await DynamoDestination()
        .query.allDestinations({
            type: 'destination',
        })
        .go()
    return destinations
}

export const destinationService = {
    getDestinations,
}
