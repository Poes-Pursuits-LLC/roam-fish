import { MapPin, Plane } from 'lucide-react'

export const TravelDetails = ({
    airport,
    cities,
}: {
    airport: string
    cities: string[]
}) => {
    return (
        <div className="neo-card bg-stone-50">
            <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-stone-700" />
                <span className="font-bold text-slate-800">Travel Details</span>
            </div>
            <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-stone-700" />
                <span className="text-slate-700 font-semibold">{airport}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-stone-700" />
                <span className="text-slate-700 font-semibold">
                    {cities.join(', ')}
                </span>
            </div>
        </div>
    )
}
