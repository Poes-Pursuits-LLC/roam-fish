import { NavLink } from 'react-router'

const INSTAGRAM_URL = 'https://www.instagram.com/roam.fish/'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61578296994498'

export const FooterSocials = () => {
    return (
        <div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-[#1F513F]">
                Connect
            </h3>
            <ul className="space-y-2 font-semibold">
                <li>
                    <NavLink
                        to={INSTAGRAM_URL}
                        className="hover:text-emerald-600"
                    >
                        Instagram
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={FACEBOOK_URL}
                        className="hover:text-emerald-600"
                    >
                        Facebook
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
