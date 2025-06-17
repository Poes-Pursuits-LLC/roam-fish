import { NavLink } from 'react-router'

export const SubscribeBanner = () => {
    return (
        <div className="bg-stone-200 shadow-[0_4px_0_0_#000000]">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-center gap-6 text-black">
                    <div className="flex items-center gap-3">
                        <span className="font-black text-lg uppercase tracking-wide">
                            Unlock Premium Features
                        </span>
                        <span className="text-xl font-black">|</span>
                        <span className="text-base font-bold">
                            Advanced trip management, unlimited trips, and more!
                        </span>
                    </div>
                    <NavLink to="/billing" className="neo-button">
                        Upgrade Now
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
