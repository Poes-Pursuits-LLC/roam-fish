import { DollarSign, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { BudgetItem } from '~/core/trip/trip.model'

export const Budget = ({ budgetList }: { budgetList: BudgetItem[] }) => {
    const [localBudgetList, setLocalBudgetList] =
        useState<BudgetItem[]>(budgetList)
    const total = localBudgetList.reduce(
        (acc, item) => acc + Number(item.price),
        0,
    )

    const handleItemChange = (
        id: string,
        field: keyof BudgetItem,
        value: string,
    ) => {
        setLocalBudgetList((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          [field]:
                              field === 'price'
                                  ? value.replace(/[^0-9.]/g, '')
                                  : value,
                      }
                    : item,
            ),
        )
    }

    const handleAddItem = () => {
        const newItem: BudgetItem = {
            id: crypto.randomUUID(),
            name: '',
            price: '0',
        }
        setLocalBudgetList((prev) => [...prev, newItem])
    }

    const handleRemoveItem = (id: string) => {
        setLocalBudgetList((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <div className="nature-card">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h2 className="nature-subheader text-slate-800">Budget</h2>
                </div>
                <div className="sm:ml-auto bg-emerald-100 text-emerald-800 px-4 py-2 font-semibold rounded-lg border border-emerald-200 text-center sm:text-left">
                    Total: ${total}
                </div>
            </div>

            <div className="space-y-3">
                {localBudgetList.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex-1 min-w-0">
                                <input
                                    type="text"
                                    name={`budget-${item.id}-name`}
                                    value={item.name}
                                    onChange={(e) =>
                                        handleItemChange(
                                            item.id,
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Item name"
                                    className="w-full font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer text-base sm:text-lg py-2 border-b border-slate-300 focus:border-emerald-500"
                                />
                                <input
                                    type="text"
                                    name={`budget-${item.id}-price`}
                                    value={item.price}
                                    onChange={(e) =>
                                        handleItemChange(
                                            item.id,
                                            'price',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="0.00"
                                    className="w-full text-slate-600 text-sm sm:text-base bg-transparent focus:outline-none cursor-pointer py-1 mt-1"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg self-start sm:self-center transition-colors"
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
                Add Budget Item
            </button>
        </div>
    )
}
