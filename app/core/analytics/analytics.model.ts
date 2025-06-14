export interface UserAnalytics {
    userId: string
    totalDaysFishing: number
    totalTripCost: number
    tripCount: number
    uniqueDestinations: string[]
    type?: string
    createdAt?: string
    updatedAt?: string
}
