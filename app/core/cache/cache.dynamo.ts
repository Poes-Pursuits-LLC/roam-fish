import { Entity } from 'electrodb'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'

export const DynamoCache = () => {
    const client = getDynamoClient()
    const table = Resource.Table.name
    return new Entity(
        {
            model: {
                entity: 'cache',
                version: '1',
                service: 'cache',
            },
            attributes: {
                cacheKey: { type: 'string', required: true },
                cached: { type: 'any', required: true },
                expireAt: {
                    type: 'number',
                    required: true,
                },
            },
            indexes: {
                primary: {
                    pk: { field: 'pk', composite: ['cacheKey'] },
                    sk: { field: 'sk', composite: [] },
                },
            },
        },
        {
            client,
            table,
        },
    )
}
