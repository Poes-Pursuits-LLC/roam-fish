import { act, render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Trips } from './Trips'
import {
    TripDurationEnum,
    TripStatusEnum,
    type Trip,
} from '~/core/trip/trip.model'

test('renders upcoming trips and past trips in distinct tabs', async () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 30)

    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 30)

    const trips: Trip[] = [
        {
            tripId: '1',
            destinationName: 'Test Destination',
            headcount: '1',
            packingList: [],
            budgetList: [],
            checkList: [],
            status: TripStatusEnum.Planned,
            contentId: '1',
            startDate: futureDate.toISOString(),
            type: 'test',
            duration: TripDurationEnum.Week,
            name: 'Test Trip',
            userId: '1',
            createdAt: futureDate.toISOString(),
            updatedAt: futureDate.toISOString(),
        },
        {
            tripId: '2',
            destinationName: 'Test Destination 2',
            headcount: '2',
            packingList: [],
            budgetList: [],
            checkList: [],
            status: TripStatusEnum.Planned,
            contentId: '2',
            startDate: pastDate.toISOString(),
            type: 'test',
            duration: TripDurationEnum.Week,
            name: 'Test Trip 2',
            userId: '2',
            createdAt: pastDate.toISOString(),
            updatedAt: pastDate.toISOString(),
        },
    ]

    await act(async () =>
        render(
            <MemoryRouter initialEntries={['/trips']}>
                <Trips promise={Promise.resolve(trips)} />
            </MemoryRouter>,
        ),
    )

    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(screen.getByText('Test Destination')).toBeInTheDocument()
    expect(screen.queryByText('Test Destination 2')).not.toBeInTheDocument()

    const upcomingTab = screen.getByText('Upcoming')
    const pastTripsTab = screen.getByText('Past Trips')
    fireEvent.click(pastTripsTab)

    expect(screen.getByText('Test Destination 2')).toBeInTheDocument()
    expect(screen.queryByText('Test Destination')).not.toBeInTheDocument()

    expect(pastTripsTab).toHaveClass('bg-emerald-600')
    expect(upcomingTab).not.toHaveClass('bg-amber-400')

    fireEvent.click(upcomingTab)

    expect(screen.getByText('Test Destination')).toBeInTheDocument()
    expect(screen.queryByText('Test Destination 2')).not.toBeInTheDocument()

    expect(upcomingTab).toHaveClass('bg-amber-400')
    expect(pastTripsTab).not.toHaveClass('bg-emerald-600')
})
