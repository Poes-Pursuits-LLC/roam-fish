import TripForm from '~/ui/plan-trip/TripForm'
import TripLoader from '~/ui/plan-trip/TripLoader'
import { planTripLoader } from '~/loaders/plan-trip.loader'
import { PlanTripHeader } from '~/ui/plan-trip/PlanTripHeader'
import { planTripAction } from '~/actions/plan-trip.action'
import { BackButton } from '~/ui/BackButton'
import type { Route } from './+types/plan-trip'

export async function loader(args: Route.LoaderArgs) {
    return await planTripLoader(args)
}

export async function action(args: Route.ActionArgs) {
    return await planTripAction(args)
}

export default function PlanTripPage({
    loaderData,
    actionData,
}: Route.ComponentProps) {
    const { getDestinationsPromise, userId, freeTripCount, isSubscriber } =
        loaderData
    const { tripId } = actionData || { tripId: null }
    const noMoreTrips = Boolean(
        freeTripCount && freeTripCount >= 3 && !isSubscriber,
    )

    return (
        <div className="min-h-screen bg-stone-100">
            <div className="px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <BackButton />
                    <PlanTripHeader />
                    {tripId ? (
                        <TripLoader tripId={tripId} />
                    ) : (
                        <div className="flex justify-center">
                            <div className="w-full max-w-lg">
                                <TripForm
                                    promise={getDestinationsPromise}
                                    userId={userId}
                                    noMoreTrips={noMoreTrips}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
