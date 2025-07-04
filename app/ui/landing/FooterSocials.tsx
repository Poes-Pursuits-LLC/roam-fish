import { NavLink } from 'react-router'

export const FooterSocials = () => {
    return (
        <div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-[#1F513F]">
                Connect
            </h3>
            <ul className="space-y-2 font-semibold">
                <li>
                    <NavLink to="/plan-trip" className="hover:text-emerald-600">
                        Instagram
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/plan-trip" className="hover:text-emerald-600">
                        Facebook
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
