import { Checkbox } from '@radix-ui/react-checkbox'
import { Package, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Trip } from '~/core/trip/trip.model'

export const PackingList = ({ list }: { list: Trip['packingList'] }) => {
    const [localPackingList, setLocalPackingList] = useState(list)
    const categories = Array.from(
        new Set(localPackingList.map((item) => item.category)),
    )
    const [activeCategory, setActiveCategory] = useState(categories[0])

    const itemsByCategory = localPackingList.reduce(
        (acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = []
            }
            acc[item.category].push(item)
            return acc
        },
        {} as Record<string, typeof localPackingList>,
    )

    const handleItemChange = (
        id: string,
        field: keyof (typeof localPackingList)[0],
        value: string,
    ) => {
        setLocalPackingList((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          [field]:
                              field === 'quantity'
                                  ? value.replace(/[^0-9]/g, '')
                                  : value,
                      }
                    : item,
            ),
        )
    }

    const handleAddItem = () => {
        const newItem = {
            id: crypto.randomUUID(),
            category: activeCategory,
            name: '',
            quantity: '0',
        }
        setLocalPackingList((prev) => [...prev, newItem])
    }

    const handleRemoveItem = (id: string) => {
        setLocalPackingList((prev) => prev.filter((item) => item.id !== id))
    }

    const toggleItemPacked = (id: string) => {
        setLocalPackingList((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: Number(item.quantity) > 0 ? '0' : '1',
                      }
                    : item,
            ),
        )
    }

    return (
        <div className="neo-card bg-stone-50">
            <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-emerald-700" />
                <h2 className="neo-subheader text-slate-800">Packing List</h2>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-3 font-bold border-2 border-black whitespace-nowrap transition-colors text-base flex-shrink-0 ${
                            activeCategory === category
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white text-slate-800 hover:bg-stone-50'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {itemsByCategory[activeCategory]?.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white border-2 border-black p-4"
                    >
                        <div className="flex items-start gap-3">
                            <Checkbox
                                checked={Number(item.quantity) > 0}
                                onCheckedChange={() =>
                                    toggleItemPacked(item.id)
                                }
                                className="w-6 h-6 border-2 border-black rounded-sm data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 data-[state=checked]:text-white flex-shrink-0 mt-1"
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
                            <div className="flex-1 space-y-3">
                                <input
                                    type="text"
                                    name={`packing-${item.id}-name`}
                                    value={item.name}
                                    onChange={(e) =>
                                        handleItemChange(
                                            item.id,
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Item name"
                                    className={`w-full font-semibold bg-transparent focus:outline-none text-lg p-2 border-b border-gray-300 ${
                                        Number(item.quantity) > 0
                                            ? 'line-through text-slate-500'
                                            : 'text-slate-800'
                                    }`}
                                />
                                <input
                                    type="text"
                                    name={`packing-${item.id}-quantity`}
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleItemChange(
                                            item.id,
                                            'quantity',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="0"
                                    className="w-full text-base text-slate-600 bg-transparent focus:outline-none p-2 border-b border-gray-300"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-3 text-red-600 hover:bg-red-50 rounded-full flex-shrink-0"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={handleAddItem}
                className="neo-button w-full mt-6 flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Add Packing Item
            </button>

            <input
                type="hidden"
                name="packingList"
                value={JSON.stringify(localPackingList)}
            />
        </div>
    )
}
