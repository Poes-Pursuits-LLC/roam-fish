import { NavLink } from 'react-router'

const INSTAGRAM_URL = 'https://www.instagram.com/roam.fish/'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61578296994498'

export const FooterSocials = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Connect
            </h3>
            <ul className="space-y-2">
                <li>
                    <NavLink
                        to={INSTAGRAM_URL}
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        Instagram
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={FACEBOOK_URL}
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        Facebook
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
