import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { tripLoader } from './trip.loader'
import type { Route } from '../routes/+types/trip'
import { hc } from 'hono/client'
import { getAuth } from '@clerk/react-router/ssr.server'

vi.mock('@clerk/react-router/ssr.server', () => ({
    getAuth: vi.fn(),
}))
const mockedGetAuth = vi.mocked(getAuth)

vi.mock('hono/client', () => ({
    hc: vi.fn(),
}))
const mockedHc = vi.mocked(hc)

const originalEnv = { ...process.env }
const serverUrl = 'http://test.server'
const tripId = 'trip-123'
const trip = { id: tripId, name: 'Test Trip' }
const loaderArgs = {
    params: { tripId },
} as Route.LoaderArgs

beforeEach(() => {
    process.env.SERVER_URL = serverUrl
})

afterEach(() => {
    process.env = originalEnv
})

it('should return the trip, a userId if there is an authed user, and an isSubscriber boolean to client', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-123',
        has: vi.fn().mockReturnValue(true),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as unknown as any)
    const getMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ trip }),
    })
    mockedHc.mockReturnValue({
        getTrip: {
            $get: getMock,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const {
        trip: resultTrip,
        userId,
        isSubscriber,
    } = await tripLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(getMock).toHaveBeenCalledWith({ query: { tripId } })
    expect(userId).toBe('user-123')
    expect(isSubscriber).toBe(true)
    expect(resultTrip).toEqual(trip)
})

it('should return subscriber as false when user does not have premium plan', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-456',
        has: vi.fn().mockReturnValue(false),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const getMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ trip }),
    })
    mockedHc.mockReturnValue({
        getTrip: {
            $get: getMock,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const {
        trip: resultTrip,
        userId,
        isSubscriber,
    } = await tripLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(getMock).toHaveBeenCalledWith({ query: { tripId } })
    expect(userId).toBe('user-456')
    expect(isSubscriber).toBe(false)
    expect(resultTrip).toEqual(trip)
})

it('should still return the trip, null for userId, and false for isSubscriber for an unauthenticated visitor', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: null,
        has: vi.fn().mockReturnValue(false),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const getMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ trip }),
    })
    mockedHc.mockReturnValue({
        getTrip: {
            $get: getMock,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const {
        trip: resultTrip,
        userId,
        isSubscriber,
    } = await tripLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(getMock).toHaveBeenCalledWith({ query: { tripId } })
    expect(userId).toBeNull()
    expect(isSubscriber).toBe(false)
    expect(resultTrip).toEqual(trip)
})

it('should throw an error if any error is encountered so that our top-level error boundary can capture it and process it', async () => {
    const testError = new Error('Test error message')

    mockedGetAuth.mockRejectedValue(testError)

    await expect(tripLoader(loaderArgs)).rejects.toThrow('Test error message')

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
})