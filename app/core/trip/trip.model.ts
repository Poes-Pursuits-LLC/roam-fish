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
