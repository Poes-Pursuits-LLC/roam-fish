import { getAuth } from '@clerk/react-router/ssr.server'
import type { Route } from '../routes/+types/billing'

export const billingLoader = async (args: Route.LoaderArgs) => {
    const { userId, has } = await getAuth(args)
    const isSubscriber = has({ plan: 'roam_premium' })

    return { userId, isSubscriber }
}
