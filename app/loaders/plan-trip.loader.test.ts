import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { planTripLoader } from './plan-trip.loader'
import type { Route } from '../routes/+types/plan-trip'
import { getAuth } from '@clerk/react-router/ssr.server'
import { createClerkClient } from '@clerk/backend'
import { hc } from 'hono/client'

vi.mock('@clerk/react-router/ssr.server', () => ({
    getAuth: vi.fn(),
}))
const mockedGetAuth = vi.mocked(getAuth)

vi.mock('@clerk/backend', () => ({
    createClerkClient: vi.fn(),
}))
const mockedCreateClerkClient = vi.mocked(createClerkClient)

vi.mock('hono/client', () => ({
    hc: vi.fn(),
}))
const mockedHc = vi.mocked(hc)

const originalEnv = { ...process.env }
const serverUrl = 'http://test.server'
const clerkSecretKey = 'test-secret'
const destinations = [{ id: '1', name: 'Test Destination' }]
const loaderArgs = {} as Route.LoaderArgs

beforeEach(() => {
    process.env.SERVER_URL = serverUrl
    process.env.CLERK_SECRET_KEY = clerkSecretKey
    vi.clearAllMocks()
})

afterEach(() => {
    process.env = originalEnv
})

it('should return destinations, userId, and freeTripCount for an authenticated user', async () => {
    const userId = 'user-123'
    const freeTripCount = 5
    mockedGetAuth.mockResolvedValue({
        userId,
        has: vi.fn(),
    } as unknown as Awaited<ReturnType<typeof getAuth>>)

    const getUserMock = vi.fn().mockResolvedValue({
        privateMetadata: { freeTripCount },
    })
    mockedCreateClerkClient.mockReturnValue({
        users: { getUser: getUserMock },
    } as unknown as ReturnType<typeof createClerkClient>)

    mockedHc.mockReturnValue({
        destinations: {
            $get: vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue({ destinations }),
            }),
        },
    } as unknown as ReturnType<typeof hc>)

    const {
        getDestinationsPromise,
        userId: resultUserId,
        freeTripCount: resultFreeTripCount,
    } = await planTripLoader(loaderArgs)
    const resultDestinations = await getDestinationsPromise

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedCreateClerkClient).toHaveBeenCalledWith({
        secretKey: clerkSecretKey,
    })
    expect(getUserMock).toHaveBeenCalledWith(userId)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(resultUserId).toBe(userId)
    expect(resultFreeTripCount).toBe(freeTripCount)
    expect(resultDestinations).toEqual(destinations)
})

it('should return destinations, null userId, and undefined freeTripCount for an unauthenticated user', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: null,
        has: vi.fn(),
    } as unknown as Awaited<ReturnType<typeof getAuth>>)
    mockedHc.mockReturnValue({
        destinations: {
            $get: vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue({ destinations }),
            }),
        },
    } as unknown as ReturnType<typeof hc>)

    const {
        getDestinationsPromise,
        userId: resultUserId,
        freeTripCount: resultFreeTripCount,
    } = await planTripLoader(loaderArgs)
    const resultDestinations = await getDestinationsPromise

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedCreateClerkClient).not.toHaveBeenCalled()
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(resultUserId).toBeNull()
    expect(resultFreeTripCount).toBeUndefined()
    expect(resultDestinations).toEqual(destinations)
})

it('should return undefined freeTripCount if user has no freeTripCount in privateMetadata', async () => {
    const userId = 'user-123'
    mockedGetAuth.mockResolvedValue({
        userId,
        has: vi.fn(),
    } as unknown as Awaited<ReturnType<typeof getAuth>>)

    const getUserMock = vi.fn().mockResolvedValue({
        privateMetadata: {},
    })
    mockedCreateClerkClient.mockReturnValue({
        users: { getUser: getUserMock },
    } as unknown as ReturnType<typeof createClerkClient>)

    mockedHc.mockReturnValue({
        destinations: {
            $get: vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue({ destinations }),
            }),
        },
    } as unknown as ReturnType<typeof hc>)

    const {
        getDestinationsPromise,
        userId: resultUserId,
        freeTripCount: resultFreeTripCount,
    } = await planTripLoader(loaderArgs)
    const resultDestinations = await getDestinationsPromise

    expect(resultUserId).toBe(userId)
    expect(resultFreeTripCount).toBeUndefined()
    expect(resultDestinations).toEqual(destinations)
})
