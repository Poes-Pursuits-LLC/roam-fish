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
        <div className="min-h-screen flex items-center justify-center px-6">
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
                            formButtonPrimary: 'neo-button-for-login',
                            input: 'neo-input',
                            label: 'block text-lg font-bold mb-2 uppercase tracking-wide text-slate-800',
                            headerTitle: 'neo-subheader text-slate-800 mb-2',
                            headerSubtitle:
                                'text-lg font-semibold text-slate-700',
                            formFieldErrorText: 'text-destructive',
                        },
                    }}
                />
            </div>
        </div>
    )
}
