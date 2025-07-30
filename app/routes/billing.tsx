import { Navbar } from '~/ui/Navbar'
import { PricingTable } from '@clerk/react-router'
import { BillingFeatureSet } from '~/ui/billing/BillingFeatureSet'
import type { Route } from './+types/billing'
import { billingLoader } from '~/loaders/billing.loader'
import { BillingFAQ } from '~/ui/billing/BillingFAQ'
import { BillingHeader } from '~/ui/billing/BillingHeader'
import { Footer } from '~/ui/landing/Footer'

export const loader = async (args: Route.LoaderArgs) => {
    return await billingLoader(args)
}

export default function PricingRoute({ loaderData }: Route.ComponentProps) {
    const { userId, isSubscriber } = loaderData
    const redirectUrl = `${import.meta.env.VITE_WEB_URL}/billing?update=true`

    return (
        <div className="min-h-screen nature-gradient-bg">
            <Navbar userId={userId} isSubscriber={isSubscriber} />
            <BillingHeader />
            <div className="border-b nature-border bg-white">
                <BillingFeatureSet />
            </div>
            <div className="flex flex-col items-center max-w-6xl mx-auto px-6 py-16">
                <h1 className="nature-subheader mb-8 text-slate-800">
                    Available Plans
                </h1>
                <div className="nature-card-elevated w-full max-w-4xl">
                    <PricingTable newSubscriptionRedirectUrl={redirectUrl} />
                </div>
            </div>
            <BillingFAQ />
            <Footer />
        </div>
    )
}
