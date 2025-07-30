import { BookOpen } from 'lucide-react'
import { use } from 'react'
import { NavLink } from 'react-router'
import type { Trip } from '~/core/trip/trip.model'

export const RecentTrips = ({ promise }: { promise: Promise<Trip[]> }) => {
    const recentTrips = use(promise)

    return (
        <div className="nature-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="nature-subheader text-slate-800">
                    Recent Trips
                </h2>
            </div>
            <div className="space-y-4">
                {recentTrips.map((trip) => (
                    <div
                        key={trip.tripId}
                        className="bg-slate-50 rounded-lg border border-slate-200 p-4 hover:bg-slate-100 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-slate-800">
                                {trip.destinationName}
                            </h3>
                            <span className="text-sm font-semibold text-slate-600">
                                {new Date(trip.startDate).toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    },
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-700">
                                {trip.duration}
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-sm font-semibold rounded-lg border border-emerald-200">
                                {trip.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <NavLink to="/plan-trip">
                <button className="nature-button w-full mt-6">
                    Plan New Trip
                </button>
            </NavLink>
        </div>
    )
}
