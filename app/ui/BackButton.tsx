import { ArrowLeft } from 'lucide-react'
import { NavLink } from 'react-router'

export const BackButton = () => {
    return (
        <NavLink to="/">
            <button className="neo-button-secondary mb-8 flex items-center gap-2 bg-slate-700 text-slate-100 border-black">
                <ArrowLeft className="w-5 h-5" />
                Back Home
            </button>
        </NavLink>
    )
}
