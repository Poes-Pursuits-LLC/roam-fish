import { render, screen } from '@testing-library/react'
import { isRouteErrorResponse, MemoryRouter } from 'react-router'
import { ErrorBoundaryDisplay } from '~/ui/ErrorBoundaryDisplay'
import { captureException } from '@sentry/react'

vi.mock('@sentry/react', () => ({
    init: vi.fn(),
    captureException: vi.fn(),
}))
const mockedCaptureException = vi.mocked(captureException)

vi.mock('react-router', async () => {
    const { MemoryRouter, NavLink } = await vi.importActual('react-router')

    return {
        MemoryRouter,
        NavLink,
        isRouteErrorResponse: vi.fn(),
    }
})
const mockedIsRouteErrorResponse = vi.mocked(isRouteErrorResponse)

test('renders a specific route error message when the user navigates to a non-existent route but does not capture it with Sentry', () => {
    const errorBoundaryProps = {
        error: Error('That route does not exist'),
        matches: [],
        params: { tripId: undefined },
    }
    mockedIsRouteErrorResponse.mockReturnValue(true)

    render(
        <MemoryRouter initialEntries={['/']}>
            <ErrorBoundaryDisplay {...errorBoundaryProps} />
        </MemoryRouter>,
    )

    expect(
        screen.getByText(
            "That page doesn't exist. Use the link below to return home.",
        ),
    ).toBeInTheDocument()
    expect(mockedCaptureException).not.toHaveBeenCalled()
})

test('renders a generic error message when the error is not a route error and captures it with Sentry in a production environment', () => {
    process.env.ENVIRONMENT = 'production'

    const errorBoundaryProps = {
        error: Error('Failed to fetch destinations'),
        matches: [],
        params: { tripId: undefined },
    }
    mockedIsRouteErrorResponse.mockReturnValue(false)

    render(
        <MemoryRouter initialEntries={['/']}>
            <ErrorBoundaryDisplay {...errorBoundaryProps} />
        </MemoryRouter>,
    )

    expect(
        screen.getByText(
            "Something went wrong while loading this page. Don't worry, our team has been notified.",
        ),
    ).toBeInTheDocument()
    expect(mockedCaptureException).toHaveBeenCalled()
})
