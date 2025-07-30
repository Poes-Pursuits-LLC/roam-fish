import { NavLink } from 'react-router'

export const SubscribeBanner = () => {
    return (
        <div className="nature-gradient-bg border-b nature-border">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-center gap-6 text-slate-800">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-lg">
                            Unlock Premium Features
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-base nature-body">
                            Advanced trip management, unlimited trips, and more!
                        </span>
                    </div>
                    <NavLink to="/billing" className="nature-button">
                        Upgrade Now
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
