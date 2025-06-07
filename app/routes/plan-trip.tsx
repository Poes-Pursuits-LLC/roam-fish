import { ArrowLeft, Fish } from 'lucide-react'
import TripForm from '~/ui/plan-trip/TripForm'
import TripLoader from '~/ui/plan-trip/TripLoader'
import { NavLink } from 'react-router'
import type { Route } from './+types/plan-trip'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'
import type { TripDurationEnum } from '~/core/trip/trip.model'
import { getAuth } from '@clerk/react-router/ssr.server'

export async function loader(args: Route.LoaderArgs) {
    const { userId } = await getAuth(args)

    const client = hc<AppType>(process.env.SERVER_URL!)
    const getDestinationsPromise = client.destinations
        .$get()
        .then((res) => res.json())
        .then((data) => data.destinations)

    return { userId, getDestinationsPromise }
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData()
    const destinationName = String(formData.get('destinationName'))
    const startDate = String(formData.get('startDate'))
    const headcount = String(formData.get('headcount'))
    const duration = String(formData.get('duration')) as TripDurationEnum
    const userId = String(formData.get('userId'))

    const client = hc<AppType>(process.env.SERVER_URL!)
    const tripId = await client.createTrip
        .$post({
            json: {
                destinationName,
                startDate,
                headcount,
                duration,
                ...(userId && { userId }),
            },
        })
        .then((res) => res.json())
        .then((data) => data.tripId)

    return { tripId }
}

export default function PlanTripPage({
    loaderData,
    actionData,
}: Route.ComponentProps) {
    const { getDestinationsPromise, userId } = loaderData
    const { tripId } = actionData || { tripId: null }

    return (
        <div className="min-h-screen bg-stone-100">
            <div className="px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <NavLink to="/">
                        <button className="neo-button mb-8 flex items-center gap-2 bg-slate-700 text-slate-100 border-black">
                            <ArrowLeft className="w-5 h-5" />
                            Back Home
                        </button>
                    </NavLink>

                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <Fish className="h-6 w-6" />
                        </div>
                        <h1 className="neo-header text-slate-800 mb-4">
                            Plan Your Trip
                        </h1>
                        <p className="text-2xl font-bold text-slate-700">
                            Let&apos;s catch some fish!
                        </p>
                    </div>

                    {tripId ? (
                        <TripLoader tripId={tripId} />
                    ) : (
                        <div className="flex justify-center">
                            <div className="w-full max-w-lg">
                                <TripForm
                                    promise={getDestinationsPromise}
                                    userId={userId}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
