import type { DynamoDBRecord } from 'aws-lambda'
import { TripDurationEnum } from '~/core/trip/trip.model'

export type ExtractedTripData = {
    userId: string
    destinationName: string
    startDate: string
    duration: TripDurationEnum
    netCostChange: number
}

type BudgetItem = {
    M: {
        id: { S: string }
        name: { S: string }
        price: { S: string }
    }
}

const calculateTotalCost = (budgetList: BudgetItem[] = []) => {
    return budgetList.reduce((sum: number, item: BudgetItem) => {
        const price = parseFloat(item.M.price.S) || 0
        return sum + price
    }, 0)
}

export const extractTripData = (
    record: DynamoDBRecord,
): ExtractedTripData | null => {
    const oldImage = record.dynamodb?.OldImage
    const newImage = record.dynamodb?.NewImage

    if (!newImage?.userId?.S) {
        return null
    }

    const userId = newImage.userId.S!
    const destinationName = newImage.destinationName.S!
    const startDate = newImage.startDate.S!
    const duration = newImage.duration.S! as TripDurationEnum

    const oldBudgetList = (oldImage?.budgetList?.L || []) as BudgetItem[]
    const newBudgetList = (newImage.budgetList?.L || []) as BudgetItem[]

    const oldTotalCost = calculateTotalCost(oldBudgetList)
    const newTotalCost = calculateTotalCost(newBudgetList)
    const netCostChange = newTotalCost - oldTotalCost

    return {
        userId,
        destinationName,
        startDate,
        duration,
        netCostChange,
    }
}
