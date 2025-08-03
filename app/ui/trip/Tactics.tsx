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
        <div className="nature-card mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                    <Fish className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="nature-subheader text-slate-800">
                    Fishing Guide
                </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-1.5 bg-slate-200 rounded-lg">
                            <Cloud className="w-4 h-4 text-slate-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800">
                            Weather
                        </h3>
                    </div>
                    <p className="nature-body">{weather}</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-1.5 bg-slate-200 rounded-lg">
                            <Target className="w-4 h-4 text-slate-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800">
                            Recommended Flies
                        </h3>
                    </div>
                    <div className="space-y-2">
                        {flies.map((fly, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="nature-body">{fly}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-1.5 bg-slate-200 rounded-lg">
                            <Target className="w-4 h-4 text-slate-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800">
                            Hatches
                        </h3>
                    </div>
                    <div className="space-y-2">
                        {hatches.map((hatch, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="nature-body">{hatch}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {renderSummarySection(userId, isSubscriber, fishingSummary)}
            </div>
        </div>
    )
}

const renderSummarySection = (
    userId: string | null,
    isSubscriber: boolean,
    summary: string,
) => {
    if (!userId) {
        return (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-lg text-slate-800 mb-4">
                    Expert Advice
                </h3>
                <div className="text-center">
                    <h4 className="text-lg font-semibold text-slate-800 mb-3">
                        Access Expert Advice
                    </h4>
                    <p className="nature-body mb-4">
                        Sign up for free then become a premium member to access
                        detailed tactics for your destination.
                    </p>
                    <NavLink to="/login" className="nature-button">
                        Sign Up Free
                    </NavLink>
                </div>
            </div>
        )
    }

    if (!isSubscriber) {
        return (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-lg text-slate-800 mb-4">
                    Expert Advice
                </h3>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Crown className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-3">
                        Premium Feature
                    </h4>
                    <p className="nature-body mb-4">
                        Upgrade to premium to access detailed tactics for your
                        destination.
                    </p>
                    <NavLink to="/billing" className="nature-button">
                        Upgrade to Premium
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-lg text-slate-800 mb-4">
                Expert Advice
            </h3>
            <p className="nature-body leading-relaxed">{summary}</p>
        </div>
    )
}
