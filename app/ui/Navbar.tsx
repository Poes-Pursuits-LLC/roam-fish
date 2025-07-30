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
            <nav className="nature-glass border-b nature-border px-6 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <NavLink
                        className="items-center space-x-2 cursor-pointer hidden sm:flex"
                        to="/"
                    >
                        <span className="text-2xl font-bold text-slate-800">
                            Roam.Fish
                        </span>
                    </NavLink>
                    <div className="flex items-center space-x-4">
                        <NavLink
                            to="/plan-trip"
                            className="nature-button-secondary"
                            data-testid="plan-trip-button"
                        >
                            Plan Trip
                        </NavLink>
                        {userId ? (
                            <div className="flex items-center space-x-4">
                                <NavLink to="/dashboard" className="nature-button">
                                    Dashboard
                                </NavLink>
                                <UserButton
                                    fallback={
                                        <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse border border-slate-200" />
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
                                className="nature-button"
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
