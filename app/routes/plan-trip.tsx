import { ArrowLeft, Fish } from 'lucide-react'
import TripForm from '~/ui/TripForm'
import TripLoader from '~/ui/TripLoader'
import { NavLink } from 'react-router'
import type { Route } from './+types/plan-trip'
import { hc } from 'hono/client'
import type { AppType } from '~/server/main'
import { useState } from 'react'

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData()
    const destinationName = String(formData.get('destinationName'))
    const startDate = String(formData.get('startDate'))

    const client = hc<AppType>(process.env.SERVER_URL!)
    const response = await client.createTrip.$post({
        json: {
            destinationName,
            startDate,
            endDate: startDate,
        },
    })
}

export default function PlanTripPage({ actionData }: Route.ComponentProps) {
    const [isLoading, setIsLoading] = useState(false)

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
                        <div className="flex justify-center">
                            <div className="w-full max-w-lg">
                                <TripForm />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
