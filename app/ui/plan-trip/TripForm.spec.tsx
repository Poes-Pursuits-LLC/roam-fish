import { act, render, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { TripForm } from './TripForm'
import type { Destination } from '~/core/destination/destination.model'
import type { ComponentProps, ReactNode } from 'react'

vi.mock('react-router', async () => {
    const { MemoryRouter
    } = await vi.importActual('react-router')
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

test('renders fetched destinations in the select input so users can select one to plan a trip to', async () => {
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
        {
            destinationId: '2',
            name: 'Idaho Falls',
            province: 'Idaho',
            country: 'USA',
            type: 'City',
            imageUrl: '/idaho-falls.jpg',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
        },
    ]

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/plan-trip']}>
                <TripForm
                    userId={null}
                    promise={Promise.resolve(destinations)}
                    noMoreTrips={false}
                    visitorAlreadyCreatedTrip={false}
                />
            </MemoryRouter>,
        )
    })

    await waitFor(() => {
        expect(document.querySelector('select')).toBeInTheDocument()
    })

    const selectElement = document.querySelector('select')
    expect(selectElement).toBeInTheDocument()
    expect(selectElement).toHaveTextContent('Yellowstone')
    expect(selectElement).toHaveTextContent('Idaho Falls')
})

test('renders a Subscribe button and CTA to subscribe if the user is out of free trips and is not a subscriber', async () => {
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

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/plan-trip']}>
                <TripForm
                    userId={'user123'}
                    promise={Promise.resolve(destinations)}
                    noMoreTrips={true}
                    visitorAlreadyCreatedTrip={false}

                />
            </MemoryRouter>,
        )
    })

    expect(screen.getByText('Subscribe')).toBeInTheDocument()
})
