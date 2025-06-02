import { useState } from 'react'
import { MapPin, Calendar, Fish, Clock } from 'lucide-react'

interface TripFormProps {
    onSubmit: (data: any) => void
}

const TripForm = ({ onSubmit }: TripFormProps) => {
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [fishType, setFishType] = useState('')
    const [duration, setDuration] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            location,
            date,
            fishType,
            duration,
        })
    }

    return (
        <div className="neo-card">
            <h2 className="neo-subheader mb-6 text-black">Trip Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-2 uppercase tracking-wide">
                        <MapPin className="w-5 h-5" />
                        Location
                    </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="neo-input w-full"
                        placeholder="Lake Tahoe, Pacific Ocean..."
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-2 uppercase tracking-wide">
                        <Calendar className="w-5 h-5" />
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="neo-input w-full"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-2 uppercase tracking-wide">
                        <Fish className="w-5 h-5" />
                        Target Fish
                    </label>
                    <select
                        value={fishType}
                        onChange={(e) => setFishType(e.target.value)}
                        className="neo-input w-full"
                        required
                    >
                        <option value="">Select fish type</option>
                        <option value="bass">Bass</option>
                        <option value="trout">Trout</option>
                        <option value="salmon">Salmon</option>
                        <option value="catfish">Catfish</option>
                        <option value="pike">Pike</option>
                        <option value="any">Any Fish</option>
                    </select>
                </div>

                <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-2 uppercase tracking-wide">
                        <Clock className="w-5 h-5" />
                        Duration
                    </label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="neo-input w-full"
                        required
                    >
                        <option value="">Select duration</option>
                        <option value="half-day">Half Day (4 hours)</option>
                        <option value="full-day">Full Day (8 hours)</option>
                        <option value="weekend">Weekend</option>
                        <option value="week">Week Long</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="neo-button w-full text-black bg-amber-400 text-xl py-4"
                >
                    Generate Trip Plan
                </button>
            </form>
        </div>
    )
}

export default TripForm
