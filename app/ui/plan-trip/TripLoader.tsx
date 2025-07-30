import { useState, useEffect } from 'react'
import { Progress } from './Progress'
import { useNavigate } from 'react-router'

export const TripLoader = ({ tripId }: { tripId: string }) => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)
    const [shouldNavigate, setShouldNavigate] = useState(false)
    const DURATION = 20000
    const INTERVAL = 50
    const totalSteps = Math.ceil(DURATION / INTERVAL)
    const incrementPerStep = 100 / totalSteps

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                const newProgress = Math.min(
                    100,
                    oldProgress + incrementPerStep,
                )

                if (newProgress >= 100) {
                    clearInterval(timer)
                    setShouldNavigate(true)
                    return 100
                }
                return newProgress
            })
        }, INTERVAL)

        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        if (shouldNavigate) {
            navigate(`/trip/${tripId}`, { replace: true })
        }
    }, [shouldNavigate, navigate, tripId])

    return (
        <div className="flex justify-center">
            <div className="nature-card-elevated max-w-lg w-full text-center">
                <div className="mb-8">
                    <h2 className="nature-subheader text-slate-800 mb-4">
                        Planning Your Trip...
                    </h2>
                    <p className="nature-body text-lg">
                        Please do not refresh your browser
                    </p>
                </div>

                <div className="space-y-6 mb-8">
                    <div className="space-y-4">
                        <Progress value={progress} className="h-3" />
                        <p className="text-2xl font-semibold text-slate-700">
                            {Math.round(progress)}%
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="nature-body text-lg">
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
        </div>
    )
}
