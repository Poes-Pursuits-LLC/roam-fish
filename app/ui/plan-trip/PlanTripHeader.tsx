import { Fish } from 'lucide-react'

export const PlanTripHeader = async () => {
    return (
        <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
                <Fish className="h-6 w-6" />
            </div>
            <h1 className="neo-header text-slate-800 mb-4">Plan Your Trip</h1>
            <p className="text-2xl font-bold text-slate-700">
                Let&apos;s catch some fish!
            </p>
        </div>
    )
}
