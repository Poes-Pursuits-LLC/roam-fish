import Navbar from '~/ui/Navbar'
import { getAuth } from '@clerk/react-router/ssr.server'
import { PricingTable } from '@clerk/react-router'
import { FAQ } from '~/ui/FAQ'
import { BillingFeatureSet } from '~/ui/billing/BillingFeatureSet'

type LoaderData = {
    userId: string | null
    isSubscriber: boolean
}

export const loader = async (args: { request: Request }) => {
    const { userId, has } = await getAuth(args)
    const isSubscriber = has({ plan: 'roam_premium' })
    return { userId, isSubscriber } as LoaderData
}

export default function PricingRoute({
    loaderData,
}: {
    loaderData: LoaderData
}) {
    const { userId, isSubscriber } = loaderData

    return (
        <div className="min-h-screen bg-stone-100">
            <Navbar userId={userId} isSubscriber={isSubscriber} />

            <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white border-b-4 border-black">
                <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-stone-200 max-w-2xl mx-auto">
                        Choose the plan that fits your fishing adventures.
                        Upgrade, downgrade, or cancel anytime.
                    </p>
                </div>
            </div>

            <div className="border-b-4 border-black bg-white">
                <BillingFeatureSet />
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="neo-card bg-white p-8">
                        <PricingTable />
                    </div>
                </div>
            </div>

            <FAQ
                config={[
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
                ]}
            />
        </div>
    )
}
