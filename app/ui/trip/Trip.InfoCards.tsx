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
    participants: string
}) => {
    return (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="nature-card">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <MapPin className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="font-semibold text-slate-800">
                        Location
                    </span>
                </div>
                <p className="text-slate-700 font-semibold">
                    {destinationName}
                </p>
            </div>

            <div className="nature-card">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <Calendar className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="font-semibold text-slate-800">Date</span>
                </div>
                <p className="text-slate-700 font-semibold">{date}</p>
            </div>

            <div className="nature-card">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <Clock className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="font-semibold text-slate-800">
                        Duration
                    </span>
                </div>
                <p className="text-slate-700 font-semibold">{duration}</p>
            </div>

            <div className="nature-card">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <Users className="w-4 h-4 text-blue-700" />
                    </div>
                    <span className="font-semibold text-slate-800">
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
