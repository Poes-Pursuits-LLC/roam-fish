import { useState } from 'react'

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <section className="px-6 py-16 bg-sage-50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="neo-subheader mb-8 text-slate-800">
                    Find Your Perfect Fishing Spot
                </h2>

                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by location, fish type, or water body..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="neo-input text-xl h-16 pr-32 bg-stone-50 flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        />
                        <button className="absolute right-2 top-2 bg-emerald-600 text-white border-4 border-black px-6 py-3 h-12 font-bold uppercase tracking-wide transform transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
