import { Form } from 'react-router'
import type { Route } from '../../routes/+types/trip'
import { Navbar } from '../Navbar'
import { TripHeader } from './TripHeader'
import { InfoCards } from './Trip.InfoCards'
import { TravelDetails } from './TravelDetails'
import { Tactics } from './Tactics'
import { Notes } from './Notes'
import { Budget } from './Budget'
import { PackingList } from './PackingList'
import { Checklist } from './Checklist'
import { LicensingRegulations } from './LicensingRegulations'

export const TripPage = ({
    loaderData,
}: {
    loaderData: Route.ComponentProps['loaderData']
}) => {
    const { trip, userId, isSubscriber } = loaderData
    const canEditTrip = Boolean(userId)

    return (
        <div className="min-h-screen bg-stone-100">
            <Navbar userId={userId} isSubscriber={isSubscriber} />
            <div className="px-4 sm:px-6 py-4 sm:py-8">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                                <Budget budgetList={trip.budgetList} />
                                <PackingList list={trip!.packingList} />
                                <Checklist checkList={trip.checkList} />
                            </div>
                            <Tactics
                                fishingSummary={trip.fishingSummary!}
                                weather={trip.weather!}
                                flies={trip.flies!}
                                hatches={trip.hatches!}
                                userId={userId}
                                isSubscriber={isSubscriber}
                            />
                            <LicensingRegulations userId={userId} isSubscriber={isSubscriber} />
                            <Notes notes={trip.notes ?? ''} />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
