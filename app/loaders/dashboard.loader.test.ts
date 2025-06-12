import { it, expect, vi } from 'vitest'
import { dashboardLoader } from './dashboard.loader'
import type { Route } from '../routes/+types/dashboard'
import { getAuth } from '@clerk/react-router/ssr.server'
import { redirect } from 'react-router'

vi.mock('@clerk/react-router/ssr.server', () => ({
    getAuth: vi.fn(),
}))
const mockedGetAuth = vi.mocked(getAuth)

vi.mock('react-router', () => ({
    redirect: vi.fn(),
}))
const mockedRedirect = vi.mocked(redirect)

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

it('should return userId and isSubscriber for an authenticated premium user', async () => {
    const has = vi.fn().mockReturnValue(true)
    mockedGetAuth.mockResolvedValue({
        userId: 'user-123',
        has,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const result = await dashboardLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(has).toHaveBeenCalledWith({ plan: 'roam_premium' })
    expect(result).toEqual({ userId: 'user-123', isSubscriber: true })
})

it('should return userId and isSubscriber as false for an authenticated non-premium user', async () => {
    const has = vi.fn().mockReturnValue(false)
    mockedGetAuth.mockResolvedValue({
        userId: 'user-456',
        has,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const result = await dashboardLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(has).toHaveBeenCalledWith({ plan: 'roam_premium' })
    expect(result).toEqual({ userId: 'user-456', isSubscriber: false })
})
