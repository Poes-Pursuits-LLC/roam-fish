import { Calendar, Fish, MapPin, TrendingUp } from 'lucide-react'

export const UserStatsCards = ({
    config,
}: {
    config: {
        freeTripCount: number
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

const getStats = (config: { freeTripCount: number }) => {
    return (
        [
            {
                icon: Fish,
                title: 'Free trips',
                value: `${3 - config.freeTripCount} of 3`,
                subtitle: 'remaining',
            },
            {
                icon: MapPin,
                title: 'Locations Visited',
                value: '12',
                subtitle: 'Different spots',
            },
            {
                icon: Calendar,
                title: 'Days Fishing',
                value: '28',
                subtitle: 'This year',
            },
            {
                icon: TrendingUp,
                title: 'Success Rate',
                value: '73%',
                subtitle: 'Improving!',
            },
        ]
    )
}