import { hc } from 'hono/client'
import type { Route } from './+types/trip'
import type { AppType } from '~/server/main'

export async function loader({ params }: Route.LoaderArgs) {
    const { tripId } = params
    const client = hc<AppType>(process.env.SERVER_URL!)
    const trip = await client.getTrip
        .$get({ query: { tripId } })
        .then((res) => res.json())
        .then((data) => data.trip)
    return { trip }
}

import {
    DollarSign,
    Package,
    MapPin,
    Calendar,
    Users,
    Fish,
} from 'lucide-react'
import Navbar from '~/ui/Navbar'
import { Checkbox } from '~/ui/Checkbox'

export default function TripPage({ loaderData }: Route.ComponentProps) {
    const { trip } = loaderData
    console.info('trip', JSON.stringify(trip))

    const tripData = {
        title: 'Yellowstone River Adventure',
        location: 'Yellowstone National Park, Montana',
        dates: 'March 15-20, 2025',
        participants: 3,
        budget: {
            total: 1200,
            items: [
                {
                    id: 1,
                    category: 'Accommodation',
                    amount: 400,
                    description: 'Cabin rental',
                },
                {
                    id: 2,
                    category: 'Food',
                    amount: 300,
                    description: 'Groceries & meals',
                },
                {
                    id: 3,
                    category: 'Transportation',
                    amount: 200,
                    description: 'Gas & vehicle',
                },
                {
                    id: 4,
                    category: 'Permits',
                    amount: 150,
                    description: 'Fishing licenses',
                },
                {
                    id: 5,
                    category: 'Gear',
                    amount: 150,
                    description: 'New flies & tackle',
                },
            ],
        },
        packingList: [
            {
                id: 1,
                item: 'Fly Rod (9ft, 5wt)',
                checked: true,
                category: 'Essential Gear',
            },
            {
                id: 2,
                item: 'Reel with backing & line',
                checked: true,
                category: 'Essential Gear',
            },
            {
                id: 3,
                item: 'Waders & boots',
                checked: false,
                category: 'Essential Gear',
            },
            {
                id: 4,
                item: 'Fly boxes',
                checked: false,
                category: 'Essential Gear',
            },
            { id: 5, item: 'Net', checked: true, category: 'Essential Gear' },
            {
                id: 6,
                item: 'Dry flies (Adams, Elk Hair Caddis)',
                checked: false,
                category: 'Flies',
            },
            {
                id: 7,
                item: "Nymphs (Pheasant Tail, Hare's Ear)",
                checked: false,
                category: 'Flies',
            },
            {
                id: 8,
                item: 'Streamers (Woolly Bugger, Muddler)',
                checked: false,
                category: 'Flies',
            },
            {
                id: 9,
                item: 'Rain jacket',
                checked: false,
                category: 'Clothing',
            },
            {
                id: 10,
                item: 'Warm layers',
                checked: false,
                category: 'Clothing',
            },
            {
                id: 11,
                item: 'Sunglasses & hat',
                checked: true,
                category: 'Clothing',
            },
        ],
        notes: 'Remember to check water levels before heading out. Local guide recommended early morning fishing near the bridge area. Bring extra tippet material.',
        targetSpecies: ['Cutthroat Trout', 'Rainbow Trout', 'Brown Trout'],
    }

    const groupedPackingList = tripData.packingList.reduce((acc: any, item) => {
        if (!acc[item.category]) {
            acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc
    }, {})

    return (
        <div className="min-h-screen bg-stone-100">
            <Navbar />

            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => navigate('/trips')}
                            className="neo-button bg-stone-800 text-white border-black flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Trips
                        </button>
                    </div> */}
                    {/* Trip Title */}
                    <div className="mb-8">
                        <h1 className="neo-header text-slate-800">
                            {trip.name}
                        </h1>
                    </div>
                    {/* Trip Info Cards */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="neo-card bg-emerald-50">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-5 h-5 text-emerald-700" />
                                <span className="font-bold text-slate-800">
                                    Location
                                </span>
                            </div>
                            <p className="text-slate-700 font-semibold">
                                {tripData.location}
                            </p>
                        </div>

                        <div className="neo-card bg-amber-50">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar className="w-5 h-5 text-amber-700" />
                                <span className="font-bold text-slate-800">
                                    Dates
                                </span>
                            </div>
                            <p className="text-slate-700 font-semibold">
                                {tripData.dates}
                            </p>
                        </div>

                        <div className="neo-card bg-blue-50">
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="w-5 h-5 text-blue-700" />
                                <span className="font-bold text-slate-800">
                                    Participants
                                </span>
                            </div>
                            <p className="text-slate-700 font-semibold">
                                {tripData.participants} people
                            </p>
                        </div>

                        <div className="neo-card bg-stone-50">
                            <div className="flex items-center gap-3 mb-2">
                                <Fish className="w-5 h-5 text-stone-700" />
                                <span className="font-bold text-slate-800">
                                    Target Species
                                </span>
                            </div>
                            <p className="text-slate-700 font-semibold">
                                {tripData.targetSpecies.join(', ')}
                            </p>
                        </div>
                    </div>
                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Packing List */}
                        <div className="neo-card bg-stone-50">
                            <div className="flex items-center gap-3 mb-6">
                                <Package className="w-6 h-6 text-emerald-700" />
                                <h2 className="neo-subheader text-slate-800">
                                    Packing List
                                </h2>
                            </div>

                            {Object.entries(groupedPackingList).map(
                                ([category, items]: [string, any]) => (
                                    <div key={category} className="mb-6">
                                        <h3 className="font-bold text-lg text-slate-800 mb-3 uppercase tracking-wide border-b-2 border-black pb-1">
                                            {category}
                                        </h3>
                                        {items.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-3 mb-3 p-2 bg-white border-2 border-black"
                                            >
                                                <Checkbox
                                                    checked={item.checked}
                                                    disabled
                                                />
                                                <span
                                                    className={`flex-1 font-semibold ${item.checked ? 'line-through text-slate-500' : 'text-slate-800'}`}
                                                >
                                                    {item.item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ),
                            )}
                        </div>

                        {/* Budget */}
                        <div className="neo-card bg-stone-50">
                            <div className="flex items-center gap-3 mb-6">
                                <DollarSign className="w-6 h-6 text-emerald-700" />
                                <h2 className="neo-subheader text-slate-800">
                                    Budget
                                </h2>
                                <div className="ml-auto bg-emerald-400 text-black px-3 py-1 font-bold border-2 border-black">
                                    Total: ${tripData.budget.total}
                                </div>
                            </div>

                            {tripData.budget.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-3 mb-3 bg-white border-2 border-black"
                                >
                                    <div>
                                        <div className="font-bold text-slate-800">
                                            {item.category}
                                        </div>
                                        <div className="text-slate-600 text-sm">
                                            {item.description}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-lg text-slate-800">
                                            ${item.amount}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Notes Section */}
                    <div className="neo-card bg-stone-50 mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="neo-subheader text-slate-800">
                                Trip Notes
                            </h2>
                        </div>

                        <p className="text-slate-800 font-semibold leading-relaxed bg-white p-4 border-2 border-black">
                            {tripData.notes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
