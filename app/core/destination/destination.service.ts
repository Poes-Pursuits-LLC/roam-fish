import { createFormattedDate, getTTL, handleAsync } from '~/utils'
import { DynamoCache } from '../cache/cache.dynamo'
import { DynamoDestination } from './destination.dynamo'
import type { Destination } from './destination.model'
import { nanoid } from 'nanoid'

const getDestinations = async () => {
    const { data } = await DynamoCache().get({ cacheKey: 'destinations' }).go()
    if (data?.cached) return data.cached as Destination[]

    const { data: destinations } = await DynamoDestination()
        .query.allDestinations({
            type: 'destination',
        })
        .go()

    await DynamoCache()
        .put({
            cacheKey: 'destinations',
            cached: destinations,
            expireAt: getTTL(24),
        })
        .go()

    return destinations
}

const createDestinations = async (
    destinations: Pick<
        Destination,
        'name' | 'province' | 'country' | 'type' | 'imageUrl'
    >[],
) => {
    const [createDestinations, createDestinationsError] = await handleAsync(
        DynamoDestination()
            .put({
                ...destinations.map((destination) => ({
                    ...destination,
                    destinationId: nanoid(),
                    createdAt: createFormattedDate(),
                    updatedAt: createFormattedDate(),
                })),
            })
            .go(),
    )
    return [createDestinations, createDestinationsError]
}

export const destinationService = {
    getDestinations,
    createDestinations,
}
