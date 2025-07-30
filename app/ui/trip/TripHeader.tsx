import { useState } from 'react'
import { SignUpCTA } from './SignUpCTA'

export const TripHeader = ({
    tripName,
    userId,
    canEditTrip,
}: {
    tripName: string | undefined
    userId: string | null
    canEditTrip: boolean
}) => {
    const [localTripName, setLocalTripName] = useState<string>(tripName ?? '')

    return (
        <div className="mb-8">
            <div className="flex justify-between gap-2 flex-col sm:flex-row">
                <input
                    name="tripName"
                    className="w-full nature-header cursor-pointer truncate text-slate-700 bg-slate-50 focus:outline-none hover:bg-slate-100 transition-colors rounded-lg px-4 py-2"
                    value={localTripName}
                    data-testid="trip-name-input"
                    onChange={(e) => setLocalTripName(e.target.value)}
                />
                {userId && (
                    <button
                        type="submit"
                        disabled={!canEditTrip}
                        className="nature-button-earth px-4 py-2 text-sm"
                    >
                        Save Changes
                    </button>
                )}
            </div>
            {!userId && (
                <SignUpCTA
                    title="Want to save this trip?"
                    description="Sign up for free to access our trip management tools and save many more trips!"
                />
            )}
        </div>
    )
}
