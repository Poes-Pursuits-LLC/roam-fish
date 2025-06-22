import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Navbar } from './Navbar'

vi.mock('@clerk/react-router', () => ({
    UserButton: ({ fallback }: { fallback: React.ReactNode }) => (
        <div data-testid="user-button">{fallback}</div>
    ),
}))

test('renders a Login button if no user is logged in that lets the user navigate to the Login page', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Navbar userId={null} isSubscriber={false} />
        </MemoryRouter>,
    )

    const loginLink = screen.getByText('Login')

    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
})

test('renders a Dashboard button for a logged in user that lets them navigate to the Dashboard page', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Navbar userId={'user123'} isSubscriber={false} />
        </MemoryRouter>,
    )

    const dashboardLink = screen.getByText('Dashboard')

    expect(dashboardLink).toBeInTheDocument()
    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
})

test('renders a userButton a logged in user', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Navbar userId={'user123'} isSubscriber={true} />
        </MemoryRouter>,
    )

    expect(screen.queryByTestId('user-button')).toBeInTheDocument()
})

test('renders a Susbcribe CTA banner with a link to the billing page for a user who is not a subscriber', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Navbar userId={'user123'} isSubscriber={false} />
        </MemoryRouter>,
    )

    const upgradeLink = screen.getByText('Upgrade Now')

    expect(upgradeLink).toBeInTheDocument()
    expect(upgradeLink).toHaveAttribute('href', '/billing')
})
