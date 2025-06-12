import Navbar from '~/ui/Navbar'
import { PricingTable } from '@clerk/react-router'
import { BillingFeatureSet } from '~/ui/billing/BillingFeatureSet'
import type { Route } from './+types/billing'
import { billingLoader } from '~/loaders/billing.loader'
import { BillingFAQ } from '~/ui/billing/BillingFAQ'
import { BillingHeader } from '~/ui/billing/BillingHeader'

export const loader = async (args: Route.LoaderArgs) => {
    return await billingLoader(args)
}

export default function PricingRoute({ loaderData }: Route.ComponentProps) {
    const { userId, isSubscriber } = loaderData

    return (
        <div className="min-h-screen bg-stone-100">
            <Navbar userId={userId} isSubscriber={isSubscriber} />
            <BillingHeader />
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
            <BillingFAQ />
        </div>
    )
}
