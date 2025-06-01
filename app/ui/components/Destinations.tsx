import { MapPin, Fish } from 'lucide-react'

const destinations = [
    {
        name: 'Lake Tahoe',
        location: 'California/Nevada',
        fishTypes: 'Trout, Bass, Salmon',
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
        difficulty: 'Beginner',
    },
    {
        name: 'Yellowstone River',
        location: 'Montana',
        fishTypes: 'Cutthroat Trout, Mountain Whitefish',
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop',
        difficulty: 'Intermediate',
    },
    {
        name: 'Florida Keys',
        location: 'Florida',
        fishTypes: 'Tarpon, Bonefish, Permit',
        image: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400&h=300&fit=crop',
        difficulty: 'Advanced',
    },
    {
        name: 'Rocky Mountains',
        location: 'Colorado',
        fishTypes: 'Rainbow Trout, Brook Trout',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
        difficulty: 'Intermediate',
    },
    {
        name: 'Glacier National Park',
        location: 'Montana',
        fishTypes: 'Lake Trout, Bull Trout',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
        difficulty: 'Beginner',
    },
    {
        name: 'Pacific Coast',
        location: 'Oregon',
        fishTypes: 'Salmon, Steelhead, Lingcod',
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop',
        difficulty: 'Advanced',
    },
]

export const Destinations = () => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-emerald-400'
            case 'Intermediate':
                return 'bg-amber-400'
            case 'Advanced':
                return 'bg-orange-400'
            default:
                return 'bg-stone-400'
        }
    }

    return (
        <section className="px-6 py-20 bg-emerald-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="neo-subheader text-center mb-16 text-slate-800">
                    Popular Fishing Destinations
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((destination, index) => (
                        <div
                            key={index}
                            className="neo-card group cursor-pointer hover:translate-x-2 hover:translate-y-2 transition-transform bg-stone-50 flex flex-col"
                        >
                            <div className="aspect-video mb-4 border-4 border-black overflow-hidden">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold uppercase tracking-wide text-slate-800">
                                        {destination.name}
                                    </h3>
                                    <span
                                        className={`${getDifficultyColor(destination.difficulty)} text-black px-2 py-1 text-sm font-bold border-2 border-black`}
                                    >
                                        {destination.difficulty}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2 mb-3">
                                    <MapPin className="w-5 h-5 text-emerald-700" />
                                    <span className="font-semibold text-slate-700">
                                        {destination.location}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2 mb-4">
                                    <Fish className="w-5 h-5 text-emerald-700" />
                                    <span className="font-semibold text-slate-700">
                                        {destination.fishTypes}
                                    </span>
                                </div>

                                <div className="mt-auto">
                                    <button className="neo-button w-full bg-emerald-600 text-white border-black">
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
