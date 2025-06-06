import { Calendar, Clock, MapPin, Users } from 'lucide-react'

export const InfoCards = ({
    destinationName,
    date,
    duration,
    participants,
}: {
    destinationName: string
    date: string
    duration: string
    participants: number
}) => {
    return (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="neo-card bg-emerald-50">
                <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                    <span className="font-bold text-slate-800">Location</span>
                </div>
                <p className="text-slate-700 font-semibold">
                    {destinationName}
                </p>
            </div>

            <div className="neo-card bg-amber-50">
                <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-amber-700" />
                    <span className="font-bold text-slate-800">Date</span>
                </div>
                <p className="text-slate-700 font-semibold">{date}</p>
            </div>

            <div className="neo-card bg-amber-50">
                <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-amber-700" />
                    <span className="font-bold text-slate-800">Duration</span>
                </div>
                <p className="text-slate-700 font-semibold">{duration}</p>
            </div>

            <div className="neo-card bg-blue-50">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-blue-700" />
                    <span className="font-bold text-slate-800">
                        Participants
                    </span>
                </div>
                <p className="text-slate-700 font-semibold">
                    {participants} people
                </p>
            </div>
        </div>
    )
}
