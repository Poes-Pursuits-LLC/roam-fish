import { Settings } from 'lucide-react'
import { NavLink } from 'react-router'

export const QuickActions = () => {
    return (
        <div className="neo-card bg-emerald-100">
            <div className="flex items-center space-x-3 mb-6">
                <Settings className="w-8 h-8 text-emerald-700" />
                <h2 className="text-2xl font-bold uppercase tracking-wide text-slate-800">
                    Quick Actions
                </h2>
            </div>

            <NavLink to="/trips">
                <button className="neo-button w-full bg-amber-400 text-black border-black my-4">
                    My Trips
                </button>
            </NavLink>
            <NavLink to="/">
                <button className="neo-button w-full bg-emerald-600 text-white border-black my-4">
                    Browse Destinations
                </button>
            </NavLink>
            <NavLink to="/">
                <button className="neo-button w-full bg-orange-400 text-black border-black my-4">
                    Fishing Tips
                </button>
            </NavLink>
            <NavLink to="/billing">
                <button className="neo-button w-full bg-stone-800 text-white border-black my-4">
                    Billing
                </button>
            </NavLink>
        </div>
    )
}
