import { hc } from 'hono/client'
import type { Route } from './+types/trip'
import type { AppType } from '~/server/main'
import Navbar from '~/ui/Navbar'
import { InfoCards } from '~/ui/trip/Trip.InfoCards'
import { Budget } from '~/ui/trip/Budget'
import { Notes } from '~/ui/trip/Notes'
import { PackingList } from '~/ui/trip/PackingList'
import { Tactics } from '~/ui/trip/Tactics'
import { TravelDetails } from '~/ui/trip/TravelDetails'
import { Checklist } from '~/ui/trip/Checklist'
import { getAuth } from '@clerk/react-router/ssr.server'

export async function loader(args: Route.LoaderArgs) {
    const { userId } = await getAuth(args)
    const { tripId } = args.params

    const client = hc<AppType>(process.env.SERVER_URL!)
    const trip = await client.getTrip
        .$get({ query: { tripId } })
        .then((res) => res.json())
        .then((data) => data.trip)

    return { trip, userId }
}

export default function TripPage({ loaderData }: Route.ComponentProps) {
    const { trip, userId } = loaderData

    return (
        <div className="min-h-screen bg-stone-100">
            <Navbar userId={userId} />
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="neo-header text-slate-800">
                            {trip.name}
                        </h1>
                    </div>
                    <InfoCards
                        destinationName={trip.destinationName}
                        date={trip.startDate}
                        duration={trip.duration}
                        participants={trip.headcount}
                    />
                    <TravelDetails
                        airport={trip.airport}
                        cities={trip.cities}
                    />
                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        <Budget />
                        <PackingList list={trip.packingList} />
                        <Checklist />
                    </div>
                    <Tactics
                        tacticsSummary={trip.tacticsSummary}
                        weather={trip.weather}
                        flies={trip.flies}
                        hatches={trip.hatches}
                    />
                    <Notes />
                </div>
            </div>
        </div>
    )
}
