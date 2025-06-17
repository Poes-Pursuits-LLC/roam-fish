import type { Route } from './+types/trip'
import { Navbar } from '~/ui/Navbar'
import { InfoCards } from '~/ui/trip/Trip.InfoCards'
import { Budget } from '~/ui/trip/Budget'
import { Notes } from '~/ui/trip/Notes'
import { PackingList } from '~/ui/trip/PackingList'
import { Tactics } from '~/ui/trip/Tactics'
import { TravelDetails } from '~/ui/trip/TravelDetails'
import { Checklist } from '~/ui/trip/Checklist'
import { tripLoader } from '~/loaders/trip.loader'
import { Form } from 'react-router'
import { tripAction } from '~/actions/trip.action'
import { TripHeader } from '~/ui/trip/TripHeader'

export async function loader(args: Route.LoaderArgs) {
    return await tripLoader(args)
}

export async function action(args: Route.ActionArgs) {
    await tripAction(args)
}

// TODO: enforce limits on length of notes, packing list, checklist, budget list
// TODO: make fishing summary behind paywall.
// TODO: new licensing and local regulations section, behind paywall as well.

export default function TripPage({ loaderData }: Route.ComponentProps) {
    const { trip, userId, isSubscriber } = loaderData
    const canEditTrip = Boolean(userId)

    return (
        <div className="min-h-screen bg-stone-100">
            <Navbar userId={userId} isSubscriber={isSubscriber} />
            <div className="px-6 py-8">
                <Form method="POST">
                    <div className="max-w-7xl mx-auto">
                        <TripHeader
                            tripName={trip!.name}
                            canEditTrip={canEditTrip}
                            userId={userId}
                        />
                        <div className="relative">
                            <InfoCards
                                destinationName={trip.destinationName}
                                date={trip.startDate}
                                duration={trip.duration}
                                participants={trip.headcount}
                            />
                            <TravelDetails
                                airport={trip.airport!}
                                cities={trip.cities!}
                            />
                            <div className="grid lg:grid-cols-3 gap-8 mb-8">
                                <Budget budgetList={trip.budgetList} />
                                <PackingList list={trip!.packingList} />
                                <Checklist checkList={trip.checkList} />
                            </div>
                            <Tactics
                                fishingSummary={trip.fishingSummary!}
                                weather={trip.weather!}
                                flies={trip.flies!}
                                hatches={trip.hatches!}
                            />
                            <Notes notes={trip.notes ?? ''} />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
