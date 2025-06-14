import { Entity } from 'electrodb'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'
import { createFormattedDate } from '~/utils'

export const DynamoUserAnalytics = () => {
    const client = getDynamoClient()
    const table = Resource.Table.name

    return new Entity(
        {
            model: {
                entity: 'userAnalytics',
                version: '1',
                service: 'analytics',
            },
            attributes: {
                userId: {
                    type: 'string',
                    required: true,
                },
                totalDaysFishing: {
                    type: 'number',
                    required: true,
                    default: 0,
                },
                uniqueDestinations: {
                    type: 'list',
                    required: true,
                    items: {
                        type: 'string',
                    },
                    default: () => [],
                },
                totalTripCost: {
                    type: 'number',
                    required: true,
                    default: 0,
                },
                tripCount: {
                    type: 'number',
                    required: true,
                    default: 0,
                },
                type: {
                    type: 'string',
                    required: true,
                    default: () => 'userAnalytics',
                },
                createdAt: {
                    type: 'string',
                    required: true,
                    default: () => createFormattedDate(),
                },
                updatedAt: {
                    type: 'string',
                    required: true,
                    default: () => createFormattedDate(),
                },
            },
            indexes: {
                primary: {
                    pk: { field: 'pk', composite: ['userId'] },
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
