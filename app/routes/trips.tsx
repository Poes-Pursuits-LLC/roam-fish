import { Suspense } from 'react'
import { Navbar } from '~/ui/Navbar'
import { Trips } from '~/ui/trips/Trips'
import { TripsSkeleton } from '~/ui/trips/TripsSkeleton'
import type { Route } from './+types/trips'
import { tripsLoader } from '~/loaders/trips.loader'

export const loader = async (args: Route.LoaderArgs) => {
    const response = await tripsLoader(args)
    if (response instanceof Response) {
        return response
    }
    const { getTripsPromise, userId, isSubscriber } = response
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
