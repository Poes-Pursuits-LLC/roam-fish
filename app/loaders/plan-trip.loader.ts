import { getAuth } from '@clerk/react-router/ssr.server'
import type { Route } from '../routes/+types/plan-trip'
import { createClerkClient } from '@clerk/backend'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'

export const planTripLoader = async (args: Route.LoaderArgs) => {
    try {
        const { userId, has } = await getAuth(args)
        const isSubscriber = has({ plan: 'roam_premium' })

        let freeTripCount: number | undefined
        if (userId) {
            const clerkClient = createClerkClient({
                secretKey: process.env.CLERK_SECRET_KEY,
            })
            const user = await clerkClient.users.getUser(userId)
            freeTripCount = (user.privateMetadata as { freeTripCount: number })
                ?.freeTripCount
        }

        const client = hc<AppType>(process.env.SERVER_URL!)
        const getDestinationsPromise = client.destinations
            .$get()
            .then((res) => res.json())
            .then((data) => data.destinations)

        return { userId, getDestinationsPromise, freeTripCount, isSubscriber }
    } catch (error) {
        throw Error(error)
    }
}
