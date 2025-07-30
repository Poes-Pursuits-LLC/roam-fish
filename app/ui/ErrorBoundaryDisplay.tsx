import { isRouteErrorResponse, NavLink } from 'react-router'
import type { Route } from '../+types/root'
import * as Sentry from '@sentry/react'

export const ErrorBoundaryDisplay = ({ error }: Route.ErrorBoundaryProps) => {
    const isRouteException = isRouteErrorResponse(error)
    const displayMessage = isRouteException
        ? "That page doesn't exist. Use the link below to return home."
        : "Something went wrong while loading this page. Don't worry, our team has been notified."

    if (
        !isRouteException &&
        error &&
        error instanceof Error &&
        import.meta.env.PROD &&
        typeof window !== 'undefined'
    ) {
        Sentry.captureException(error)
    }

    return (
        <div className="min-h-screen nature-gradient-bg flex items-center justify-center p-4">
            <div className="nature-card-elevated max-w-md w-full text-center">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-red-500 mb-2">
                        Oops!
                    </h1>
                    <p className="nature-body text-lg">
                        We encountered an unexpected issue
                    </p>
                </div>
                <p className="nature-body mb-8">{displayMessage}</p>
                <NavLink to="/" className="nature-button">
                    Return Home
                </NavLink>
            </div>
        </div>
    )
}
