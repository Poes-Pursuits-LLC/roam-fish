import Hero from '~/ui/Hero'
import Features from '~/ui/Features'
import { Search } from '~/ui/Search'
import { Destinations } from '~/ui/Destinations'
import { FAQ } from '~/ui/FAQ'
import { Footer } from '~/ui/Footer'
import Navbar from '~/ui/Navbar'
import type { Route } from './+types/landing'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'

export function meta() {
    return [
        { title: 'Roam.Fish' },
        {
            name: 'description',
            content: 'The simplest fish trip planner in existence',
        },
    ]
}

export async function loader() {
    const client = hc<AppType>(process.env.SERVER_URL!)
    const result = await client.destinations.$get()
    const { destinations } = await result.json()
    return destinations
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            <Search />
            <Destinations destinations={loaderData} />
            <FAQ />
            <Footer />
        </div>
    )
}
