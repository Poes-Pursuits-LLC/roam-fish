import type { DynamoDBRecord } from 'aws-lambda'
import { getDaysFromDuration } from './get-days-from-duration'
import { extractTripData } from './extract-trip-data'
import { analyticsService } from '~/core/analytics/analytics.service'

export const handleTripRecord = async (record: DynamoDBRecord) => {
    const tripData = extractTripData(record)
    if (!tripData?.userId) {
        return
    }

    const { userId, duration, destinationName, netCostChange, currentBudgetTotal } = tripData

    const daysToAdd = getDaysFromDuration(duration)

    const userAnalyticsSheet =
        await analyticsService.getUserAnalyticsSheet(userId)

    if (userAnalyticsSheet) {
        await analyticsService.updateUserAnalyticsSheet(userId, {
            tripCount: userAnalyticsSheet.tripCount + 1,
            totalDaysFishing: userAnalyticsSheet.totalDaysFishing + daysToAdd,
            totalTripCost: userAnalyticsSheet.totalTripCost + netCostChange,
            uniqueDestinations: Array.from(
                new Set([
                    ...userAnalyticsSheet.uniqueDestinations,
                    destinationName,
                ]),
            ),
        })
    } else {
        await analyticsService.createUserAnalyticsSheet({
            userId,
            totalDaysFishing: daysToAdd,
            totalTripCost: currentBudgetTotal,
            tripCount: 1,
            uniqueDestinations: [destinationName],
        })
    }
}
