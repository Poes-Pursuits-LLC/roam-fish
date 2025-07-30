import { MapPin, Fish } from 'lucide-react'
import { useEffect, useState, useMemo, use } from 'react'
import { useNavigate } from 'react-router'
import type { Destination } from '~/core/destination/destination.model'
import { debounce } from '~/utils'

export const Destinations = (
    props: Readonly<{ promise: Promise<Destination[]> }>,
) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [displayDestinations, setDisplayDestinations] = useState<
        Destination[]
    >([])

    const destinations = use(props.promise)
    const navigate = useNavigate()
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
        <section id="destinations" className="px-6 py-20 nature-gradient-bg">
            <div className="max-w-7xl mx-auto">
                <h2 className="nature-subheader text-center mb-16 text-slate-800">
                    Popular Fishing Destinations
                </h2>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="nature-input text-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayDestinations
                        .slice(0, 6)
                        .map((destination, index) => (
                            <div
                                onClick={() => navigate('/plan-trip')}
                                key={index}
                                className="nature-card group cursor-pointer flex flex-col"
                            >
                                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                                    <img
                                        src={destination.imageUrl}
                                        alt={destination.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-slate-800">
                                            {destination.name}
                                        </h3>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-1.5 bg-emerald-100 rounded-lg">
                                                <MapPin className="w-4 h-4 text-emerald-700" />
                                            </div>
                                            <span className="font-medium text-slate-700">
                                                {destination.province}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="p-1.5 bg-emerald-100 rounded-lg">
                                                <Fish className="w-4 h-4 text-emerald-700" />
                                            </div>
                                            <span className="font-medium text-slate-700">
                                                {destination.country}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <button className="nature-button w-full">
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
        <section id="destinations" className="px-6 py-20 nature-gradient-bg">
            <div className="max-w-7xl mx-auto">
                <h2 className="nature-subheader text-center mb-16 text-slate-800">
                    Popular Fishing Destinations
                </h2>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by location..."
                                disabled
                                className="nature-input text-lg opacity-50"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="nature-card group flex flex-col animate-pulse cursor-wait"
                        >
                            <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 bg-slate-300 rounded-md" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-6 w-2/3 bg-slate-300 rounded mb-2" />
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-1.5 bg-slate-200 rounded-lg">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div className="h-4 w-1/3 bg-slate-300 rounded" />
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-1.5 bg-slate-200 rounded-lg">
                                            <Fish className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div className="h-4 w-1/3 bg-slate-300 rounded" />
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="nature-button w-full bg-slate-300 text-transparent h-10" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
