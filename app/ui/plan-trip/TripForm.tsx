import { useState } from 'react'
import { MapPin, Calendar, Clock, Users } from 'lucide-react'
import type { Destination } from '~/core/destination/destination.model'
import { Form, NavLink } from 'react-router'
import { TripDurationEnum, FishingStyleEnum } from '~/core/trip/trip.model'
import { SuspendedDestinationSelect } from './DestinationSelect'
import { StyleRadio } from './StyleRadio'

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
    const [fishingStyle, setFishingStyle] = useState<FishingStyleEnum>(FishingStyleEnum.FlyFishing)

    return (
        <div className="nature-card">
            <h2 className="nature-subheader mb-6 text-slate-800">
                Trip Details
            </h2>
            <Form action="/plan-trip" method="post" className="space-y-6">
                <input type="hidden" name="userId" value={userId ?? ''} />
                <input type="hidden" name="fishingStyle" value={fishingStyle} />
                <div>
                    <label className="flex items-center gap-3 text-base font-medium mb-2 text-slate-700">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <MapPin className="w-4 h-4 text-emerald-700" />
                        </div>
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
                    <label className="flex items-center gap-3 text-base font-medium mb-2 text-slate-700">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <Calendar className="w-4 h-4 text-emerald-700" />
                        </div>
                        Date
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="nature-input w-full"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center gap-3 text-base font-medium mb-2 text-slate-700">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <Users className="w-4 h-4 text-emerald-700" />
                        </div>
                        Headcount
                    </label>
                    <input
                        type="number"
                        name="headcount"
                        value={headcount}
                        onChange={(e) => setHeadcount(e.target.value)}
                        className="nature-input w-full"
                        placeholder="Enter number of travelers"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center gap-3 text-base font-medium mb-2 text-slate-700">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <Clock className="w-4 h-4 text-emerald-700" />
                        </div>
                        Duration
                    </label>
                    <select
                        value={duration}
                        name="duration"
                        onChange={(e) => setDuration(e.target.value)}
                        className="nature-input w-full"
                        required
                    >
                        {Object.values(TripDurationEnum).map((duration) => (
                            <option key={duration} value={duration}>
                                {duration}
                            </option>
                        ))}
                    </select>
                </div>

                <StyleRadio
                    value={fishingStyle}
                    onChange={setFishingStyle}
                    required
                />

                {(() => {
                    if (noMoreTrips) {
                        return (
                            <div className="flex flex-col gap-4">
                                <div className="text-red-600 nature-body text-lg">
                                    You have reached your free trip limit.
                                    Subscribe to get access to more!
                                </div>
                                <NavLink to="/billing">
                                    <button className="nature-button w-full text-xl py-4">
                                        Subscribe
                                    </button>
                                </NavLink>
                            </div>
                        )
                    }

                    if (visitorAlreadyCreatedTrip) {
                        return (
                            <div className="flex flex-col gap-4">
                                <div className="text-red-600 nature-body text-lg">
                                    You have already created a free trip. Sign
                                    up to create more!
                                </div>
                                <NavLink to="/login">
                                    <button className="nature-button w-full text-xl py-4">
                                        Sign Up Free
                                    </button>
                                </NavLink>
                            </div>
                        )
                    }

                    return (
                        <button
                            type="submit"
                            className="nature-button w-full text-xl py-4"
                        >
                            Generate Trip Plan
                        </button>
                    )
                })()}
            </Form>
        </div>
    )
}
