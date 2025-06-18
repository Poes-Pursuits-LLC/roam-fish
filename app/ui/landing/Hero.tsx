import { HeroVideo } from './HeroVideo'
import { HeroOverlay } from './Herooverlay'

const Hero = () => {
    return (
        <section className="relative overflow-hidden h-[50vh] min-h-[600px]">
            <div className="absolute bg-gray-600/40 w-full h-full z-1" />
            <HeroVideo />
            <HeroOverlay />
        </section>
    )
}

export default Hero
