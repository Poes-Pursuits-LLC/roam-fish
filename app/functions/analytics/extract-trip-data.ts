import type { DynamoDBRecord } from 'aws-lambda'
import { TripDurationEnum } from '~/core/trip/trip.model'

export type ExtractedTripData = {
    userId: string
    destinationName: string
    startDate: string
    duration: TripDurationEnum
    totalCost: number
}

type BudgetItem = {
    M: {
        id: { S: string }
        name: { S: string }
        price: { S: string }
    }
}

export const extractTripData = (
    record: DynamoDBRecord,
): ExtractedTripData | null => {
    const trip = record.dynamodb?.NewImage

    if (!trip?.userId.S) {
        return null
    }

    const userId = trip!.userId.S!
    const destinationName = trip!.destinationName.S!
    const startDate = trip!.startDate.S!
    const duration = trip!.duration.S as TripDurationEnum
    const budgetList = (trip!.budgetList?.L || []) as BudgetItem[]
    const totalCost = budgetList.reduce((sum: number, item: BudgetItem) => {
        const price = parseFloat(item.M.price.S) || 0
        return sum + price
    }, 0)

    return {
        userId,
        destinationName,
        startDate,
        duration,
        totalCost,
    }
}
