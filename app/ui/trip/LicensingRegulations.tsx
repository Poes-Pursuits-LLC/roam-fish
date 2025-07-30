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
            <div className="nature-card h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <Shield className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h2 className="nature-subheader text-slate-800">
                        Licensing & Regulations
                    </h2>
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">
                            Access Licensing & Regulations
                        </h3>
                        <p className="nature-body mb-4">
                            Sign up for free then become a premium member to
                            access detailed licensing requirements and fishing
                            regulations for your destination.
                        </p>
                        <NavLink to="/login" className="nature-button">
                            Sign Up Free
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }

    if (!isSubscriber) {
        return (
            <div className="nature-card h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <Crown className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h2 className="nature-subheader text-slate-800">
                        Licensing & Regulations
                    </h2>
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">
                            Upgrade to Premium
                        </h3>
                        <p className="nature-body mb-4">
                            Become a premium member to access detailed licensing
                            requirements and fishing regulations for your
                            destination.
                        </p>
                        <NavLink to="/billing" className="nature-button">
                            Upgrade Now
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="nature-card h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                    <Clock className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="nature-subheader text-slate-800">
                    Licensing & Regulations
                </h2>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        Coming Soon
                    </h3>
                    <p className="nature-body">
                        Detailed licensing requirements and fishing regulations
                        will be available soon for premium members.
                    </p>
                </div>
            </div>
        </div>
    )
}
