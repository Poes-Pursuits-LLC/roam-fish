import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { landingLoader } from './landing.loader'
import type { Route } from '../routes/+types/landing'
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
const destinations = [{ id: '1', name: 'Test Destination' }]
const loaderArgs = {} as Route.LoaderArgs

beforeEach(() => {
    process.env.SERVER_URL = serverUrl
})

afterEach(() => {
    process.env = originalEnv
})

it('should return the destinations promise, a userId if there is an authed user, and an isSubscriber boolean to client', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-123',
        has: vi.fn().mockReturnValue(true),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    mockedHc.mockReturnValue({
        destinations: {
            $get: vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue({ destinations }),
            }),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { getDestinationsPromise, userId, isSubscriber } =
        await landingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(userId).toBe('user-123')
    expect(isSubscriber).toBe(true)
    expect(await getDestinationsPromise).toEqual(destinations)
})

it('should return subscriber as false when user does not have premium plan', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-456',
        has: vi.fn().mockReturnValue(false),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    mockedHc.mockReturnValue({
        destinations: {
            $get: vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue({ destinations }),
            }),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { getDestinationsPromise, userId, isSubscriber } =
        await landingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(userId).toBe('user-456')
    expect(isSubscriber).toBe(false)
    expect(await getDestinationsPromise).toEqual(destinations)
})

it('should still return the destinations promise, null for userId, and false for isSubscriber for an unauthenticated visitor', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: null,
        has: vi.fn().mockReturnValue(false),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    mockedHc.mockReturnValue({
        destinations: {
            $get: vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue({ destinations }),
            }),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { getDestinationsPromise, userId, isSubscriber } =
        await landingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(userId).toBeNull()
    expect(isSubscriber).toBe(false)
    expect(await getDestinationsPromise).toEqual(destinations)
})

it('should throw an error if any error is encountered so that our top-level error boundary can capture it and process it', async () => {
    const testError = new Error('Test error message')

    mockedGetAuth.mockRejectedValue(testError)

    await expect(landingLoader(loaderArgs)).rejects.toThrow('Test error message')

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
})