import { DollarSign } from 'lucide-react'

export const Budget = () => {
    return (
        <div className="neo-card bg-stone-50">
            <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-emerald-700" />
                <h2 className="neo-subheader text-slate-800">Budget</h2>
                <div className="ml-auto bg-emerald-400 text-black px-3 py-1 font-bold border-2 border-black">
                    Total: ${budget.total}
                </div>
            </div>

            {budget.items.map((item) => (
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
    )
}

const budget = {
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
}
