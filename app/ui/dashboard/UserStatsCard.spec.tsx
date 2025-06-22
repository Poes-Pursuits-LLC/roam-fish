import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { UserStatsCards } from './UserStatsCards'

test('renders an Unlimited amount of free trips if the user is a subscriber', () => {
    render(
        <MemoryRouter initialEntries={['/dashboard']}>
            <UserStatsCards
                config={{
                    freeTripCount: 3,
                    isSubscriber: true,
                    totalDaysFishing: 17,
                    uniqueDestinations: ['Yellowstone'],
                    totalTripCost: 4200,
                    tripCount: 5,
                }}
            />
        </MemoryRouter>,
    )

    expect(screen.getByText('Unlimited')).toBeInTheDocument()
})

test('renders an averaged trip cost based on the total trip cost and amount of trip stats', () => {
    render(
        <MemoryRouter initialEntries={['/dashboard']}>
            <UserStatsCards
                config={{
                    freeTripCount: 3,
                    isSubscriber: true,
                    totalDaysFishing: 17,
                    uniqueDestinations: ['Yellowstone'],
                    totalTripCost: 5000,
                    tripCount: 5,
                }}
            />
        </MemoryRouter>,
    )

    expect(screen.getByText('$1000')).toBeInTheDocument()
})
