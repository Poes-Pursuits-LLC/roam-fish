import { Calendar, Clock, Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Trip } from '~/core/trip/trip.model'

export const TripCard = ({ trip }: { trip: Trip }) => {
    const navigate = useNavigate()

    return (
        <div className="neo-card group cursor-pointer hover:translate-x-2 hover:translate-y-2 transition-transform bg-stone-50 flex flex-col">
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold uppercase tracking-wide text-slate-800">
                        {trip.destinationName}
                    </h3>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="w-5 h-5 text-emerald-700" />
                    <span className="font-semibold text-slate-700">
                        {new Date(trip.startDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-5 h-5 text-emerald-700" />
                    <span className="font-semibold text-slate-700">
                        {trip.duration}
                    </span>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => navigate(`/trip/${trip.tripId}`)}
                        className="neo-button w-full bg-emerald-600 text-white border-black flex items-center justify-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        View Trip
                    </button>
                </div>
            </div>
        </div>
    )
}
