import z from 'zod'

export interface Trip {
    tripId: string
    name?: string
    destinationName: string
    userId?: string
    airport?: string
    cities?: string[]
    headcount: string
    notes?: string
    flies?: string[]
    hatches?: string[]
    weather?: string
    fishingSummary?: string
    packingList: PackingListItem[]
    status: TripStatusEnum
    contentId: string
    startDate: string
    type: string
    duration: TripDurationEnum
    createdAt: string
    updatedAt: string
}

interface PackingListItem {
    id: string
    category: string
    name: string
    quantity: string
}

export enum TripStatusEnum {
    Generating = 'Generating',
    Planned = 'Planned',
    Completed = 'Completed',
}

export enum TripDurationEnum {
    HalfDay = 'Half Day (4 hours)',
    FullDay = 'Full Day (8 hours)',
    Weekend = 'Weekend',
    Week = 'Week Long',
    TwoWeeks = 'Two weeks',
}

export const PackingListItemSchema = z.object({
    id: z.string(),
    category: z.string(),
    name: z.string(),
    quantity: z.string(),
})

export const TripSchema = z.object({
    tripId: z.string(),
    name: z.string().optional(),
    destinationName: z.string(),
    userId: z.string().optional(),
    airport: z.string().optional(),
    cities: z.array(z.string()).optional(),
    headcount: z.string(),
    notes: z.string().optional(),
    flies: z.array(z.string()).optional(),
    hatches: z.array(z.string()).optional(),
    weather: z.string().optional(),
    fishingSummary: z.string().optional(),
    packingList: z.array(PackingListItemSchema),
    status: z.nativeEnum(TripStatusEnum),
    contentId: z.string(),
    startDate: z.string(),
    type: z.string(),
    duration: z.nativeEnum(TripDurationEnum),
    createdAt: z.string(),
    updatedAt: z.string(),
})
