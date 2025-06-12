import { it, expect, vi } from 'vitest'
import { billingLoader } from './billing.loader'
import type { Route } from '../routes/+types/billing'
import { getAuth } from '@clerk/react-router/ssr.server'

vi.mock('@clerk/react-router/ssr.server', () => ({
    getAuth: vi.fn(),
}))
const mockedGetAuth = vi.mocked(getAuth)

const loaderArgs = {} as Route.LoaderArgs

it('should return userId and isSubscriber for a subscribing user', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-123',
        has: vi.fn().mockReturnValue(true),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { userId, isSubscriber } = await billingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(userId).toBe('user-123')
    expect(isSubscriber).toBe(true)
})

it('should return isSubscriber as false for a non-subscribing user', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-456',
        has: vi.fn().mockReturnValue(false),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { userId, isSubscriber } = await billingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(userId).toBe('user-456')
    expect(isSubscriber).toBe(false)
})

it('should return null userId and false isSubscriber for unauthenticated visitor', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: null,
        has: vi.fn().mockReturnValue(false),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { userId, isSubscriber } = await billingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(userId).toBeNull()
    expect(isSubscriber).toBe(false)
})
