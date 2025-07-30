import { ArrowLeft } from 'lucide-react'
import { NavLink } from 'react-router'

export const BackButton = () => {
    return (
        <NavLink to="/">
            <button className="nature-button-secondary mb-8 flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back Home
            </button>
        </NavLink>
    )
}
