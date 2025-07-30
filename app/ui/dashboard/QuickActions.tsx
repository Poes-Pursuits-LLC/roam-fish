import { Settings } from 'lucide-react'
import { NavLink } from 'react-router'

export const QuickActions = () => {
    return (
        <div className="nature-card">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                    <Settings className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="nature-subheader text-slate-800">
                    Quick Actions
                </h2>
            </div>
            <div className="space-y-3">
                <NavLink to="/trips" className="block">
                    <button className="nature-button w-full">My Trips</button>
                </NavLink>
                <NavLink to="/billing" className="block">
                    <button className="nature-button-earth w-full">
                        Billing
                    </button>
                </NavLink>
            </div>
        </div>
    )
}
