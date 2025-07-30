import { BackButton } from '~/ui/BackButton'

export function meta() {
    return [
        { title: 'Terms of Service' },
        {
            name: 'description',
            content:
                'Terms of Service for Roam Fish - The simplest fish trip planner on the internet',
        },
    ]
}

export default function TermsPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-8">
            <div className="w-full max-w-4xl">
                <BackButton />
                <div className="nature-card">
                    <h1 className="nature-header text-slate-800 mb-6">
                        Terms of Service
                    </h1>

                    <div className="space-y-6 text-slate-700">
                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-lg leading-relaxed">
                                By accessing and using Roam Fish (&ldquo;the
                                Service&rdquo;), you accept and agree to be
                                bound by the terms and provision of this
                                agreement. If you do not agree to abide by the
                                above, please do not use this service.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                2. Description of Service
                            </h2>
                            <p className="text-lg leading-relaxed">
                                Roam Fish is a trip planning service that helps
                                users organize and plan their fishing trips. The
                                service includes features such as trip planning,
                                budget management, packing lists, and travel
                                details.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                3. User Accounts
                            </h2>
                            <p className="text-lg leading-relaxed">
                                You are responsible for maintaining the
                                confidentiality of your account and password.
                                You agree to accept responsibility for all
                                activities that occur under your account or
                                password.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                4. User Conduct
                            </h2>
                            <p className="text-lg leading-relaxed">
                                You agree not to use the Service to:
                            </p>
                            <ul className="list-disc list-inside text-lg leading-relaxed ml-4 space-y-1">
                                <li>
                                    Violate any applicable laws or regulations
                                </li>
                                <li>Infringe upon the rights of others</li>
                                <li>
                                    Transmit harmful, offensive, or
                                    inappropriate content
                                </li>
                                <li>
                                    Attempt to gain unauthorized access to the
                                    Service
                                </li>
                                <li>
                                    Interfere with the proper functioning of the
                                    Service
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                5. Privacy Policy
                            </h2>
                            <p className="text-lg leading-relaxed">
                                Your privacy is important to us. Please review
                                our Privacy Policy, which also governs your use
                                of the Service, to understand our practices.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                6. Intellectual Property
                            </h2>
                            <p className="text-lg leading-relaxed">
                                The Service and its original content, features,
                                and functionality are and will remain the
                                exclusive property of Roam Fish and its
                                licensors. The Service is protected by
                                copyright, trademark, and other laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                7. Limitation of Liability
                            </h2>
                            <p className="text-lg leading-relaxed">
                                In no event shall Roam Fish, nor its directors,
                                employees, partners, agents, suppliers, or
                                affiliates, be liable for any indirect,
                                incidental, special, consequential, or punitive
                                damages, including without limitation, loss of
                                profits, data, use, goodwill, or other
                                intangible losses.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                8. Termination
                            </h2>
                            <p className="text-lg leading-relaxed">
                                We may terminate or suspend your account and bar
                                access to the Service immediately, without prior
                                notice or liability, under our sole discretion,
                                for any reason whatsoever and without
                                limitation, including but not limited to a
                                breach of the Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                9. Changes to Terms
                            </h2>
                            <p className="text-lg leading-relaxed">
                                We reserve the right, at our sole discretion, to
                                modify or replace these Terms at any time. If a
                                revision is material, we will provide at least
                                30 days notice prior to any new terms taking
                                effect.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-slate-800 mb-3">
                                10. Contact Information
                            </h2>
                            <p className="text-lg leading-relaxed">
                                If you have any questions about these Terms of
                                Service, please contact us at
                                support@roamfish.com.
                            </p>
                        </section>

                        <div className="mt-8 pt-6 border-t-2 border-slate-300">
                            <p className="text-sm text-slate-600">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
