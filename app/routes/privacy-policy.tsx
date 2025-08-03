import { BackButton } from '~/ui/BackButton'

export function meta() {
    return [
        { title: 'Privacy Policy' },
        {
            name: 'description',
            content:
                'Privacy Policy for Roam Fish - The simplest fish trip planner on the internet',
        },
    ]
}

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-8">
            <div className="w-full max-w-4xl">
                <BackButton />
                <div className="nature-card">
                    <h1 className="nature-header text-gray-800 mb-6">
                        Privacy Policy
                    </h1>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                1. Information We Collect
                            </h2>
                            <p className="text-lg leading-relaxed mb-3">
                                We collect information you provide directly to
                                us, such as when you create an account, plan a
                                trip, or contact us for support.
                            </p>
                            <p className="text-lg leading-relaxed">
                                This may include your name, email address, trip
                                details, preferences, and any other information
                                you choose to provide.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-lg leading-relaxed mb-3">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-lg leading-relaxed ml-4 space-y-1">
                                <li>
                                    Provide, maintain, and improve our services
                                </li>
                                <li>Process and complete transactions</li>
                                <li>
                                    Send you technical notices and support
                                    messages
                                </li>
                                <li>Respond to your comments and questions</li>
                                <li>
                                    Communicate with you about products,
                                    services, and events
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                3. Information Sharing
                            </h2>
                            <p className="text-lg leading-relaxed">
                                We do not sell, trade, or otherwise transfer
                                your personal information to third parties
                                without your consent, except as described in
                                this policy. We may share your information with
                                service providers who assist us in operating our
                                website and providing services.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                4. Data Security
                            </h2>
                            <p className="text-lg leading-relaxed">
                                We implement appropriate security measures to
                                protect your personal information against
                                unauthorized access, alteration, disclosure, or
                                destruction. However, no method of transmission
                                over the internet is 100% secure, and we cannot
                                guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                5. Cookies and Tracking
                            </h2>
                            <p className="text-lg leading-relaxed">
                                We use cookies and similar tracking technologies
                                to enhance your experience on our website. You
                                can control cookie settings through your browser
                                preferences. Disabling cookies may affect the
                                functionality of our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                6. Third-Party Services
                            </h2>
                            <p className="text-lg leading-relaxed">
                                Our service may contain links to third-party
                                websites or services. We are not responsible for
                                the privacy practices of these third parties. We
                                encourage you to review their privacy policies
                                before providing any personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                7. Children&rsquo;s Privacy
                            </h2>
                            <p className="text-lg leading-relaxed">
                                Our service is not intended for children under
                                the age of 13. We do not knowingly collect
                                personal information from children under 13. If
                                you are a parent or guardian and believe your
                                child has provided us with personal information,
                                please contact us.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                8. Your Rights
                            </h2>
                            <p className="text-lg leading-relaxed mb-3">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside text-lg leading-relaxed ml-4 space-y-1">
                                <li>
                                    Access and update your personal information
                                </li>
                                <li>
                                    Request deletion of your personal
                                    information
                                </li>
                                <li>Opt out of marketing communications</li>
                                <li>Request a copy of your data</li>
                                <li>
                                    Lodge a complaint with relevant authorities
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                9. Changes to This Policy
                            </h2>
                            <p className="text-lg leading-relaxed">
                                We may update this Privacy Policy from time to
                                time. We will notify you of any changes by
                                posting the new Privacy Policy on this page and
                                updating the &ldquo;Last updated&rdquo; date. We
                                encourage you to review this policy
                                periodically.
                            </p>
                        </section>

                        <section>
                            <h2 className="nature-subheader text-gray-800 mb-3">
                                10. Contact Us
                            </h2>
                            <p className="text-lg leading-relaxed">
                                If you have any questions about this Privacy
                                Policy or our privacy practices, please contact
                                us at admin@roam.fish.
                            </p>
                        </section>

                        <div className="mt-8 pt-6 border-t-2 border-gray-300">
                            <p className="text-sm text-gray-600">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
