import { Cloud, Fish, Target, Crown } from 'lucide-react'
import { NavLink } from 'react-router'

export const Tactics = ({
    fishingSummary,
    weather,
    flies,
    hatches,
    userId,
    isSubscriber,
}: {
    fishingSummary: string
    weather: string
    flies: string[]
    hatches: string[]
    userId: string | null
    isSubscriber: boolean
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

                {renderSummarySection(userId, isSubscriber, fishingSummary)}
            </div>
        </div>
    )
}

const renderSummarySection = (userId: string | null, isSubscriber: boolean, summary: string) => {
    if (!userId) {
        return (
            <div className="bg-white p-4 border-2 border-black">
                <h3 className="font-bold text-lg text-slate-800 uppercase tracking-wide mb-4">
                    Expert Advice
                </h3>
                <div className="text-center">
                    <h4 className="text-lg font-bold text-slate-800 mb-3">
                        Access Expert Advice
                    </h4>
                    <p className="text-sm font-semibold text-slate-700 mb-4">
                        Sign up for free then become a premium member to access detailed tactics for your destination.
                    </p>
                    <NavLink to="/login" className="neo-button">
                        Sign Up Free
                    </NavLink>
                </div>
            </div>
        )
    }

    if (!isSubscriber) {
        return (
            <div className="bg-white p-4 border-2 border-black">
                <h3 className="font-bold text-lg text-slate-800 uppercase tracking-wide mb-4">
                    Expert Advice
                </h3>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                        <Crown className="w-6 h-6 text-amber-500" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-3">
                        Premium Feature
                    </h4>
                    <p className="text-sm font-semibold text-slate-700 mb-4">
                        Upgrade to premium to access detailed tactics for your destination.
                    </p>
                    <NavLink to="/billing" className="neo-button">
                        Upgrade to Premium
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white p-4 border-2 border-black">
            <h3 className="font-bold text-lg text-slate-800 uppercase tracking-wide mb-4">
                Expert Advice
            </h3>
            <p className="text-slate-800 font-semibold leading-relaxed">
                {summary}
            </p>
        </div>
    )
}