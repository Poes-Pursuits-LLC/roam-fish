import { BookOpen } from 'lucide-react'

export const RecentTripsSkeleton = () => {
    return (
        <div className="neo-card bg-stone-100">
            <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-8 h-8 text-emerald-700" />
                <h2 className="text-2xl font-bold uppercase tracking-wide text-slate-800">
                    Recent Trips
                </h2>
            </div>
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="border-4 border-black p-4 bg-stone-50"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="h-7 w-40 bg-stone-200 rounded animate-pulse" />
                            <div className="h-5 w-24 bg-stone-200 rounded animate-pulse" />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="h-6 w-20 bg-stone-200 rounded animate-pulse" />
                            <div className="h-7 w-20 bg-stone-200 rounded animate-pulse border-2 border-black" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full mt-6 h-12 bg-stone-200 rounded animate-pulse border-2 border-black" />
        </div>
    )
} 