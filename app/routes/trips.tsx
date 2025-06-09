import { redirect } from 'react-router'
import { Suspense } from 'react'
import Navbar from '~/ui/Navbar'
import { Trips } from '~/ui/trips/Trips'
import { TripsSkeleton } from '~/ui/trips/TripsSkeleton'
import { getAuth } from '@clerk/react-router/ssr.server'
import type { Route } from './+types/trips'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'

export const loader = async (args: Route.LoaderArgs) => {
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
}

export default function TripsRoute({ loaderData }: Route.ComponentProps) {
    const { getTripsPromise, userId, isSubscriber } = loaderData

    return (
        <div className="min-h-screen bg-stone-100">
            <Navbar userId={userId} isSubscriber={isSubscriber} />

            <div className="px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="neo-header text-slate-800 mb-4">
                                Your Trips
                            </h1>
                            <p className="text-xl font-semibold text-slate-700">
                                Track your fishing adventures and plan new ones!
                            </p>
                        </div>
                    </div>

                    <Suspense fallback={<TripsSkeleton />}>
                        <Trips promise={getTripsPromise} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
