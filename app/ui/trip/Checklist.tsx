import { Checkbox } from '@radix-ui/react-checkbox'
import { ClipboardCheck } from 'lucide-react'
import { useState } from 'react'

interface TodoItem {
    id: string
    text: string
    completed: boolean
}

const initialTodoItems: TodoItem[] = [
    { id: 't1', text: 'Book flight', completed: false },
    { id: 't2', text: 'Reserve accommodation', completed: false },
    { id: 't3', text: 'Check weather forecast', completed: false },
    { id: 't4', text: 'Pack fishing gear', completed: false },
    { id: 't5', text: 'Arrange airport transfer', completed: false },
    { id: 't6', text: 'Purchase travel insurance', completed: false },
]

export const Checklist = () => {
    const [items, setItems] = useState<TodoItem[]>(initialTodoItems)

    const toggleItem = (id: string) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item,
            ),
        )
    }

    return (
        <div className="neo-card bg-stone-50">
            <div className="flex items-center gap-3 mb-6">
                <ClipboardCheck className="w-6 h-6 text-emerald-700" />
                <h2 className="neo-subheader text-slate-800">Checklist</h2>
            </div>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-white border-2 border-black hover:bg-stone-50 transition-colors cursor-pointer"
                        onClick={() => toggleItem(item.id)}
                    >
                        <Checkbox
                            checked={item.completed}
                            className="w-5 h-5 border-2 border-black rounded-sm data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        />
                        <span
                            className={`flex-1 font-semibold ${
                                item.completed
                                    ? 'line-through text-slate-500'
                                    : 'text-slate-800'
                            }`}
                        >
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
