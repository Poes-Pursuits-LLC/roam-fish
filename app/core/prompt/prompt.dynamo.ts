import { Entity } from 'electrodb'
import { nanoid } from 'nanoid'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'
import { createFormattedDate } from '~/utils'
import { FishingStyleEnum } from '../trip/trip.model'

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
                fishingStyle: {
                    type: [...Object.values(FishingStyleEnum)] as const,
                    required: true,
                    default: () => FishingStyleEnum.FlyFishing,
                },
                content: {
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
                expireAt: {
                    type: 'number',
                    required: false,
                },
                type: {
                    type: 'string',
                    required: false,
                    default: () => 'prompt',
                },
            },
            indexes: {
                primary: {
                    pk: { field: 'pk', composite: ['fishingStyle'] },
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