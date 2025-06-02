import { Fish } from 'lucide-react'
import { NavLink } from 'react-router'

export const Footer = () => {
    return (
        <footer className="bg-slate-800 text-stone-100 border-t-4 border-black px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Fish className="w-8 h-8 text-amber-400" />
                            <span className="text-2xl font-black uppercase tracking-wide">
                                Roam.Fish
                            </span>
                        </div>
                        <p className="text-lg font-semibold mb-4">
                            Your ultimate fishing adventure companion
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-amber-400">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 font-semibold">
                            <li>
                                <NavLink
                                    to="/plan-trip"
                                    className="hover:text-emerald-400"
                                >
                                    Plan Trip
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-amber-400">
                            Support
                        </h3>
                        <ul className="space-y-2 font-semibold">
                            <li>
                                <a href="#" className="hover:text-emerald-400">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-emerald-400">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-emerald-400">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t-2 border-stone-100 mt-8 pt-8 text-center">
                    <p className="font-bold">
                        © 2024 FishTrip. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
