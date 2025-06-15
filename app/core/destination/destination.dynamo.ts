import { Entity } from 'electrodb'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'

export const DynamoDestination = () => {
    const client = getDynamoClient()
    const table = process.env.TABLE_NAME || Resource.Table.name
    console.info('Destination entity using table name:', table)

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
                },
                updatedAt: {
                    type: 'string',
                    required: true,
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
