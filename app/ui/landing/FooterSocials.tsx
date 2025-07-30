import { NavLink } from 'react-router'

export const FooterSocials = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Connect
            </h3>
            <ul className="space-y-2">
                <li>
                    <NavLink
                        to="/plan-trip"
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        Instagram
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/plan-trip"
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        Facebook
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
