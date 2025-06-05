export interface Trip {
    tripId: string
    name?: string
    description?: string
    userId?: string
    airport?: string
    cities?: string[]
    packingListing?: PackingListItem[]
    status: TripStatusEnum
    startDate: string
    endDate: string
    createdAt: string
    updatedAt: string
}

interface PackingListItem {
    name: string
    quantity: number
}

enum TripStatusEnum {
    Generating = 'Generating',
    Planned = 'Planned',
    Completed = 'Completed',
}
