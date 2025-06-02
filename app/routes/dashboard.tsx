import {
    Fish,
    MapPin,
    Calendar,
    TrendingUp,
    BookOpen,
    Settings,
} from 'lucide-react'
import { SignOutButton } from '@clerk/react-router'
import { NavLink } from 'react-router'

const stats = [
    {
        icon: Fish,
        title: 'Total Catches',
        value: '47',
        subtitle: 'This season',
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

const recentTrips = [
    {
        location: 'Lake Tahoe',
        date: 'Dec 15, 2024',
        catches: 5,
        species: 'Rainbow Trout',
    },
    {
        location: 'Rocky Mountains',
        date: 'Dec 10, 2024',
        catches: 3,
        species: 'Brook Trout',
    },
    {
        location: 'Yellowstone River',
        date: 'Dec 5, 2024',
        catches: 7,
        species: 'Cutthroat Trout',
    },
]

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            <div className="px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="neo-header text-slate-800 mb-4">
                            Your Fishing Dashboard
                        </h1>
                        <p className="text-xl font-semibold text-slate-700">
                            Track your progress and plan your next adventure
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="neo-card bg-amber-50 text-center"
                            >
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

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Recent Trips */}
                        <div className="neo-card bg-stone-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <BookOpen className="w-8 h-8 text-emerald-700" />
                                <h2 className="text-2xl font-bold uppercase tracking-wide text-slate-800">
                                    Recent Trips
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {recentTrips.map((trip, index) => (
                                    <div
                                        key={index}
                                        className="border-4 border-black p-4 bg-stone-50"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-slate-800">
                                                {trip.location}
                                            </h3>
                                            <span className="text-sm font-semibold text-slate-600">
                                                {trip.date}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-slate-700">
                                                {trip.species}
                                            </span>
                                            <span className="bg-emerald-400 text-black px-2 py-1 text-sm font-bold border-2 border-black">
                                                {trip.catches} caught
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <NavLink to="/plan-trip">
                                <button className="neo-button w-full mt-6 bg-emerald-600 text-white border-black">
                                    Plan New Trip
                                </button>
                            </NavLink>
                        </div>

                        {/* Quick Actions */}
                        <div className="neo-card bg-emerald-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <Settings className="w-8 h-8 text-emerald-700" />
                                <h2 className="text-2xl font-bold uppercase tracking-wide text-slate-800">
                                    Quick Actions
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <NavLink to="/plan-trip" className="">
                                    <button className="neo-button w-full bg-amber-400 text-black border-black">
                                        Plan New Trip
                                    </button>
                                </NavLink>
                                <button className="neo-button w-full bg-stone-800 text-white border-black">
                                    Log a Catch
                                </button>
                                <button className="neo-button w-full bg-emerald-600 text-white border-black">
                                    Browse Destinations
                                </button>
                                <button className="neo-button w-full bg-amber-100 text-black border-black">
                                    Weather Forecast
                                </button>
                                <button className="neo-button w-full bg-orange-400 text-black border-black">
                                    Fishing Tips
                                </button>
                                <SignOutButton>
                                    <button className="neo-button w-full bg-red-500 text-white border-black">
                                        Sign Out
                                    </button>
                                </SignOutButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
