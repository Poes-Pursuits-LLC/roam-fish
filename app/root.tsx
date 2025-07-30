import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { ClerkProvider } from '@clerk/react-router'
import type { Route } from './+types/root'
import './app.css'
import * as Sentry from '@sentry/react'
import { ErrorBoundaryDisplay } from './ui/ErrorBoundaryDisplay'

if (import.meta.env.PROD && typeof window !== 'undefined') {
    Sentry.init({
        dsn: 'https://81f4e9f76eb074232d02c47f66858dc5@o4509523849838592.ingest.us.sentry.io/4509523864584192',
        sendDefaultPii: true,
    })
}

export async function loader(args: Route.LoaderArgs) {
    return rootAuthLoader(args)
}

export const links: Route.LinksFunction = () => [
    {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
    },
]

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App({ loaderData }: Route.ComponentProps) {
    return (
        <ClerkProvider
            loaderData={loaderData}
            appearance={{
                elements: {
                    avatarBox: {
                        width: '2.5rem',
                        height: '2.5rem',
                    },
                    card: {
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 20px rgba(6, 95, 70, 0.1)',
                    },
                    formButtonPrimary: {
                        backgroundColor:
                            'linear-gradient(to right, #059669, #10b981)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1.5rem',
                        fontWeight: '500',
                        boxShadow: '0 4px 20px rgba(6, 95, 70, 0.1)',
                        transition: 'all 0.3s ease-out',
                        '&:hover': {
                            backgroundColor:
                                'linear-gradient(to right, #047857, #059669)',
                            transform: 'scale(1.05) translateY(-2px)',
                            boxShadow: '0 10px 40px rgba(6, 95, 70, 0.15)',
                        },
                        '&:active': {
                            transform: 'scale(0.95) translateY(0)',
                        },
                        '&:focus': {
                            outline: 'none',
                            boxShadow: '0 0 0 2px #10b981, 0 0 0 4px white',
                        },
                    },
                    pricingTableCardFooterButton: {
                        backgroundColor:
                            'linear-gradient(to right, #059669, #10b981)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1.5rem',
                        fontWeight: '500',
                        boxShadow: '0 4px 20px rgba(6, 95, 70, 0.1)',
                        transition: 'all 0.3s ease-out',
                        '&:hover': {
                            backgroundColor:
                                'linear-gradient(to right, #047857, #059669)',
                            transform: 'scale(1.05) translateY(-2px)',
                            boxShadow: '0 10px 40px rgba(6, 95, 70, 0.15)',
                        },
                        '&:active': {
                            transform: 'scale(0.95) translateY(0)',
                        },
                        '&:focus': {
                            outline: 'none',
                            boxShadow: '0 0 0 2px #10b981, 0 0 0 4px white',
                        },
                    },
                },
            }}
        >
            <Outlet />
        </ClerkProvider>
    )
}

export function ErrorBoundary(props: Route.ErrorBoundaryProps) {
    return <ErrorBoundaryDisplay {...props} />
}
