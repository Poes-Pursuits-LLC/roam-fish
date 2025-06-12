import { useState } from 'react'

export const Notes = ({ notes }: { notes: string }) => {
    const [localNotes, setLocalNotes] = useState(notes)

    return (
        <div className="neo-card bg-stone-50 mt-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="neo-subheader text-slate-800">Trip Notes</h2>
            </div>

            <textarea
                name="notes"
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                placeholder="Add trip notes..."
                className="w-full h-48 text-slate-800 font-semibold leading-relaxed bg-white p-4 border-2 border-black focus:outline-none cursor-pointer hover:bg-stone-100 transition-colors resize-none"
            />

            <input type="hidden" name="notes" value={localNotes} />
        </div>
    )
}
