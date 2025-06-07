export const TripCardSkeleton = () => {
    return (
        <div className="neo-card group bg-stone-50 flex flex-col animate-pulse">
            <div className="aspect-video mb-4 border-4 border-black overflow-hidden bg-stone-200" />

            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <div className="h-6 w-2/3 bg-stone-200 rounded" />
                    <div className="h-6 w-1/4 bg-stone-200 rounded" />
                </div>

                <div className="flex items-center space-x-2 mb-3">
                    <div className="w-5 h-5 bg-stone-200 rounded" />
                    <div className="h-4 w-1/3 bg-stone-200 rounded" />
                </div>

                <div className="flex items-center space-x-2 mb-3">
                    <div className="w-5 h-5 bg-stone-200 rounded" />
                    <div className="h-4 w-1/4 bg-stone-200 rounded" />
                </div>

                <div className="mt-auto">
                    <div className="h-10 w-full bg-stone-200 rounded border-2 border-black" />
                </div>
            </div>
        </div>
    )
}
