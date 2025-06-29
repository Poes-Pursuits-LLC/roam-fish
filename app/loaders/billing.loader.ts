import { getAuth } from '@clerk/react-router/ssr.server'
import type { Route } from '../routes/+types/billing'
import { createClerkClient } from '@clerk/backend'
import { redirect } from 'react-router'

export const billingLoader = async (args: Route.LoaderArgs) => {
    try {
        const { userId, has } = await getAuth(args)
        if (!userId) {
            return redirect('/login')
        }

        const subscriptionUpdated = Boolean(new URL(args.request.url).searchParams.get('update'))
        const isSubscriber = has({ plan: 'roam_premium' })

        if (subscriptionUpdated && !isSubscriber) {
            const client = createClerkClient({
                secretKey: process.env.CLERK_SECRET_KEY,
            })
            await client.users.updateUserMetadata(userId, {
                privateMetadata: {
                    freeTripCount: 3
                }
            })
        }

        return { userId, isSubscriber }
    } catch (error) {
        throw Error(error)
    }
}
