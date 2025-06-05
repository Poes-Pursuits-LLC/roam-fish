import { useState } from 'react'
import { ArrowLeft, Fish } from 'lucide-react'
import TripForm from '~/ui/TripForm'
import TripLoader from '~/ui/TripLoader'
import { NavLink } from 'react-router'
import type { Route } from './+types/plan-trip'
import { hc } from 'hono/client'
import { getAuth } from '@clerk/react-router/ssr.server'

export async function loader(args: Route.LoaderArgs) {
    // auth check
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData()
    const destinationName = formData.get('destinationName')
    const startDate = formData.get('startDate')
    const endDate = formData.get('endDate')
}

export default function PlanTripPage({ actionData }: Route.ComponentProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleTripSubmit = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-stone-100">
            <div className="px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <NavLink to="/">
                        <button className="neo-button mb-8 flex items-center gap-2 bg-slate-700 text-slate-100 border-black">
                            <ArrowLeft className="w-5 h-5" />
                            Back Home
                        </button>
                    </NavLink>

                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <Fish className="h-6 w-6" />
                        </div>
                        <h1 className="neo-header text-slate-800 mb-4">
                            Plan Your Trip
                        </h1>
                        <p className="text-2xl font-bold text-slate-700">
                            Let&apos;s catch some fish!
                        </p>
                    </div>

                    {isLoading ? (
                        <TripLoader />
                    ) : (
                        <>
                            <div className="flex justify-center">
                                <div className="w-full max-w-lg">
                                    <TripForm onSubmit={handleTripSubmit} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
