import type { DynamoDBRecord } from 'aws-lambda'
import { getDaysFromDuration } from './get-days-from-duration'
import { extractTripData } from './extract-trip-data'
import { analyticsService } from '~/core/analytics/analytics.service'
import { TripStatusEnum } from '~/core/trip/trip.model'

export const handleTripRecord = async (record: DynamoDBRecord) => {
    const tripData = extractTripData(record)
    if (!tripData?.userId) {
        return
    }

    const {
        userId,
        duration,
        destinationName,
        status,
        oldStatus,
        netCostChange,
        currentBudgetTotal,
    } = tripData

    const daysToAdd = getDaysFromDuration(duration)
    const isNewPlannedTrip =
        oldStatus === TripStatusEnum.Generating &&
        status === TripStatusEnum.Planned

    const userAnalyticsSheet =
        await analyticsService.getUserAnalyticsSheet(userId)

    if (userAnalyticsSheet) {
        const updates: Partial<typeof userAnalyticsSheet> = {
            totalTripCost: userAnalyticsSheet.totalTripCost + netCostChange,
        }

        if (isNewPlannedTrip) {
            updates.tripCount = userAnalyticsSheet.tripCount + 1
            updates.totalDaysFishing =
                userAnalyticsSheet.totalDaysFishing + daysToAdd
            updates.uniqueDestinations = Array.from(
                new Set([
                    ...userAnalyticsSheet.uniqueDestinations,
                    destinationName,
                ]),
            )
        }

        await analyticsService.updateUserAnalyticsSheet(userId, updates)
    } else {
        if (isNewPlannedTrip) {
            await analyticsService.createUserAnalyticsSheet({
                userId,
                totalDaysFishing: daysToAdd,
                totalTripCost: currentBudgetTotal,
                tripCount: 1,
                uniqueDestinations: [destinationName],
            })
        }
    }
}
