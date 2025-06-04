import { MapPin, Fish } from 'lucide-react'
import { useEffect, useState, useMemo, use } from 'react'
import type { Destination } from '~/core/destination/destination.model'
import { debounce } from '~/utils'

export const Destinations = (
    props: Readonly<{ promise: Promise<Destination[]> }>,
) => {
    const destinations = use(props.promise)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [displayDestinations, setDisplayDestinations] = useState<
        Destination[]
    >([])

    const debouncedFilter = useMemo(
        () =>
            debounce((...args: unknown[]) => {
                const term = (args[0] as string) || ''
                if (term) {
                    const filtered = destinations.filter(
                        (destination) =>
                            destination.name
                                .toLowerCase()
                                .includes(term.toLowerCase()) ||
                            destination.country
                                .toLowerCase()
                                .includes(term.toLowerCase()) ||
                            destination.province
                                .toLowerCase()
                                .includes(term.toLowerCase()),
                    )
                    setDisplayDestinations(filtered)
                } else {
                    const initialDestinations = destinations
                        .slice()
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 6)
                    setDisplayDestinations(initialDestinations)
                }
            }, 150),
        [destinations],
    )

    useEffect(() => {
        debouncedFilter(searchTerm)
        return () => {
            debouncedFilter.cancel()
        }
    }, [searchTerm, debouncedFilter])

    return (
        <section id="destinations" className="px-6 py-20 bg-emerald-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="neo-subheader text-center mb-16 text-slate-800">
                    Popular Fishing Destinations
                </h2>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by location, fish type, or water body..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="neo-input h-full text-xl pr-32 bg-stone-50 flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayDestinations
                        .slice(0, 6)
                        .map((destination, index) => (
                            <div
                                key={index}
                                className="neo-card group cursor-pointer hover:translate-x-2 hover:translate-y-2 transition-transform bg-stone-50 flex flex-col"
                            >
                                <div className="aspect-video mb-4 border-4 border-black overflow-hidden">
                                    <img
                                        src={destination.imageUrl}
                                        alt={destination.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold uppercase tracking-wide text-slate-800">
                                            {destination.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center space-x-2 mb-3">
                                        <MapPin className="w-5 h-5 text-emerald-700" />
                                        <span className="font-semibold text-slate-700">
                                            {destination.province}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-2 mb-4">
                                        <Fish className="w-5 h-5 text-emerald-700" />
                                        <span className="font-semibold text-slate-700">
                                            {destination.country}
                                        </span>
                                    </div>

                                    <div className="mt-auto">
                                        <button className="neo-button w-full bg-slate-700 text-white border-black">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    )
}

export const DestinationsFallback = () => {
    return (
        <section id="destinations" className="px-6 py-20 bg-emerald-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="neo-subheader text-center mb-16 text-slate-800">
                    Popular Fishing Destinations
                </h2>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by location, fish type, or water body..."
                                disabled
                                className="neo-input h-full text-xl pr-32 bg-stone-50 flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="neo-card group bg-stone-50 flex flex-col animate-pulse cursor-wait"
                        >
                            <div className="aspect-video mb-4 border-4 border-black overflow-hidden bg-stone-200 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 bg-stone-300 rounded-md" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="h-6 w-2/3 bg-stone-300 rounded mb-2" />
                                </div>
                                <div className="flex items-center space-x-2 mb-3">
                                    <MapPin className="w-5 h-5 text-emerald-200" />
                                    <div className="h-4 w-1/3 bg-stone-300 rounded" />
                                </div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <Fish className="w-5 h-5 text-emerald-200" />
                                    <div className="h-4 w-1/3 bg-stone-300 rounded" />
                                </div>
                                <div className="mt-auto">
                                    <div className="neo-button w-full bg-slate-300 text-transparent border-black h-10" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
