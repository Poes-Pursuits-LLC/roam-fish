import { Suspense } from 'react'
import type { Route } from '../../routes/+types/landing'
import Navbar from '../Navbar'
import Hero from './Hero'
import { LandingFeatureSet } from './LandingFeatureSet'
import { Destinations, DestinationsFallback } from './Destinations'
import { LandingFAQ } from './LandingFAQ'
import { Footer } from './Footer'

export const LandingPage = (loaderData: Route.ComponentProps['loaderData']) => {
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
