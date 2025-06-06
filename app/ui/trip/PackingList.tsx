import { Checkbox } from '@radix-ui/react-checkbox'
import { Package } from 'lucide-react'
import type { Trip } from '~/core/trip/trip.model'

export const PackingList = ({ list }: { list: Trip['packingList'] }) => {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="neo-card bg-stone-50">
                <div className="flex items-center gap-3 mb-6">
                    <Package className="w-6 h-6 text-emerald-700" />
                    <h2 className="neo-subheader text-slate-800">
                        Packing List
                    </h2>
                </div>

                {list.map((item) => (
                    <div key={item.id} className="mb-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-3 uppercase tracking-wide border-b-2 border-black pb-1">
                            {item.category}
                        </h3>
                        <div className="flex items-center gap-3 mb-3 p-2 bg-white border-2 border-black">
                            <Checkbox checked={item.quantity > 0} disabled />
                            <span
                                className={`flex-1 font-semibold ${item.quantity > 0 ? 'line-through text-slate-500' : 'text-slate-800'}`}
                            >
                                {item.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
