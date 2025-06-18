import { UserButton } from '@clerk/react-router'
import { NavLink } from 'react-router'
import { SubscribeBanner } from './SubscribeBanner'

export const Navbar = ({
    userId,
    isSubscriber = false,
}: {
    userId: string | null
    isSubscriber: boolean
}) => {
    return (
        <>
            <nav className="border-2 border-black px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <NavLink
                        className="items-center space-x-2 cursor-pointer hidden sm:flex"
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
                                <NavLink to="/dashboard" className="neo-button">
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
            {userId && !isSubscriber && <SubscribeBanner />}
        </>
    )
}
