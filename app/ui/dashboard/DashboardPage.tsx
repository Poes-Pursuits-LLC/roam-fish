import type { Route } from '../../routes/+types/dashboard'
import { Navbar } from '../Navbar'
import { UserStatsCards } from './UserStatsCards'
import { RecentTrips } from './RecentTrips'
import { QuickActions } from './QuickActions'
import { Suspense, useEffect } from 'react'
import { deleteLocalTripId, getLocalTripId } from '~/utils'
import { useSubmit } from 'react-router'
import { RecentTripsSkeleton } from './RecentTripsSkeleton'

export const DashboardPage = (
    loaderData: Route.ComponentProps['loaderData'],
) => {
    const {
        userId,
        isSubscriber,
        freeTripCount,
        userAnalyticsSheet,
        getRecentTripsPromise,
    } = loaderData
    const submit = useSubmit()

    useEffect(() => {
        const localTripId = getLocalTripId()
        if (localTripId) {
            submit(
                { userId, tripId: localTripId },
                { action: '/dashboard', method: 'post' },
            )
            deleteLocalTripId()
        }
    }, [])

    return (
        <div className="min-h-screen bg-stone-50">
            <Navbar userId={userId} isSubscriber={isSubscriber} />
            <div className="px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <UserStatsCards
                        config={{
                            freeTripCount,
                            isSubscriber,
                            totalDaysFishing:
                                userAnalyticsSheet?.totalDaysFishing ?? 0,
                            uniqueDestinations:
                                userAnalyticsSheet?.uniqueDestinations ?? [],
                            totalTripCost:
                                userAnalyticsSheet?.totalTripCost ?? 0,
                            tripCount: userAnalyticsSheet?.tripCount ?? 0,
                        }}
                    />
                    <div className="grid lg:grid-cols-2 gap-8">
                        <Suspense fallback={<RecentTripsSkeleton />}>
                            <RecentTrips promise={getRecentTripsPromise} />
                        </Suspense>
                        <QuickActions />
                    </div>
                </div>
            </div>
        </div>
    )
}
