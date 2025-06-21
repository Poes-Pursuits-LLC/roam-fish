import { BookOpen } from 'lucide-react'
import { NavLink } from 'react-router'
import type { Trip } from '~/core/trip/trip.model'

export const RecentTrips = ({ userRecentTrips }: { userRecentTrips: Trip[] }) => {
    return (
        <div className="neo-card bg-stone-100">
            <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-8 h-8 text-emerald-700" />
                <h2 className="text-2xl font-bold uppercase tracking-wide text-slate-800">
                    Recent Trips
                </h2>
            </div>
            <div className="space-y-4">
                {userRecentTrips.map((trip) => (
                    <div
                        key={trip.tripId}
                        className="border-4 border-black p-4 bg-stone-50"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-slate-800">
                                {trip.destinationName}
                            </h3>
                            <span className="text-sm font-semibold text-slate-600">
                                {new Date(trip.startDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-700">
                                {trip.duration}
                            </span>
                            <span className="bg-emerald-400 text-black px-2 py-1 text-sm font-bold border-2 border-black">
                                {trip.status}
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
    )
}