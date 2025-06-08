import { getTTL } from '~/utils'
import { DynamoCache } from '../cache/cache.dynamo'
import { DynamoDestination } from './destination.dynamo'
import type { Destination } from './destination.model'

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

export const destinationService = {
    getDestinations,
}