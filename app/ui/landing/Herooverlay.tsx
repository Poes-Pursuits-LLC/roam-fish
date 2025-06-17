import { NavLink } from 'react-router'
import { scrollToElement } from '~/utils'

export const HeroOverlay = () => {
    return (
        <div className="relative max-w-4xl mx-auto text-center py-32 z-2 h-full flex flex-col justify-center">
            <h1 className="neo-header mb-4 text-slate-50">
                The simplest fishing planner on the internet
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-8 text-slate-50 max-w-2xl mx-auto">
                Plan your next fishing trip in seconds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NavLink to="/plan-trip" className="neo-button">
                    Start Planning
                </NavLink>
                <button
                    onClick={() => scrollToElement('destinations')}
                    className="neo-button-secondary"
                >
                    Explore Destinations
                </button>
            </div>
        </div>
    )
}
