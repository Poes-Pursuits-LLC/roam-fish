import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Tactics } from './Tactics'

describe('Tactics', () => {
    const mockProps = {
        fishingSummary: 'Test fishing summary',
        weather: 'Sunny with light winds',
        flies: ['Adams', 'Elk Hair Caddis'],
        hatches: ['Mayfly', 'Caddisfly'],
    }

    it('should render sign up CTA when no userId is provided', () => {
        render(
            <MemoryRouter>
                <Tactics {...mockProps} userId={null} isSubscriber={false} />
            </MemoryRouter>
        )

        expect(screen.getByText('Access Expert Advice')).toBeInTheDocument()
        expect(screen.getByText('Sign Up Free')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Sign Up Free' })).toHaveAttribute('href', '/login')
    })

    it('should render premium CTA when user is not a subscriber', () => {
        render(
            <MemoryRouter>
                <Tactics {...mockProps} userId="user-123" isSubscriber={false} />
            </MemoryRouter>
        )

        expect(screen.getByText('Premium Feature')).toBeInTheDocument()
        expect(screen.getByText('Upgrade to Premium')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Upgrade to Premium' })).toHaveAttribute('href', '/billing')
    })

    it('should render fishing summary when user is a subscriber', () => {
        render(
            <MemoryRouter>
                <Tactics {...mockProps} userId="user-123" isSubscriber={true} />
            </MemoryRouter>
        )

        expect(screen.getByText('Expert Advice')).toBeInTheDocument()
        expect(screen.getByText('Test fishing summary')).toBeInTheDocument()
    })
}) 