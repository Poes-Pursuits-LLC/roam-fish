import { Entity } from 'electrodb'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'

export const DynamoDestination = () => {
    const client = getDynamoClient()
    const table = Resource.Table.name

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
                gsi1pk: {
                    type: 'string',
                    required: true,
                    default: 'destination',
                },
                gsi1sk: {
                    type: 'string',
                    required: true,
                    default: '',
                },
                createdAt: {
                    type: 'string',
                    required: true,
                },
                updatedAt: {
                    type: 'string',
                    required: true,
                },
            },
            indexes: {
                byDestinationId: {
                    pk: {
                        field: 'pk',
                        composite: ['destinationId'],
                    },
                    sk: {
                        field: 'sk',
                        composite: ['name'],
                    },
                },
                getAll: {
                    index: 'gsi1pk-gsi1sk-index',
                    pk: {
                        field: 'gsi1pk',
                        composite: ['gsi1pk'],
                    },
                },
            },
        },
        {
            client,
            table,
        },
    )
}
