import { NavLink } from 'react-router'
import { scrollToElement } from '~/utils'

export const HeroOverlay = () => {
    return (
        <div className="relative max-w-4xl mx-auto text-center py-32 z-2 h-full flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                The simplest fishing planner on the internet
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                Plan your next fishing trip in seconds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NavLink to="/plan-trip" className="nature-button">
                    Start Planning
                </NavLink>
                <button
                    onClick={() => scrollToElement('destinations')}
                    className="nature-button-earth"
                >
                    Explore Destinations
                </button>
            </div>
        </div>
    )
}
