import { redirect } from 'react-router'
import type { Route } from '../routes/+types/dashboard'
import { getAuth } from '@clerk/react-router/ssr.server'

export const dashboardLoader = async (args: Route.LoaderArgs) => {
    const { userId, has } = await getAuth(args)
    if (!userId) {
        return redirect('/login')
    }
    const isSubscriber = has({ plan: 'roam_premium' })

    return { userId, isSubscriber }
}
