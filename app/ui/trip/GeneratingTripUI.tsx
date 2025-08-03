import { InfoCards } from './Trip.InfoCards'

interface GeneratingTripUIProps {
    tripName?: string
    destinationName: string
    startDate: string
    duration: string
    headcount: string
}

export const GeneratingTripUI = ({
    tripName,
    destinationName,
    startDate,
    duration,
    headcount,
}: GeneratingTripUIProps) => {
    return (
        <div className="min-h-screen bg-stone-100">
            <div className="px-4 sm:px-6 py-4 sm:py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {tripName || `Trip to ${destinationName}`}
                        </h1>
                    </div>
                    
                    <InfoCards
                        destinationName={destinationName}
                        date={startDate}
                        duration={duration}
                        participants={headcount}
                    />
                    
                    <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
                        <div className="animate-pulse">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </div>
                        
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Your trip is being generated
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Our AI is crafting the perfect fishing trip details for you. This usually takes 10-30 seconds.
                        </p>
                        
                        <div className="bg-blue-50 rounded-lg p-4 max-w-sm mx-auto">
                            <p className="text-sm text-blue-800">
                                <strong>Tip:</strong> Refresh this page in a few moments to see your complete trip details.
                            </p>
                        </div>
                        
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}