import Hero from '~/ui/landing/Hero'
import { Destinations, DestinationsFallback } from '~/ui/landing/Destinations'
import { Footer } from '~/ui/landing/Footer'
import Navbar from '~/ui/Navbar'
import type { Route } from './+types/landing'
import { Suspense } from 'react'
import { landingLoader } from './landing.loader'
import { LandingFAQ } from '~/ui/landing/LandingFAQ'
import { LandingFeatureSet } from '~/ui/landing/LandingFeatureSet'

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
    const { getDestinationsPromise, userId, isSubscriber } =
        await landingLoader(args)

    return { getDestinationsPromise, userId, isSubscriber }
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
    const { getDestinationsPromise, userId, isSubscriber } = loaderData

    return (
        <div className="min-h-screen bg-white">
            <Navbar userId={userId} isSubscriber={isSubscriber} />
            <Hero />
            <LandingFeatureSet />
            <Suspense fallback={<DestinationsFallback />}>
                <Destinations promise={getDestinationsPromise} />
            </Suspense>
            <LandingFAQ />
            <Footer />
        </div>
    )
}
