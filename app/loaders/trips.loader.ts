import { getAuth } from '@clerk/react-router/ssr.server'
import type { Route } from '../routes/+types/trips'
import { redirect } from 'react-router'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'

export const tripsLoader = async (args: Route.LoaderArgs) => {
    try {
        const { userId, has } = await getAuth(args)
        const isSubscriber = has({ plan: 'roam_premium' })
        if (!userId) {
            return redirect('/login')
        }

        const client = hc<AppType>(process.env.SERVER_URL!)
        const getTripsPromise = client.getUserTrips
            .$get({ query: { userId } })
            .then((res) => res.json())
            .then((data) => data.trips)

        return { getTripsPromise, userId, isSubscriber }
    } catch (error) {
        throw Error(error)
    }
}
