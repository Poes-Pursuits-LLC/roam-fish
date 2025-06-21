import type { Route } from '../../routes/+types/plan-trip'
import { BackButton } from '../BackButton'
import { PlanTripHeader } from './PlanTripHeader'
import { TripForm } from './TripForm'
import { TripLoader } from './TripLoader'
import { getLocalTripId } from '~/utils'

export const PlanTripPage = ({
    loaderData,
    actionData,
}: {
    loaderData: Route.ComponentProps['loaderData']
    actionData: Route.ComponentProps['actionData']
}) => {
    const { getDestinationsPromise, userId, freeTripCount, isSubscriber } =
        loaderData
    const { tripId } = actionData || { tripId: null }
    const visitorAlreadyCreatedTrip = Boolean(getLocalTripId())
    const noMoreTrips = Boolean(
        freeTripCount && freeTripCount >= 3 && !isSubscriber,
    )

    return (
        <div className="min-h-screen">
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
                                    visitorAlreadyCreatedTrip={
                                        visitorAlreadyCreatedTrip
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
