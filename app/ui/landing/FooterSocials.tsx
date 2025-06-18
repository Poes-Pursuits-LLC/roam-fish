import { NavLink } from 'react-router'

export const FooterSocials = () => {
    return (
        <div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-amber-400">
                Connect
            </h3>
            <ul className="space-y-2 font-semibold">
                <li>
                    <NavLink to="/plan-trip" className="hover:text-emerald-400">
                        Instagram
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/plan-trip" className="hover:text-emerald-400">
                        Facebook
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
