import { it, expect, vi } from 'vitest'
import { dashboardLoader } from './dashboard.loader'
import type { Route } from '../routes/+types/dashboard'
import { getAuth } from '@clerk/react-router/ssr.server'
import { redirect } from 'react-router'
import { createClerkClient } from '@clerk/backend'
import { hc } from 'hono/client'

// Mock types for testing
type MockAnalyticsResponse = {
    json: () => Promise<{
        userAnalyticsSheet: { trips: number; destinations: number }
    }>
}

type MockClient = {
    analytics: {
        $get: (args: {
            query: { userId: string }
        }) => Promise<MockAnalyticsResponse>
    }
}

vi.mock('@clerk/react-router/ssr.server', () => ({
    getAuth: vi.fn(),
}))
const mockedGetAuth = vi.mocked(getAuth)

vi.mock('react-router', () => ({
    redirect: vi.fn(),
}))
const mockedRedirect = vi.mocked(redirect)

vi.mock('@clerk/backend', () => ({
    createClerkClient: vi.fn(),
}))
const mockedCreateClerkClient = vi.mocked(createClerkClient)

vi.mock('hono/client', () => ({
    hc: vi.fn(),
}))
const mockedHc = vi.mocked(hc)

const loaderArgs = {} as Route.LoaderArgs

it('should redirect to /login if user is not authenticated', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: null,
        has: vi.fn(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    const redirectMarker = { type: 'redirect' } as unknown as Response
    mockedRedirect.mockReturnValue(redirectMarker)

    const result = await dashboardLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedRedirect).toHaveBeenCalledWith('/login')
    expect(result).toBe(redirectMarker)
})

it('should return user data including analytics for an authenticated premium user', async () => {
    const has = vi.fn().mockReturnValue(true)
    const mockClerkClient = {
        users: {
            getUser: vi.fn().mockResolvedValue({
                privateMetadata: { freeTripCount: 3 },
            }),
        },
    }
    const mockAnalyticsResponse: MockAnalyticsResponse = {
        json: vi.fn().mockResolvedValue({
            userAnalyticsSheet: { trips: 5, destinations: 3 },
        }),
    }
    const mockClient: MockClient = {
        analytics: {
            $get: vi.fn().mockResolvedValue(mockAnalyticsResponse),
        },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedCreateClerkClient.mockReturnValue(mockClerkClient as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedHc.mockReturnValue(mockClient as any)
    mockedGetAuth.mockResolvedValue({
        userId: 'user-123',
        has,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const result = await dashboardLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(has).toHaveBeenCalledWith({ plan: 'roam_premium' })
    expect(mockedCreateClerkClient).toHaveBeenCalledWith({
        secretKey: process.env.CLERK_SECRET_KEY,
    })
    expect(mockClerkClient.users.getUser).toHaveBeenCalledWith('user-123')
    expect(mockedHc).toHaveBeenCalledWith(process.env.SERVER_URL)
    expect(mockClient.analytics.$get).toHaveBeenCalledWith({
        query: { userId: 'user-123' },
    })
    expect(result).toEqual({
        userId: 'user-123',
        isSubscriber: true,
        freeTripCount: 3,
        userAnalyticsSheet: { trips: 5, destinations: 3 },
    })
})

it('should return user data including analytics for an authenticated non-premium user', async () => {
    const has = vi.fn().mockReturnValue(false)
    const mockClerkClient = {
        users: {
            getUser: vi.fn().mockResolvedValue({
                privateMetadata: { freeTripCount: 1 },
            }),
        },
    }
    const mockAnalyticsResponse: MockAnalyticsResponse = {
        json: vi.fn().mockResolvedValue({
            userAnalyticsSheet: { trips: 2, destinations: 1 },
        }),
    }
    const mockClient: MockClient = {
        analytics: {
            $get: vi.fn().mockResolvedValue(mockAnalyticsResponse),
        },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedCreateClerkClient.mockReturnValue(mockClerkClient as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedHc.mockReturnValue(mockClient as any)
    mockedGetAuth.mockResolvedValue({
        userId: 'user-456',
        has,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const result = await dashboardLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(has).toHaveBeenCalledWith({ plan: 'roam_premium' })
    expect(mockedCreateClerkClient).toHaveBeenCalledWith({
        secretKey: process.env.CLERK_SECRET_KEY,
    })
    expect(mockClerkClient.users.getUser).toHaveBeenCalledWith('user-456')
    expect(mockedHc).toHaveBeenCalledWith(process.env.SERVER_URL)
    expect(mockClient.analytics.$get).toHaveBeenCalledWith({
        query: { userId: 'user-456' },
    })
    expect(result).toEqual({
        userId: 'user-456',
        isSubscriber: false,
        freeTripCount: 1,
        userAnalyticsSheet: { trips: 2, destinations: 1 },
    })
})

it('should handle missing freeTripCount in privateMetadata', async () => {
    const has = vi.fn().mockReturnValue(false)
    const mockClerkClient = {
        users: {
            getUser: vi.fn().mockResolvedValue({
                privateMetadata: {},
            }),
        },
    }
    const mockAnalyticsResponse: MockAnalyticsResponse = {
        json: vi.fn().mockResolvedValue({
            userAnalyticsSheet: { trips: 0, destinations: 0 },
        }),
    }
    const mockClient: MockClient = {
        analytics: {
            $get: vi.fn().mockResolvedValue(mockAnalyticsResponse),
        },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedCreateClerkClient.mockReturnValue(mockClerkClient as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedHc.mockReturnValue(mockClient as any)
    mockedGetAuth.mockResolvedValue({
        userId: 'user-789',
        has,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const result = await dashboardLoader(loaderArgs)

    expect(result).toEqual({
        userId: 'user-789',
        isSubscriber: false,
        freeTripCount: 0,
        userAnalyticsSheet: { trips: 0, destinations: 0 },
    })
})
