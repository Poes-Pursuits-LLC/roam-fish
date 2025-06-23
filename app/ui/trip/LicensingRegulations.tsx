import { NavLink } from 'react-router'
import { Shield, Crown, Clock } from 'lucide-react'

export const LicensingRegulations = ({
    userId,
    isSubscriber,
}: {
    userId: string | null
    isSubscriber: boolean
}) => {
    if (!userId) {
        return (
            <div className="neo-card bg-stone-50 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-emerald-700" />
                    <h2 className="neo-subheader text-slate-800">
                        Licensing & Regulations
                    </h2>
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-3">
                            Access Licensing & Regulations
                        </h3>
                        <p className="text-sm font-semibold text-slate-700 mb-4">
                            Sign up for free then become a premium member to
                            access detailed licensing requirements and fishing
                            regulations for your destination.
                        </p>
                        <NavLink to="/login" className="neo-button">
                            Sign Up Free
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }

    if (!isSubscriber) {
        return (
            <div className="neo-card bg-stone-50 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-emerald-700" />
                    <h2 className="neo-subheader text-slate-800">
                        Licensing & Regulations
                    </h2>
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                            <Crown className="w-6 h-6 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-3">
                            Premium Feature
                        </h3>
                        <p className="text-sm font-semibold text-slate-700 mb-4">
                            Upgrade to premium to access comprehensive licensing
                            requirements and fishing regulations for your
                            destination.
                        </p>
                        <NavLink to="/billing" className="neo-button">
                            Upgrade to Premium
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="neo-card bg-stone-50 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-emerald-700" />
                <h2 className="neo-subheader text-slate-800">
                    Licensing & Regulations
                </h2>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                        <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3">
                        Coming Soon
                    </h3>
                    <p className="text-sm font-semibold text-slate-700">
                        We&apos;re working hard to bring you comprehensive
                        licensing requirements and fishing regulations for this
                        destination. Stay tuned!
                    </p>
                </div>
            </div>
        </div>
    )
}
