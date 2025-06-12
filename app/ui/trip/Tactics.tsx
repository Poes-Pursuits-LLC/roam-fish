import { Cloud, Fish, Target } from 'lucide-react'

export const Tactics = ({
    fishingSummary,
    weather,
    flies,
    hatches,
}: {
    fishingSummary: string
    weather: string
    flies: string[]
    hatches: string[]
}) => {
    return (
        <div className="neo-card bg-emerald-50 mb-8">
            <div className="flex items-center gap-3 mb-6">
                <Fish className="w-6 h-6 text-emerald-700" />
                <h2 className="neo-subheader text-slate-800">Fishing Guide</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 border-2 border-black">
                    <div className="flex items-center gap-2 mb-4">
                        <Cloud className="w-5 h-5 text-slate-700" />
                        <h3 className="font-bold text-lg text-slate-800 uppercase tracking-wide">
                            Weather
                        </h3>
                    </div>
                    {weather}
                </div>

                <div className="bg-white p-4 border-2 border-black">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-slate-700" />
                        <h3 className="font-bold text-lg text-slate-800 uppercase tracking-wide">
                            Recommended Flies
                        </h3>
                    </div>
                    {flies.map((fly, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 mb-2"
                        >
                            <span className="w-2 h-2 bg-black transform rotate-45"></span>
                            <span className="text-slate-800 font-semibold">
                                {fly}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 border-2 border-black">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-slate-700" />
                        <h3 className="font-bold text-lg text-slate-800 uppercase tracking-wide">
                            Hatches
                        </h3>
                    </div>
                    {hatches.map((hatch, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 mb-2"
                        >
                            <span className="w-2 h-2 bg-black transform rotate-45"></span>
                            <span className="text-slate-800 font-semibold">
                                {hatch}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 border-2 border-black">
                    <h3 className="font-bold text-lg text-slate-800 uppercase tracking-wide mb-4">
                        Summary
                    </h3>
                    <p className="text-slate-800 font-semibold leading-relaxed">
                        {fishingSummary}
                    </p>
                </div>
            </div>
        </div>
    )
}
