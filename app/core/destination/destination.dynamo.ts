import { Entity } from 'electrodb'
import { nanoid } from 'nanoid'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'
import { createFormattedDate } from '~/utils'

export const DynamoDestination = () => {
    const client = getDynamoClient()
    const table = process.env.TABLE_NAME || Resource.Table.name

    return new Entity(
        {
            model: {
                entity: 'destination',
                version: '1',
                service: 'destination',
            },
            attributes: {
                destinationId: {
                    type: 'string',
                    required: true,
                    default: () => nanoid().toLowerCase(),
                },
                name: {
                    type: 'string',
                    required: true,
                },
                province: {
                    type: 'string',
                    required: true,
                },
                country: {
                    type: 'string',
                    required: true,
                },
                imageUrl: {
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
                type: {
                    type: 'string',
                    required: true,
                    default: () => 'destination',
                },
            },
            indexes: {
                primary: {
                    pk: { field: 'pk', composite: ['destinationId'] },
                    sk: { field: 'sk', composite: ['createdAt'] },
                },
                allDestinations: {
                    index: 'gsi1pk-gsi1sk-index',
                    pk: { field: 'gsi1pk', composite: ['type'] },
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
