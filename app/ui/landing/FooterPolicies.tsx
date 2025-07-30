import { NavLink } from 'react-router'

export const FooterPolicies = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Policy
            </h3>
            <ul className="space-y-2">
                <li>
                    <NavLink
                        to="/terms-of-service"
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        Terms of Service
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/privacy-policy"
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        Privacy Policy
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
