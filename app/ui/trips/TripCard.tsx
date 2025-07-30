import { Calendar, Clock, Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Trip } from '~/core/trip/trip.model'

export const TripCard = ({ trip }: { trip: Trip }) => {
    const navigate = useNavigate()

    return (
        <div className="nature-card group cursor-pointer flex flex-col">
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-slate-800">
                        {trip.destinationName}
                    </h3>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <Calendar className="w-4 h-4 text-emerald-700" />
                        </div>
                        <span className="font-medium text-slate-700">
                            {new Date(trip.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <Clock className="w-4 h-4 text-emerald-700" />
                        </div>
                        <span className="font-medium text-slate-700">
                            {trip.duration}
                        </span>
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => navigate(`/trip/${trip.tripId}`)}
                        className="nature-button w-full flex items-center justify-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        View Trip
                    </button>
                </div>
            </div>
        </div>
    )
}
