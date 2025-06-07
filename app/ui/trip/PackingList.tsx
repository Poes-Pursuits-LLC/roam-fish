import { Checkbox } from '@radix-ui/react-checkbox'
import { Package } from 'lucide-react'
import { useState } from 'react'
import type { Trip } from '~/core/trip/trip.model'

export const PackingList = ({ list }: { list: Trip['packingList'] }) => {
    const categories = Array.from(new Set(list.map((item) => item.category)))
    const [activeCategory, setActiveCategory] = useState(categories[0])

    const itemsByCategory = list.reduce(
        (acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = []
            }
            acc[item.category].push(item)
            return acc
        },
        {} as Record<string, typeof list>,
    )

    return (
        <div className="neo-card bg-stone-50">
            <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-emerald-700" />
                <h2 className="neo-subheader text-slate-800">Packing List</h2>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 font-bold border-2 border-black whitespace-nowrap transition-colors ${
                            activeCategory === category
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white text-slate-800 hover:bg-stone-50'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {itemsByCategory[activeCategory]?.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-white border-2 border-black"
                    >
                        <Checkbox
                            checked={Number(item.quantity) > 0}
                            disabled
                            className="w-5 h-5 border-2 border-black rounded-sm data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        />
                        <span
                            className={`flex-1 font-semibold ${
                                Number(item.quantity) > 0
                                    ? 'line-through text-slate-500'
                                    : 'text-slate-800'
                            }`}
                        >
                            {item.name}
                        </span>
                        {Number(item.quantity) > 0 && (
                            <span className="text-sm font-semibold text-slate-600">
                                x{item.quantity}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
