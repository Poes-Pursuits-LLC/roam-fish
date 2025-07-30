import { Checkbox } from '@radix-ui/react-checkbox'
import { ClipboardCheck, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { ChecklistItem } from '~/core/trip/trip.model'

export const Checklist = ({ checkList }: { checkList: ChecklistItem[] }) => {
    const [items, setItems] = useState<ChecklistItem[]>(checkList)

    const toggleItem = (id: string) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item,
            ),
        )
    }

    const handleAddItem = () => {
        const newItem: ChecklistItem = {
            id: crypto.randomUUID(),
            name: '',
            completed: false,
        }
        setItems((prev) => [...prev, newItem])
    }

    const handleRemoveItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const handleItemChange = (id: string, value: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, name: value } : item,
            ),
        )
    }

    return (
        <div className="nature-card">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                    <ClipboardCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="nature-subheader text-slate-800">Checklist</h2>
            </div>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-slate-50 rounded-lg border border-slate-200 p-4 hover:bg-slate-100 transition-colors"
                    >
                        <div className="flex items-start gap-3 min-w-0">
                            <Checkbox
                                checked={item.completed}
                                onCheckedChange={() => toggleItem(item.id)}
                                className="w-5 h-5 border-2 border-slate-400 rounded-md data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 data-[state=checked]:text-white flex-shrink-0 mt-1 hover:border-emerald-500 transition-colors"
                            >
                                <svg
                                    width="12"
                                    height="12"
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
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) =>
                                    handleItemChange(item.id, e.target.value)
                                }
                                placeholder="Add checklist item..."
                                className={`flex-1 min-w-0 font-medium bg-transparent focus:outline-none text-base p-2 border-b border-slate-300 focus:border-emerald-500 transition-colors ${
                                    item.completed
                                        ? 'line-through text-slate-500'
                                        : 'text-slate-800'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={handleAddItem}
                className="w-full mt-4 p-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Add Checklist Item
            </button>
        </div>
    )
}
