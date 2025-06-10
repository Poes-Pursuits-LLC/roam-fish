import { Clock, Shield, Zap } from 'lucide-react'
import { FeatureSet } from '../FeatureSet'

export const BillingFeatureSet = () => {
    return <FeatureSet config={config} />
}

const config = {
    header: 'Cancel Anytime',
    features: [
        {
            icon: Shield,
            title: 'Cancel Anytime',
            description:
                'No long-term commitments. Cancel your subscription whenever you want.',
        },
        {
            icon: Clock,
            title: '14-Day Free Trial',
            description:
                'Try all premium features risk-free. No credit card required.',
        },
        {
            icon: Zap,
            title: 'Instant Access',
            description:
                'Get immediate access to all features when you upgrade.',
        },
    ],
}
