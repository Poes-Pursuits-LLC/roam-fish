import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { LicensingRegulations } from './LicensingRegulations'

describe('LicensingRegulations', () => {
    it('should render sign up CTA when no userId is provided', () => {
        render(
            <MemoryRouter>
                <LicensingRegulations userId={null} isSubscriber={false} />
            </MemoryRouter>
        )

        expect(screen.getByText('Licensing & Regulations')).toBeInTheDocument()
        expect(screen.getByText('Access Licensing & Regulations')).toBeInTheDocument()
        expect(screen.getByText('Sign Up Free')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Sign Up Free' })).toHaveAttribute('href', '/login')
    })

    it('should render premium CTA when user is not a subscriber', () => {
        render(
            <MemoryRouter>
                <LicensingRegulations userId="user-123" isSubscriber={false} />
            </MemoryRouter>
        )

        expect(screen.getByText('Licensing & Regulations')).toBeInTheDocument()
        expect(screen.getByText('Premium Feature')).toBeInTheDocument()
        expect(screen.getByText('Upgrade to Premium')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Upgrade to Premium' })).toHaveAttribute('href', '/billing')
    })

    it('should render coming soon when user is a subscriber', () => {
        render(
            <MemoryRouter>
                <LicensingRegulations userId="user-123" isSubscriber={true} />
            </MemoryRouter>
        )

        expect(screen.getByText('Licensing & Regulations')).toBeInTheDocument()
        expect(screen.getByText('Coming Soon')).toBeInTheDocument()
        expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
}) 