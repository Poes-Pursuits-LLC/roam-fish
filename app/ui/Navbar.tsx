import { NavLink } from 'react-router'

const Navbar = () => {
    return (
        <nav className="bg-stone-50 border-b-4 border-black px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <NavLink
                    className="flex items-center space-x-2 cursor-pointer"
                    to="/"
                >
                    <span className="text-2xl font-black uppercase tracking-wide text-slate-800">
                        Roam.Fish
                    </span>
                </NavLink>

                <div className="flex items-center space-x-4">
                    <NavLink
                        to="/plan-trip"
                        className="neo-button bg-amber-400"
                    >
                        Plan Trip
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="neo-button bg-emerald-700 text-white border-black"
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
