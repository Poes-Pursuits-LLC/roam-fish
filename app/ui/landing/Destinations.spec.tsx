import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Destinations } from './Destinations'
import type { Destination } from '~/core/destination/destination.model'

test('lets a user search by destination name and display results accordingly', async () => {
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
            <MemoryRouter initialEntries={['/']}>
                <Destinations promise={Promise.resolve(destinations)} />
            </MemoryRouter>,
        )
    })

    await waitFor(() => {
        expect(screen.getByText('Yellowstone')).toBeInTheDocument()
    })
    const searchInput = screen.getByPlaceholderText('Search by location...')
    fireEvent.change(searchInput, { target: { value: 'Yellowstone' } })

    await waitFor(() => {
        expect(screen.getByText('Yellowstone')).toBeInTheDocument()
        expect(screen.queryByText('Idaho Falls')).not.toBeInTheDocument()
    })
})

test('lets a user search by destination state (province) and display results accordingly', async () => {
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
            <MemoryRouter initialEntries={['/']}>
                <Destinations promise={Promise.resolve(destinations)} />
            </MemoryRouter>,
        )
    })

    await waitFor(() => {
        expect(screen.getByText('Yellowstone')).toBeInTheDocument()
    })
    const searchInput = screen.getByPlaceholderText('Search by location...')
    fireEvent.change(searchInput, { target: { value: 'Wyoming' } })
    await waitFor(() => {
        expect(screen.getByText('Yellowstone')).toBeInTheDocument()
        expect(screen.queryByText('Idaho Falls')).not.toBeInTheDocument()
    })
})

test('lets a user search by destination country and display results accordingly', async () => {
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
            name: 'Banff',
            province: 'Alberta',
            country: 'Canada',
            type: 'National Park',
            imageUrl: '/banff.jpg',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
        },
    ]

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Destinations promise={Promise.resolve(destinations)} />
            </MemoryRouter>,
        )
    })

    await waitFor(() => {
        expect(screen.getByText('Yellowstone')).toBeInTheDocument()
    })
    const searchInput = screen.getByPlaceholderText('Search by location...')
    fireEvent.change(searchInput, { target: { value: 'Canada' } })
    await waitFor(() => {
        expect(screen.getByText('Banff')).toBeInTheDocument()
        expect(screen.queryByText('Yellowstone')).not.toBeInTheDocument()
    })
})

test('shows all destinations when search is cleared', async () => {
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
            <MemoryRouter initialEntries={['/']}>
                <Destinations promise={Promise.resolve(destinations)} />
            </MemoryRouter>,
        )
    })

    await waitFor(() => {
        expect(screen.getByText('Yellowstone')).toBeInTheDocument()
    })
    const searchInput = screen.getByPlaceholderText('Search by location...')
    fireEvent.change(searchInput, { target: { value: 'Yellowstone' } })
    await waitFor(() => {
        expect(screen.getByText('Yellowstone')).toBeInTheDocument()
        expect(screen.queryByText('Idaho Falls')).not.toBeInTheDocument()
    })
    fireEvent.change(searchInput, { target: { value: '' } })
    await waitFor(() => {
        expect(screen.getByText('Yellowstone')).toBeInTheDocument()
        expect(screen.getByText('Idaho Falls')).toBeInTheDocument()
    })
})
