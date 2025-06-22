import { Lock, Shield, Zap } from 'lucide-react'
import { FeatureSet } from '../FeatureSet'

export const BillingFeatureSet = () => {
    return <FeatureSet config={config} />
}

const config = {
    features: [
        {
            icon: Lock,
            title: 'Get More',
            description:
                'Unlock unlimited trips, shared trip management, and more information like licensing requirements and regulations per destination',
        },
        {
            icon: Shield,
            title: 'Cancel Anytime',
            description:
                'No long-term commitments. Cancel your subscription whenever you want.',
        },
        {
            icon: Zap,
            title: 'Instant Access',
            description:
                'Get immediate access to all features when you upgrade.',
        },
    ],
}
