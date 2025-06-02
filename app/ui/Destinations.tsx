import { MapPin, Fish } from 'lucide-react'
import type { Destination } from '~/core/destination/destination.model'

export const Destinations = (
    props: Readonly<{ destinations: Destination[] }>,
) => {
    return (
        <section id="destinations" className="px-6 py-20 bg-emerald-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="neo-subheader text-center mb-16 text-slate-800">
                    Popular Fishing Destinations
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {props.destinations
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
