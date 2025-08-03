import { Entity } from 'electrodb'
import { nanoid } from 'nanoid'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'
import { createFormattedDate, getTTL } from '~/utils'

export const DynamoPrompt = () => {
    const client = getDynamoClient()
    const table = process.env.TABLE_NAME ?? Resource.Table.name

    return new Entity(
        {
            model: {
                entity: 'prompt',
                version: '1',
                service: 'prompt',
            },
            attributes: {
                promptId: {
                    type: 'string',
                    required: true,
                    default: () => nanoid().toLowerCase(),
                },
                content: {
                    type: 'string',
                    required: true,
                },
                userId: {
                    type: 'string',
                    required: false,
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
                expireAt: {
                    type: 'number',
                    required: false,
                },
                type: {
                    type: 'string',
                    required: true,
                    default: () => 'prompt',
                },
            },
            indexes: {
                primary: {
                    pk: { field: 'pk', composite: ['promptId'] },
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