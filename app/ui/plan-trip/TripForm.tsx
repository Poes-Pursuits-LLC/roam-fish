import { useState } from 'react'
import { MapPin, Calendar, Clock, Users } from 'lucide-react'
import type { Destination } from '~/core/destination/destination.model'
import { Form, NavLink } from 'react-router'
import { TripDurationEnum } from '~/core/trip/trip.model'
import { SuspendedDestinationSelect } from './DestinationSelect'

export const TripForm = ({
    promise,
    userId,
    noMoreTrips,
    visitorAlreadyCreatedTrip,
}: {
    promise: Promise<Destination[]>
    userId: string | null
    noMoreTrips: boolean
    visitorAlreadyCreatedTrip: boolean
}) => {
    const [destination, setDestination] = useState<Destination | null>(null)
    const [startDate, setStartDate] = useState('')
    const [duration, setDuration] = useState('')
    const [headcount, setHeadcount] = useState('')

    return (
        <div className="neo-card">
            <h2 className="neo-subheader mb-6 text-black">Trip Details</h2>
            <Form action="/plan-trip" method="post" className="space-y-6">
                <input type="hidden" name="userId" value={userId ?? ''} />
                <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-2 uppercase tracking-wide">
                        <MapPin className="w-5 h-5" />
                        Destination
                    </label>
                </div>
                <SuspendedDestinationSelect
                    destinationsPromise={promise}
                    value={destination}
                    onChange={setDestination}
                    required
                />
                <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-2 uppercase tracking-wide">
                        <Calendar className="w-5 h-5" />
                        Date
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="neo-input w-full"
                        required
                    />
                </div>

                <label className="flex items-center gap-2 text-lg font-bold mb-2 uppercase tracking-wide">
                    <Users className="w-5 h-5" />
                    Headcount
                </label>
                <input
                    type="number"
                    name="headcount"
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="neo-input w-full"
                    placeholder="Enter number of travelers"
                    required
                />

                <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-2 uppercase tracking-wide">
                        <Clock className="w-5 h-5" />
                        Duration
                    </label>
                    <select
                        value={duration}
                        name="duration"
                        onChange={(e) => setDuration(e.target.value)}
                        className="neo-input w-full"
                        required
                    >
                        {Object.values(TripDurationEnum).map((duration) => (
                            <option key={duration} value={duration}>
                                {duration}
                            </option>
                        ))}
                    </select>
                </div>

                {(() => {
                    if (noMoreTrips) {
                        return (
                            <div className="flex flex-col gap-4">
                                <div className="text-red-400 text-lg">
                                    You have reached your free trip limit.
                                    Subscribe to get access to more!
                                </div>
                                <NavLink to="/billing">
                                    <button className="neo-button w-full text-black bg-red-400 text-xl py-4">
                                        Subscribe
                                    </button>
                                </NavLink>
                            </div>
                        )
                    }

                    if (visitorAlreadyCreatedTrip) {
                        return (
                            <div className="flex flex-col gap-4">
                                <div className="text-red-400 text-lg">
                                    You have already created a free trip. Sign
                                    up to create more!
                                </div>
                                <NavLink to="/login">
                                    <button className="neo-button w-full text-black bg-red-400 text-xl py-4">
                                        Sign Up Free
                                    </button>
                                </NavLink>
                            </div>
                        )
                    }

                    return (
                        <button
                            type="submit"
                            className="neo-button w-full text-black text-xl py-4"
                        >
                            Generate Trip Plan
                        </button>
                    )
                })()}
            </Form>
        </div>
    )
}
