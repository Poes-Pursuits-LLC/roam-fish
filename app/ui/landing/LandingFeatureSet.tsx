import { Calendar, Fish, MapPin } from 'lucide-react'
import { FeatureSet } from '../FeatureSet'

export const LandingFeatureSet = () => {
    return <FeatureSet config={config} />
}

const config = {
    header: 'AI-Powered Fly Fishing Trip Planning in 30 Seconds',
    features: [
        {
            icon: MapPin,
            title: 'Expert Destination Planning',
            description:
                'Get detailed trip plans with recommended cities, airports, and places to stay for hundreds of fishing destinations',
        },
        {
            icon: Fish,
            title: 'Fishy Information',
            description:
                'Receive expert fly selection, hatch patterns, weather insights, and tactical advice tailored to your trip',
        },
        {
            icon: Calendar,
            title: 'Complete Trip Management',
            description:
                'Manage packing lists, budgets, checklists, and travel details all in one place.',
        },
    ],
}
