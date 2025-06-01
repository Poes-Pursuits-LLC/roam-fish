import type { Route } from './+types/home'
import Navbar from '~/ui/components/Navbar'
import Hero from '~/ui/components/Hero'
import Features from '~/ui/components/Features'
import { Search } from '~/ui/components/Search'
import { Destinations } from '~/ui/components//Destinations'
import { FAQ } from '~/ui/components/FAQ'
import { Footer } from '~/ui/components/Footer'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Roam.Fish' },
        {
            name: 'description',
            content: 'The simplest fish trip planner in existence',
        },
    ]
}

export const serverLoader = async () => {
    // get destination
}

export default function LandingPage({ loaderData }) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            <Search />
            <Destinations />
            <FAQ />
            <Footer />
        </div>
    )
}
