import { act, render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { Destination } from '~/core/destination/destination.model'
import type { ComponentProps, ReactNode } from 'react'
import { PlanTripPage } from './PlanTripPage'

vi.mock('react-router', () => {
    return {
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

test('renders TripLoader when tripId is provided from form submission', async () => {
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
