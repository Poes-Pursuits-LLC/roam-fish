import { NavLink } from 'react-router'
import { scrollToElement } from '~/utils'

const Hero = () => {
    return (
        <section className="px-6 py-20 bg-gradient-to-br from-stone-200 to-stone-300 border-b-4 border-black">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="neo-header mb-6 text-slate-800">
                    Plan Your Perfect Fishing Adventure
                </h1>
                <p className="text-xl md:text-2xl font-bold mb-8 text-slate-700 max-w-2xl mx-auto">
                    From bass to trout, lakes to oceans - we help you catch the
                    fish of your dreams
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <NavLink
                        to="/plan-trip"
                        className="neo-button text-xl px-8 py-4 bg-amber-400"
                    >
                        Start Planning
                    </NavLink>
                    <button
                        onClick={() =>
                            scrollToElement({ elementId: '#destinations' })
                        }
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
