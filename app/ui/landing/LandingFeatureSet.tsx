import { Calendar, Fish, MapPin } from 'lucide-react'
import { FeatureSet } from '../FeatureSet'

export const LandingFeatureSet = () => {
    return <FeatureSet config={config} />
}

const config = {
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
}
