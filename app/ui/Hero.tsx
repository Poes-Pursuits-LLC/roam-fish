import { NavLink } from 'react-router'
import { scrollToElement } from '~/utils'

const Hero = () => {
    return (
        <section className="relative px-6 py-20 bg-gradient-to-br from-stone-200/90 to-stone-300/90 border-b-4 border-black overflow-hidden">
            <div className="relative max-w-4xl mx-auto text-center">
                <h1 className="neo-header mb-6 text-slate-800">
                    The simplest fishing planner on the internet
                </h1>
                <p className="text-xl md:text-2xl font-bold mb-8 text-slate-700 max-w-2xl mx-auto">
                    Plan your next fishing trip in seconds
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <NavLink
                        to="/plan-trip"
                        className="neo-button text-xl px-8 py-4 bg-amber-400"
                    >
                        Start Planning
                    </NavLink>
                    <button
                        onClick={() => scrollToElement('destinations')}
                        className="neo-button text-xl px-8 py-4 bg-slate-700 text-slate-100 cursor-pointer"
                    >
                        Explore Destinations
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Hero
