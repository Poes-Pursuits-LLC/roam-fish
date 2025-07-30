import { BookOpen } from 'lucide-react'
import { useState } from 'react'

export const Notes = ({ notes }: { notes: string }) => {
    const [localNotes, setLocalNotes] = useState(notes)

    return (
        <div className="nature-card mt-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <BookOpen className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h2 className="nature-subheader text-slate-800">
                        Trip Notes
                    </h2>
                </div>
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
