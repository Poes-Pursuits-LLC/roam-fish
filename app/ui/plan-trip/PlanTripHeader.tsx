import { Fish } from 'lucide-react'

export const PlanTripHeader = () => {
    return (
        <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
                <div className="p-3 bg-emerald-100 rounded-2xl">
                    <Fish className="h-8 w-8 text-emerald-700" />
                </div>
            </div>
            <h1 className="nature-header mb-4">Plan Your Trip</h1>
            <p className="nature-body text-xl">Let&apos;s catch some fish!</p>
        </div>
    )
}
