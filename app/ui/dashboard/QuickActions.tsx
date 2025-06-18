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
                <button className="neo-button w-full mb-4">My Trips</button>
            </NavLink>
            <NavLink to="/billing">
                <button className="neo-button-secondary w-full">Billing</button>
            </NavLink>
        </div>
    )
}
