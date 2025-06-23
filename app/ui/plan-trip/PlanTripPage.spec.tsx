import { act, render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import type { Destination } from '~/core/destination/destination.model'
import type { ComponentProps, ReactNode } from 'react'
import { PlanTripPage } from './PlanTripPage'
import { getLocalTripId, setLocalTripId } from '~/utils'

vi.mock('react-router', async () => {
    const { MemoryRouter } = await vi.importActual('react-router')
    return {
        MemoryRouter,
        useSubmit: vi.fn(),
        Form: ({ children, ...props }: ComponentProps<'form'>) => (
            <form {...props}>{children}</form>
        ),
        NavLink: ({
            children,
            to,
            ...props
        }: {
            children: ReactNode
            to: string
            [key: string]: unknown
        }) => (
            <a href={to} {...props}>
                {children}
            </a>
        ),
    }
})

vi.mock('./TripLoader', () => ({
    TripLoader: ({ tripId }: { tripId: string }) => (
        <div data-testid="trip-loader">Trip Loader for trip: {tripId}</div>
    ),
}))

vi.mock('~/utils.ts', async () => {
    const actualUtils = await vi.importActual('~/utils.ts')

    return {
        ...actualUtils,
        getLocalTripId: vi.fn(),
        setLocalTripId: vi.fn(),
    }
})

test('renders TripLoader when tripId is returned from form submission', async () => {
    const destinations: Destination[] = [
        {
            destinationId: '1',
            name: 'Yellowstone',
            province: 'Wyoming',
            country: 'USA',
            type: 'National Park',
            imageUrl: '/yellowstone.jpg',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
        },
    ]

    const mockLoaderData = {
        userId: 'user123',
        getDestinationsPromise: Promise.resolve(destinations),
        freeTripCount: 0,
        isSubscriber: false,
    }

    const mockActionData = {
        tripId: 'trip-123',
    }

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/plan-trip']}>
                <PlanTripPage
                    loaderData={mockLoaderData}
                    actionData={mockActionData}
                />
            </MemoryRouter>,
        )
    })

    await waitFor(() => {
        expect(screen.getByTestId('trip-loader')).toBeInTheDocument()
    })

    expect(
        screen.getByText('Trip Loader for trip: trip-123'),
    ).toBeInTheDocument()
    expect(screen.queryByText('Trip Details')).not.toBeInTheDocument()
})

test('Attempts to check local storage to see if a visitor has already made a trip, and if so renders a distinct CTA', async () => {
    vi.mocked(getLocalTripId).mockReturnValue('localTripId')
    const destinations: Destination[] = [
        {
            destinationId: '1',
            name: 'Yellowstone',
            province: 'Wyoming',
            country: 'USA',
            type: 'National Park',
            imageUrl: '/yellowstone.jpg',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
        },
    ]

    const mockLoaderData = {
        userId: null,
        getDestinationsPromise: Promise.resolve(destinations),
        freeTripCount: 0,
        isSubscriber: false,
    }

    const mockActionData = {
        tripId: null,
    }

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/plan-trip']}>
                <PlanTripPage
                    loaderData={mockLoaderData}
                    actionData={mockActionData}
                />
            </MemoryRouter>,
        )
    })

    await waitFor(() => {
        expect(screen.getByText('Sign Up Free')).toBeInTheDocument()
        expect(screen.queryByText('Generate Trip Plan')).not.toBeInTheDocument()
    })
})

test('Attempts to set the created tripId in local storage so we can later track if a visitor has already created a trip', async () => {
    const tripId = 'tripId'
    vi.mocked(setLocalTripId).mockReturnValue()
    const destinations: Destination[] = [
        {
            destinationId: '1',
            name: 'Yellowstone',
            province: 'Wyoming',
            country: 'USA',
            type: 'National Park',
            imageUrl: '/yellowstone.jpg',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
        },
    ]

    const mockLoaderData = {
        userId: null,
        getDestinationsPromise: Promise.resolve(destinations),
        freeTripCount: 0,
        isSubscriber: false,
    }

    const mockActionData = {
        tripId,
    }

    render(
        <MemoryRouter initialEntries={['/plan-trip']}>
            <PlanTripPage
                loaderData={mockLoaderData}
                actionData={mockActionData}
            />
        </MemoryRouter>,
    )

    expect(setLocalTripId).toHaveBeenCalledWith(tripId)
})
