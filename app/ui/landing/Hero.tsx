import { NavLink } from 'react-router'
import { scrollToElement } from '~/utils'

const Hero = () => {
    return (
        <section className="relative px-6 py-20 bg-gradient-to-br from-stone-200 to-stone-300 border-b-4 border-black">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
                }}
            />
            <div className="relative max-w-4xl mx-auto text-center">
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
