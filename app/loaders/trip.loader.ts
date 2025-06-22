import { getAuth } from '@clerk/react-router/ssr.server'
import type { Route } from '../routes/+types/trip'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'

export const tripLoader = async (args: Route.LoaderArgs) => {
    try {
        const { userId, has } = await getAuth(args)
        const isSubscriber = has({ plan: 'roam_premium' })
        const { tripId } = args.params

        const client = hc<AppType>(process.env.SERVER_URL!)
        const trip = await client.getTrip
            .$get({ query: { tripId } })
            .then((res) => res.json())
            .then((data) => data.trip)

        return { userId, isSubscriber, trip }
    } catch (error) {
        throw Error(error)
    }
}
