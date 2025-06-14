import { Entity } from 'electrodb'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'

export const DynamoDestinationAnalytics = () => {
    const client = getDynamoClient()
    const table = Resource.Table.name

    return new Entity(
        {
            model: {
                entity: 'destinationAnalytics',
                version: '1',
                service: 'analytics',
            },
            attributes: {
                userId: {
                    type: 'string',
                    required: true,
                },
                destinationName: {
                    type: 'string',
                    required: true,
                },
                totalCost: {
                    type: 'number',
                    required: true,
                },
                visitCount: {
                    type: 'number',
                    required: true,
                },
                averageCost: {
                    type: 'number',
                    required: true,
                },
                lastVisited: {
                    type: 'string',
                    required: true,
                },
            },
            indexes: {
                primary: {
                    pk: { field: 'pk', composite: ['userId', 'destinationName'] },
                    sk: { field: 'sk', composite: [] },
                },
                byUser: {
                    index: 'gsi1pk-gsi1sk-index',
                    pk: { field: 'gsi1pk', composite: ['userId'] },
                    sk: { field: 'gsi1sk', composite: ['destinationName'] },
                },
            },
        },
        {
            client,
            table,
        },
    )
} 