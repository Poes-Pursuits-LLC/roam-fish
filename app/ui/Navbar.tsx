import { UserButton } from '@clerk/react-router'
import { NavLink } from 'react-router'

const Navbar = ({
    userId,
    isSubscriber = false,
}: {
    userId: string | null
    isSubscriber: boolean
}) => {
    return (
        <>
            <nav className="bg-stone-50 border-b-4 border-black px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <NavLink
                        className="flex items-center space-x-2 cursor-pointer"
                        to="/"
                    >
                        <span className="text-2xl font-black uppercase tracking-wide text-slate-800">
                            Roam.Fish
                        </span>
                    </NavLink>

                    <div className="flex items-center space-x-4">
                        <NavLink
                            to="/plan-trip"
                            className="neo-button-secondary"
                        >
                            Plan Trip
                        </NavLink>
                        {userId ? (
                            <div className="flex items-center space-x-4">
                                <NavLink
                                    to="/dashboard"
                                    className="neo-button"
                                >
                                    Dashboard
                                </NavLink>
                                <UserButton
                                    fallback={
                                        <div className="w-10 h-10 rounded-full bg-stone-200 animate-pulse border-2 border-black" />
                                    }
                                    userProfileProps={{
                                        appearance: {
                                            elements: {
                                                profileSection__emailAddresses:
                                                {
                                                    display: 'none',
                                                },
                                                profileSection__danger: {
                                                    display: 'none',
                                                },
                                                profileSection__connectedAccounts:
                                                {
                                                    display: 'none',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="neo-button bg-emerald-700 text-white border-black"
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
            {userId && !isSubscriber && (
                <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-stone-600 border-b-4 border-black">
                    <div className="max-w-7xl mx-auto px-6 py-3">
                        <div className="flex items-center justify-center gap-6 text-white">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-base">
                                    ✨ Unlock Premium Features
                                </span>
                                <span className="text-sm opacity-90">|</span>
                                <span className="text-sm text-stone-100">
                                    Advanced trip management, unlimited trips,
                                    and more!
                                </span>
                            </div>
                            <NavLink
                                to="/billing"
                                className="neo-button bg-white text-slate-700 border-black hover:bg-slate-50 transition-colors text-sm font-semibold whitespace-nowrap"
                            >
                                Upgrade Now
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
