import { NavLink } from 'react-router'

export const FooterPolicies = () => {
    return (
        <div>
            <h3 className="text-xl font-bold text-[#1F513F] uppercase tracking-wide mb-4">
                Policy
            </h3>
            <ul className="space-y-2 font-semibold">
                <li>
                    <NavLink
                        to="/terms-of-service"
                        className="hover:text-emerald-600"
                    >
                        Terms of Service
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/privacy-policy"
                        className="hover:text-emerald-600"
                    >
                        Privacy Policy
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
