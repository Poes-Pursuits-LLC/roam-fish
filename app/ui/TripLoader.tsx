import { useState, useEffect } from 'react'
import { Fish } from 'lucide-react'
import { Progress } from './Progress'

const TripLoader = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer)
                    return 100
                }
                return oldProgress + 2
            })
        }, 60)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
            {/* Fish jumping animation with waves */}
            <div className="relative w-full max-w-md h-32 mb-8">
                {/* Animated waves */}
                <div className="absolute bottom-0 w-full h-8 overflow-hidden">
                    <div className="absolute bottom-0 w-[200%] h-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-full animate-wave opacity-80"></div>
                    <div
                        className="absolute bottom-1 w-[200%] h-5 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 rounded-full animate-wave opacity-60"
                        style={{
                            animationDuration: '2.5s',
                            animationDirection: 'reverse',
                        }}
                    ></div>
                    <div
                        className="absolute bottom-2 w-[200%] h-4 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-full animate-wave opacity-40"
                        style={{ animationDuration: '3s' }}
                    ></div>
                </div>

                {/* Fish with jumping animation */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <Fish className="w-12 h-12 text-blue-600 animate-fishJump transform rotate-12" />
                </div>

                {/* Water splash effect */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-8">
                    <div className="w-full h-full bg-blue-300 rounded-full animate-splash opacity-0"></div>
                </div>
            </div>

            {/* Progress section */}
            <div className="w-full max-w-md space-y-4">
                <h2 className="neo-subheader text-center text-slate-800">
                    Planning Your Trip...
                </h2>

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
