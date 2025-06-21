import { Entity } from 'electrodb'
import { Resource } from 'sst'
import { getDynamoClient } from '~/clients/table.client'
import { createFormattedDate } from '~/utils'
import { nanoid } from 'nanoid'
import { TripDurationEnum, TripStatusEnum } from './trip.model'

export const DynamoTrip = () => {
    const client = getDynamoClient()
    const table = process.env.TABLE_NAME ?? Resource.Table.name

    return new Entity(
        {
            model: {
                entity: 'trip',
                version: '2',
                service: 'trip',
            },
            attributes: {
                tripId: {
                    type: 'string',
                    required: true,
                    default: () => nanoid().toLowerCase(),
                },
                name: {
                    type: 'string',
                    required: false,
                },
                destinationName: {
                    type: 'string',
                    required: true,
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
                headcount: {
                    type: 'string',
                    required: true,
                },
                notes: {
                    type: 'string',
                    required: false,
                },
                flies: {
                    type: 'list',
                    required: false,
                    items: {
                        type: 'string',
                    },
                },
                hatches: {
                    type: 'list',
                    required: false,
                    items: {
                        type: 'string',
                    },
                },
                fishingSummary: {
                    type: 'string',
                    required: false,
                },
                weather: {
                    type: 'string',
                    required: false,
                },
                packingList: {
                    type: 'list',
                    required: true,
                    items: {
                        type: 'map',
                        properties: {
                            id: { type: 'string', required: true },
                            category: { type: 'string', required: true },
                            name: { type: 'string', required: true },
                            quantity: { type: 'string', required: true },
                        },
                    },
                },
                budgetList: {
                    type: 'list',
                    required: true,
                    items: {
                        type: 'map',
                        properties: {
                            id: { type: 'string', required: true },
                            name: { type: 'string', required: true },
                            price: { type: 'string', required: true },
                        },
                    },
                },
                checkList: {
                    type: 'list',
                    required: true,
                    items: {
                        type: 'map',
                        properties: {
                            id: { type: 'string', required: true },
                            name: { type: 'string', required: true },
                            completed: { type: 'boolean', required: true },
                        },
                    },
                },
                contentId: {
                    type: 'string',
                    required: true,
                },
                status: {
                    type: [...Object.values(TripStatusEnum)] as const,
                    required: true,
                },
                startDate: {
                    type: 'string',
                    required: true,
                },
                duration: {
                    type: [...Object.values(TripDurationEnum)] as const,
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
                    required: true,
                    default: () => 'trip',
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