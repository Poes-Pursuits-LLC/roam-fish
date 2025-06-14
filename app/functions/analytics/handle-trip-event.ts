import type { DynamoDBRecord } from 'aws-lambda'
import { getDaysFromDuration } from './get-days-from-duration'
import { extractTripData } from './extract-trip-data'
import { analyticsService } from '~/core/analytics/analytics.service'

export const handleTripEvent = async (record: DynamoDBRecord) => {
    const tripData = extractTripData(record)
    if (!tripData?.userId) {
        return
    }

    const { userId, duration, destinationName, totalCost } = tripData
    const daysToAdd = getDaysFromDuration(duration)

    const { data: existingUserAnalytics } =
        await analyticsService.getUserAnalyticsSheet(userId)

    if (existingUserAnalytics) {
        await analyticsService.updateUserAnalyticsSheet(userId, {
            tripCount: existingUserAnalytics.tripCount,
            totalDaysFishing: existingUserAnalytics.totalDaysFishing,
            totalTripCost: existingUserAnalytics.totalTripCost,
            uniqueDestinations: existingUserAnalytics.uniqueDestinations,
        })
    } else {
        await analyticsService.createUserAnalyticsSheet({
            userId,
            totalDaysFishing: daysToAdd,
            totalTripCost: totalCost,
            tripCount: 1,
            uniqueDestinations: [destinationName],
        })
    }
}
