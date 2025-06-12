import { FAQ } from '../FAQ'

export const BillingFAQ = () => {
    return <FAQ config={config} />
}

const config = [
    {
        question: 'What happens if I cancel my subscription?',
        answer: 'You&apos;ll maintain access to premium features until the end of your billing period. After that, you&apos;ll revert to the free plan, keeping all your trip data intact.',
    },
    {
        question: 'Can I switch between plans?',
        answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
    },
    {
        question: 'Is there a long-term commitment?',
        answer: 'No, we don&apos;t believe in locking you in. All our plans are month-to-month, and you can cancel anytime.',
    },
]
