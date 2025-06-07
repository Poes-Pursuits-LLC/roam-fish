import Hero from '~/ui/Hero'
import Features from '~/ui/landing/Features'
import { Destinations, DestinationsFallback } from '~/ui/landing/Destinations'
import { FAQ } from '~/ui/landing/FAQ'
import { Footer } from '~/ui/landing/Footer'
import Navbar from '~/ui/Navbar'
import type { Route } from './+types/landing'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'
import { Suspense } from 'react'
import { getAuth } from '@clerk/react-router/ssr.server'

export function meta() {
    return [
        { title: 'Roam.Fish' },
        {
            name: 'description',
            content: 'The simplest fishing trip planner on the internet',
        },
    ]
}

export async function loader(args: Route.LoaderArgs) {
    const { userId } = await getAuth(args)

    const client = hc<AppType>(process.env.SERVER_URL!)
    const getDestinationsPromise = client.destinations
        .$get()
        .then((res) => res.json())
        .then((data) => data.destinations)

    return { getDestinationsPromise, userId }
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
    const { getDestinationsPromise, userId } = loaderData

    return (
        <div className="min-h-screen bg-white">
            <Navbar userId={userId} />
            <Hero />
            <Features />
            <Suspense fallback={<DestinationsFallback />}>
                <Destinations promise={getDestinationsPromise} />
            </Suspense>
            <FAQ />
            <Footer />
        </div>
    )
}
