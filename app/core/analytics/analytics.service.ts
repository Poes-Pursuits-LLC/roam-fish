import { createFormattedDate } from '~/utils'
import type { UserAnalytics } from './analytics.model'
import { DynamoUserAnalytics } from './user-analytics.dynamo'

const getUserAnalyticsSheet = async (userId: string) => {
    const { data: userAnalyticsSheet } = await DynamoUserAnalytics()
        .get({ userId })
        .go()
    return userAnalyticsSheet
}

const createUserAnalyticsSheet = async (
    createFields: Pick<
        UserAnalytics,
        | 'userId'
        | 'totalDaysFishing'
        | 'uniqueDestinations'
        | 'totalTripCost'
        | 'tripCount'
    >,
) => {
    await DynamoUserAnalytics().create(createFields).go()
}

const updateUserAnalyticsSheet = async (
    userId: string,
    updateFields: Partial<UserAnalytics>,
) => {
    await DynamoUserAnalytics()
        .patch({ userId })
        .set({ ...updateFields, updatedAt: createFormattedDate() })
        .go()
}

export const analyticsService = {
    getUserAnalyticsSheet,
    createUserAnalyticsSheet,
    updateUserAnalyticsSheet,
}
