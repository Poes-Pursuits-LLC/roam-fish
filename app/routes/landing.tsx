import Hero from '~/ui/landing/Hero'
import Features from '~/ui/Features'
import { Destinations, DestinationsFallback } from '~/ui/landing/Destinations'
import { FAQ } from '~/ui/FAQ'
import { Footer } from '~/ui/landing/Footer'
import Navbar from '~/ui/Navbar'
import type { Route } from './+types/landing'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'
import { Suspense } from 'react'
import { getAuth } from '@clerk/react-router/ssr.server'
import { Fish, Calendar, MapPin } from 'lucide-react'

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
    const { userId, has } = await getAuth(args)
    const isSubscriber = has({ plan: 'roam_premium' })

    const client = hc<AppType>(process.env.SERVER_URL!)
    const getDestinationsPromise = client.destinations
        .$get()
        .then((res) => res.json())
        .then((data) => data.destinations)

    return { getDestinationsPromise, userId, isSubscriber }
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
    const { getDestinationsPromise, userId, isSubscriber } = loaderData

    return (
        <div className="min-h-screen bg-white">
            <Navbar userId={userId} isSubscriber={isSubscriber} />
            <Hero />
            <Features
                config={{
                    header: 'Everything You Need To Fish Better',
                    features: [
                        {
                            icon: MapPin,
                            title: 'Find Perfect Spots',
                            description:
                                'Discover the best fishing locations based on your preferences and skill level',
                        },
                        {
                            icon: Calendar,
                            title: 'Plan Your Schedule',
                            description:
                                'Optimize timing for weather, tides, and fish activity patterns',
                        },
                        {
                            icon: Fish,
                            title: 'Track Your Catches',
                            description:
                                'Log your successful trips and build your fishing knowledge base',
                        },
                    ],
                }}
            />
            <Suspense fallback={<DestinationsFallback />}>
                <Destinations promise={getDestinationsPromise} />
            </Suspense>
            <FAQ
                config={[
                    {
                        question: 'How does it work?',
                        answer: "It's simple. You specify your desired destination, the amount of people going, when you want to go,  and we'll do the rest. A custom trip with flights, accommodations, a packing list, and fly-fishing specific information like flies, weather, and tactics will be generated for you in under thirty seconds.",
                    },
                    {
                        question: 'Why not just use Yellow Dog?',
                        answer: 'Yellow Dog is an amazing service and everyone should use them. That being said, they tend to focus on expensive, all-inclusive lodge experiences which may have 3-day minimums. Roam, on the other hand, gives you immediate information as a starting point as well as tools to plan your trip, filling the niche for your DIY and budget-friendly trips.',
                    },
                    {
                        question: 'I made my first trip. Now what?',
                        answer: 'Once you have made your free trip, you can sign up to create more trips and use our trip management tools for free.',
                    },
                    {
                        question: 'How much does it cost?',
                        answer: 'Roam is completely free to use. A fully optional yearly plan is available to unlock advanced features and manage unlimited trips.',
                    },
                ]}
            />
            <Footer />
        </div>
    )
}
