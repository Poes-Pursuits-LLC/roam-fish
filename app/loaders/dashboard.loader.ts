import { redirect } from 'react-router'
import type { Route } from '../routes/+types/dashboard'
import { getAuth } from '@clerk/react-router/ssr.server'
import { createClerkClient } from '@clerk/backend'
import type { AppType } from '~/server/main'
import { hc } from 'hono/client'

export const dashboardLoader = async (args: Route.LoaderArgs) => {
    const { userId, has } = await getAuth(args)
    if (!userId) {
        return redirect('/login')
    }

    const isSubscriber = has({ plan: 'roam_premium' })

    const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
    })
    const client = hc<AppType>(process.env.SERVER_URL!)

    const [user, userAnalyticsSheet, userRecentTrips] = await Promise.all([
        clerkClient.users.getUser(userId),
        client.analytics
            .$get({ query: { userId } })
            .then((res) => res.json())
            .then((data) => data.userAnalyticsSheet),
        client.getUserTrips.$get({
            query: {
                userId,
                count: '3',
            }
        }).then((response) => response.json()).then((data) => data.trips)
    ])
    const freeTripCount =
        (user.privateMetadata as { freeTripCount: number })?.freeTripCount ?? 0

    return { userId, isSubscriber, freeTripCount, userAnalyticsSheet, userRecentTrips }
}
