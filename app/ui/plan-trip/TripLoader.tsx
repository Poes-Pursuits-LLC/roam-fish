import { useState, useEffect } from 'react'
import { Progress } from './Progress'
import { useNavigate } from 'react-router'

const TripLoader = ({ tripId }: { tripId: string }) => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)
    const DURATION = 15000
    const INTERVAL = 50
    const totalSteps = Math.ceil(DURATION / INTERVAL)
    const incrementPerStep = 100 / totalSteps

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer)
                    navigate(`/trip/${tripId}`)
                    return 100
                }
                return Math.min(100, oldProgress + incrementPerStep)
            })
        }, INTERVAL)

        return () => clearInterval(timer)
    }, [navigate])

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
            <div className="w-full max-w-md space-y-4">
                <h2 className="neo-subheader text-center text-slate-800">
                    Planning Your Trip...
                </h2>
                Please do not refresh your browser.
                <div className="space-y-2">
                    <Progress
                        value={progress}
                        className="h-6 bg-stone-200 border-2 border-black"
                    />
                    <p className="text-center text-lg font-bold text-slate-700">
                        {Math.round(progress)}%
                    </p>
                </div>
                <div className="text-center space-y-1">
                    <p className="text-sm font-semibold text-slate-600">
                        {progress < 30 && 'Analyzing fishing conditions...'}
                        {progress >= 30 &&
                            progress < 60 &&
                            'Finding the best spots...'}
                        {progress >= 60 &&
                            progress < 90 &&
                            'Checking weather patterns...'}
                        {progress >= 90 && 'Finalizing your trip plan...'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TripLoader
