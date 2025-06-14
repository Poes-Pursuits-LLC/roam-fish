import { Calendar, Fish, MapPin, TrendingUp } from 'lucide-react'

export const UserStatsCards = ({
    config,
}: {
    config: {
        freeTripCount: number
        analytics?: {
            totalDaysFishing: number
            uniqueDestinations: string[]
            totalTripCost: number
            tripCount: number
        }
    }
}) => {
    const stats = getStats(config)

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
                <div key={index} className="neo-card bg-amber-50 text-center">
                    <stat.icon className="w-12 h-12 mx-auto mb-3 text-emerald-700" />
                    <div className="text-3xl font-black text-slate-800 mb-1">
                        {stat.value}
                    </div>
                    <div className="text-lg font-bold uppercase tracking-wide text-slate-800 mb-1">
                        {stat.title}
                    </div>
                    <div className="text-sm font-semibold text-slate-600">
                        {stat.subtitle}
                    </div>
                </div>
            ))}
        </div>
    )
}

const getStats = (config: {
    freeTripCount: number
    analytics?: {
        totalDaysFishing: number
        uniqueDestinations: string[]
        totalTripCost: number
        tripCount: number
    }
}) => {
    const analytics = config.analytics || {
        totalDaysFishing: 0,
        uniqueDestinations: [],
        totalTripCost: 0,
        tripCount: 0,
    }

    const avgCostPerTrip =
        analytics.tripCount > 0
            ? Math.round(analytics.totalTripCost / analytics.tripCount)
            : 0

    return [
        {
            icon: Fish,
            title: 'Free trips',
            value: `${3 - config.freeTripCount} of 3`,
            subtitle: 'remaining',
        },
        {
            icon: MapPin,
            title: 'Locations Visited',
            value: analytics.uniqueDestinations.length.toString(),
            subtitle: 'Different spots',
        },
        {
            icon: Calendar,
            title: 'Days Fishing',
            value: analytics.totalDaysFishing.toString(),
            subtitle: 'Total days',
        },
        {
            icon: TrendingUp,
            title: 'Avg Trip Cost',
            value: `$${avgCostPerTrip}`,
            subtitle: 'Per trip',
        },
    ]
}
