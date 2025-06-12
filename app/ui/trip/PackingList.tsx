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
                            className="w-5 h-5 border-2 border-black rounded-sm data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 data-[state=checked]:text-white"
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white"
                            >
                                <path
                                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Checkbox>
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
