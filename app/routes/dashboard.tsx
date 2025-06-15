import type { Route } from './+types/dashboard'
import Navbar from '~/ui/Navbar'
import { UserStatsCards } from '~/ui/dashboard/UserStatsCards'
import { QuickActions } from '~/ui/dashboard/QuickActions'
import { RecentTrips } from '~/ui/dashboard/RecentTrips'
import { dashboardLoader } from '~/loaders/dashboard.loader'
import type { UserAnalytics } from '~/core/analytics/analytics.model'

export async function loader(args: Route.LoaderArgs) {
    return await dashboardLoader(args)
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
    const { userId, isSubscriber, freeTripCount, userAnalyticsSheet } =
        loaderData as {
            userId: string
            isSubscriber: boolean
            freeTripCount: number
            userAnalyticsSheet: UserAnalytics
        }

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
                                userAnalyticsSheet.totalDaysFishing,
                            uniqueDestinations:
                                userAnalyticsSheet.uniqueDestinations,
                            totalTripCost: userAnalyticsSheet.totalTripCost,
                            tripCount: userAnalyticsSheet.tripCount,
                        }}
                    />
                    <div className="grid lg:grid-cols-2 gap-8">
                        <RecentTrips />
                        <QuickActions />
                    </div>
                </div>
            </div>
        </div>
    )
}
