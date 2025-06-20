import z from 'zod'

export interface Trip {
    tripId: string
    destinationName: string
    headcount: string
    packingList: PackingListItem[]
    budgetList: BudgetItem[]
    checkList: ChecklistItem[]
    status: TripStatusEnum
    contentId: string
    startDate: string
    type: string
    duration: TripDurationEnum
    name?: string
    userId?: string
    airport?: string
    cities?: string[]
    notes?: string
    flies?: string[]
    hatches?: string[]
    weather?: string
    fishingSummary?: string
    createdAt: string
    updatedAt: string
    expireAt?: string
}

interface PackingListItem {
    id: string
    category: string
    name: string
    quantity: string
}

export interface BudgetItem {
    id: string
    name: string
    price: string
}

export interface ChecklistItem {
    id: string
    name: string
    completed: boolean
}

export enum TripStatusEnum {
    Generating = 'Generating',
    Planned = 'Planned',
    Completed = 'Completed',
}

export enum TripDurationEnum {
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

export const BudgetItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.string(),
})

export const ChecklistItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    completed: z.boolean(),
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
    budgetList: z.array(BudgetItemSchema),
    checkList: z.array(ChecklistItemSchema),
    status: z.nativeEnum(TripStatusEnum),
    contentId: z.string(),
    startDate: z.string(),
    type: z.string(),
    duration: z.nativeEnum(TripDurationEnum),
    createdAt: z.string(),
    updatedAt: z.string(),
})
