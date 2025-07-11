import { Fish } from 'lucide-react'
import { useState } from 'react'
import { TripCard } from './TripCard'
import type { Trip } from '~/core/trip/trip.model'
import { use } from 'react'

export const Trips = ({ promise }: { promise: Promise<Trip[]> }) => {
    const trips = use(promise)
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

    const upcomingTrips = trips.filter(
        (trip: Trip) => new Date(trip.startDate) > new Date(),
    )
    const pastTrips = trips.filter(
        (trip: Trip) => new Date(trip.startDate) < new Date(),
    )

    const renderTrips = (trips: Trip[]) => {
        if (trips.length === 0) {
            return (
                <div className="col-span-full text-center py-12">
                    <Fish className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                    <h3 className="text-2xl font-bold text-slate-600 mb-2">
                        No {activeTab} trips
                    </h3>
                    <p className="text-slate-500 mb-6">
                        Ready to plan your next fishing adventure?
                    </p>
                </div>
            )
        }

        return trips.map((trip: Trip) => (
            <TripCard key={trip.tripId} trip={trip} />
        ))
    }

    return (
        <div className="neo-card bg-stone-50">
            <div className="flex items-center gap-3 mb-6">
                <Fish className="w-6 h-6 text-emerald-700" />
                <h2 className="neo-subheader text-slate-800">Your Trips</h2>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 font-bold border-2 border-black whitespace-nowrap transition-colors ${
                        activeTab === 'upcoming'
                            ? 'bg-amber-400 text-black'
                            : 'bg-white text-slate-800 hover:bg-stone-50'
                    }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-4 py-2 font-bold border-2 border-black whitespace-nowrap transition-colors ${
                        activeTab === 'past'
                            ? 'bg-emerald-600 text-black'
                            : 'bg-white text-slate-800 hover:bg-stone-50'
                    }`}
                >
                    Past Trips
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {renderTrips(
                    activeTab === 'upcoming' ? upcomingTrips : pastTrips,
                )}
            </div>
        </div>
    )
}
