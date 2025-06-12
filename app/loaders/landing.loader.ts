import { getAuth } from '@clerk/react-router/ssr.server'
import type { Route } from '../routes/+types/landing'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'

export const landingLoader = async (args: Route.LoaderArgs) => {
    const { userId, has } = await getAuth(args)
    const isSubscriber = has({ plan: 'roam_premium' })

    const client = hc<AppType>(process.env.SERVER_URL!)
    const getDestinationsPromise = client.destinations
        .$get()
        .then((res) => res.json())
        .then((data) => data.destinations)

    return { getDestinationsPromise, userId, isSubscriber }
}
