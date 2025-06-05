import { Entity } from 'electrodb'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'
import { createFormattedDate } from '~/utils'
import { nanoid } from 'nanoid'

export const DynamoTrip = () => {
    const client = getDynamoClient()
    const table = Resource.Table.name

    return new Entity(
        {
            model: {
                entity: 'trip',
                version: '1',
                service: 'trip',
            },
            attributes: {
                tripId: {
                    type: 'string',
                    required: true,
                    default: () => nanoid(),
                },
                name: {
                    type: 'string',
                    required: false,
                },
                description: {
                    type: 'string',
                    required: false,
                },
                userId: {
                    type: 'string',
                    required: false,
                },
                airport: {
                    type: 'string',
                    required: false,
                },
                cities: {
                    type: 'list',
                    required: false,
                    items: {
                        type: 'string',
                    },
                },
                packingList: {
                    type: 'list',
                    required: false,
                    items: {
                        type: 'map',
                        properties: {
                            name: { type: 'string' },
                            quantity: { type: 'number' },
                        },
                    },
                },
                startDate: {
                    type: 'string',
                    required: true,
                },
                endDate: {
                    type: 'string',
                    required: true,
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
                    pk: { field: 'pk', composite: ['tripId'] },
                    sk: { field: 'sk', composite: [] },
                },
                byUserId: {
                    index: 'gsi1pk-gsi1sk-index',
                    pk: { field: 'gsi1pk', composite: ['userId'] },
                    sk: { field: 'gsi1sk', composite: ['createdAt'] },
                },
            },
        },
        {
            client,
            table,
        },
    )
}
