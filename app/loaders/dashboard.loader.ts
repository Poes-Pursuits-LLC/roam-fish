import { redirect } from 'react-router'
import type { Route } from '../routes/+types/dashboard'
import { getAuth } from '@clerk/react-router/ssr.server'
import { createClerkClient } from '@clerk/backend'

export const dashboardLoader = async (args: Route.LoaderArgs) => {
    const { userId, has } = await getAuth(args)
    if (!userId) {
        return redirect('/login')
    }
    const isSubscriber = has({ plan: 'roam_premium' })
    const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
    })
    const user = await clerkClient.users.getUser(userId)
    const freeTripCount =
        (user.privateMetadata as { freeTripCount: number })
            ?.freeTripCount ?? 0

    return { userId, isSubscriber, freeTripCount }
}
