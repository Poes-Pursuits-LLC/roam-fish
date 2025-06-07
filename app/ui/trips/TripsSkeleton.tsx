import { Fish } from 'lucide-react'
import { TripCardSkeleton } from './TripCardSkeleton'

export const TripsSkeleton = () => {
    return (
        <div className="neo-card bg-stone-50">
            <div className="flex items-center gap-3 mb-6">
                <Fish className="w-6 h-6 text-emerald-200" />
                <div className="h-8 w-32 bg-stone-200 rounded animate-pulse" />
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <div className="h-10 w-24 bg-stone-200 rounded animate-pulse" />
                <div className="h-10 w-24 bg-stone-200 rounded animate-pulse" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                    <TripCardSkeleton key={index} />
                ))}
            </div>
        </div>
    )
}
