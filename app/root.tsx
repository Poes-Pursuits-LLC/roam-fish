import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'react-router'
import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { ClerkProvider } from '@clerk/react-router'
import { neobrutalism } from '@clerk/themes'
import type { Route } from './+types/root'
import './app.css'

export async function loader(args: Route.LoaderArgs) {
    return rootAuthLoader(args)
}

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Manrope:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
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
            <body className="bg-stone-50">
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
                baseTheme: neobrutalism,
                elements: {
                    avatarBox: {
                        width: '2.5rem',
                        height: '2.5rem',
                    },
                    pricingTableCardFooterButton: {
                        backgroundColor: '#1F513F',
                        color: 'white',
                        border: '2px solid black',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: '4px 4px 0px 0px #000000',
                        transition: 'all 150ms ease-in-out',
                        '&:hover': {
                            backgroundColor: '#2a6b54',
                            transform: 'translate(4px, 4px)',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            transform: 'translate(0px, 0px)',
                            boxShadow: 'none',
                        },
                        '&:focus': {
                            outline: 'none',
                            boxShadow:
                                '0 0 0 2px #1F513F, 0 0 0 4px white, 4px 4px 0px 0px #000000',
                        },
                    },
                },
            }}
        >
            <Outlet />
        </ClerkProvider>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!'
    let details = 'An unexpected error occurred.'
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error'
        details =
            error.status === 404
                ? 'The requested page could not be found.'
                : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}
