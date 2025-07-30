import { SignIn } from '@clerk/react-router'
import { BackButton } from '~/ui/BackButton'

export function meta() {
    return [
        { title: 'Login' },
        {
            name: 'description',
            content: 'The simplest fish trip planner on the internet',
        },
    ]
}

export default function LoginPage() {
    return (
        <div className="min-h-screen nature-gradient-bg flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <BackButton />
                <SignIn
                    routing="hash"
                    transferable
                    withSignUp
                    signUpForceRedirectUrl={'/dashboard'}
                    forceRedirectUrl={'/dashboard'}
                    appearance={{
                        elements: {
                            footer: 'hidden',
                            formButtonPrimary: 'nature-button w-full',
                            input: 'nature-input',
                            label: 'block text-base font-medium mb-2 text-slate-700',
                            headerTitle: 'nature-subheader text-slate-800 mb-2',
                            headerSubtitle: 'nature-body',
                            formFieldErrorText: 'text-red-600',
                            card: 'nature-card-elevated',
                        },
                    }}
                />
            </div>
        </div>
    )
}
