import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { tripsLoader } from './trips.loader'
import type { Route } from '../routes/+types/trips'
import { getAuth } from '@clerk/react-router/ssr.server'
import { redirect } from 'react-router'
import { hc } from 'hono/client'

vi.mock('@clerk/react-router/ssr.server', () => ({
    getAuth: vi.fn(),
}))
const mockedGetAuth = vi.mocked(getAuth)

vi.mock('react-router', () => ({
    redirect: vi.fn(),
}))
const mockedRedirect = vi.mocked(redirect)

vi.mock('hono/client', () => ({
    hc: vi.fn(),
}))
const mockedHc = vi.mocked(hc)

const originalEnv = { ...process.env }
const serverUrl = 'http://test.server'
const loaderArgs = {} as Route.LoaderArgs

beforeEach(() => {
    process.env.SERVER_URL = serverUrl
    vi.clearAllMocks()
})

afterEach(() => {
    process.env = originalEnv
})

it('should redirect to /login if user is not authenticated', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: null,
        has: vi.fn(),
    } as unknown as Awaited<ReturnType<typeof getAuth>>)
    const redirectMarker = { type: 'redirect' } as unknown as Response
    mockedRedirect.mockReturnValue(redirectMarker)

    const result = await tripsLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedRedirect).toHaveBeenCalledWith('/login')
    expect(result).toBe(redirectMarker)
})

it('should return trips, userId, and isSubscriber for a premium user', async () => {
    const userId = 'user-123'
    const trips = [{ id: 'trip-1', name: 'Premium Trip' }]
    const has = vi.fn().mockReturnValue(true)
    mockedGetAuth.mockResolvedValue({
        userId,
        has,
    } as unknown as Awaited<ReturnType<typeof getAuth>>)

    const getMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ trips }),
    })
    mockedHc.mockReturnValue({
        getUserTrips: {
            $get: getMock,
        },
    } as unknown as ReturnType<typeof hc>)

    const {
        getTripsPromise,
        userId: resultUserId,
        isSubscriber,
    } = await tripsLoader(loaderArgs).then(
        (res) => res as Exclude<typeof res, Response>,
    )
    const resolvedTrips = await getTripsPromise

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(has).toHaveBeenCalledWith({ plan: 'roam_premium' })
    expect(isSubscriber).toBe(true)
    expect(resultUserId).toBe(userId)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(getMock).toHaveBeenCalledWith({ query: { userId } })
    expect(resolvedTrips).toEqual(trips)
})

it('should return trips, userId, and isSubscriber as false for a non-premium user', async () => {
    const userId = 'user-456'
    const trips = [{ id: 'trip-2', name: 'Regular Trip' }]
    const has = vi.fn().mockReturnValue(false)
    mockedGetAuth.mockResolvedValue({
        userId,
        has,
    } as unknown as Awaited<ReturnType<typeof getAuth>>)

    const getMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ trips }),
    })
    mockedHc.mockReturnValue({
        getUserTrips: {
            $get: getMock,
        },
    } as unknown as ReturnType<typeof hc>)

    const {
        getTripsPromise,
        userId: resultUserId,
        isSubscriber,
    } = await tripsLoader(loaderArgs).then(
        (res) => res as Exclude<typeof res, Response>,
    )
    const resolvedTrips = await getTripsPromise

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(has).toHaveBeenCalledWith({ plan: 'roam_premium' })
    expect(isSubscriber).toBe(false)
    expect(resultUserId).toBe(userId)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(getMock).toHaveBeenCalledWith({ query: { userId } })
    expect(resolvedTrips).toEqual(trips)
})
