/* eslint-disable @typescript-eslint/no-explicit-any */

import { it, expect, vi } from 'vitest'
import { billingLoader } from './billing.loader'
import type { Route } from '../routes/+types/billing'
import { getAuth } from '@clerk/react-router/ssr.server'
import { createClerkClient } from '@clerk/backend'
import { redirect } from 'react-router'

vi.mock('@clerk/react-router/ssr.server', () => ({
    getAuth: vi.fn(),
}))
const mockedGetAuth = vi.mocked(getAuth)

vi.mock('@clerk/backend', () => ({
    createClerkClient: vi.fn(),
}))
const mockedCreateClerkClient = vi.mocked(createClerkClient)

vi.mock('react-router', () => ({
    redirect: vi.fn(),
}))
const mockedRedirect = vi.mocked(redirect)

it('should redirect to /login if user is not authenticated', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: null,
        has: vi.fn(),
    } as any)
    const redirectMarker = { type: 'redirect' } as unknown as Response
    mockedRedirect.mockReturnValue(redirectMarker)

    const loaderArgs = {} as Route.LoaderArgs

    const result = await billingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedRedirect).toHaveBeenCalledWith('/login')
    expect(result).toBe(redirectMarker)
})

it('should return userId and isSubscriber for a subscribing user', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-123',
        has: vi.fn().mockReturnValue(true),

    } as any)
    const loaderArgs = {
        request: {
            url: 'http://www.testurl.com'
        }
    } as Route.LoaderArgs

    const result = await billingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(result).toEqual({
        userId: 'user-123',
        isSubscriber: true,
    })
})

it('should return isSubscriber as false for a non-subscribing user', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-456',
        has: vi.fn().mockReturnValue(false),
    } as any)
    const loaderArgs = {
        request: {
            url: 'http://www.testurl.com'
        }
    } as Route.LoaderArgs

    const result = await billingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(result).toEqual({
        userId: 'user-456',
        isSubscriber: false,
    })
})

it('should reset a user\'s free trip count to 3 if they are switching back to the free plan from a paid plan', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-456',
        has: vi.fn().mockReturnValue(false),
    } as any)
    const updateUserMetadataMock = vi.fn().mockResolvedValue({})
    mockedCreateClerkClient.mockReturnValue({
        users: {
            updateUserMetadata: updateUserMetadataMock,
        },
    } as unknown as ReturnType<typeof createClerkClient>)
    const loaderArgs = {
        request: {
            url: 'http://www.testurl.com?update=true'
        }
    } as Route.LoaderArgs
    process.env.CLERK_SECRET_KEY = 'test-secret-key'

    const result = await billingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(mockedCreateClerkClient).toHaveBeenCalledWith({
        secretKey: 'test-secret-key'
    })
    expect(updateUserMetadataMock).toHaveBeenCalledWith('user-456', {
        privateMetadata: {
            freeTripCount: 3
        }
    })
    expect(result).toEqual({
        userId: 'user-456',
        isSubscriber: false,
    })
})

it('should not reset a user\'s free trip count to 3 if they are switching to a paid plan, as we will do this if they ever decide to switch back to a free plan', async () => {
    mockedGetAuth.mockResolvedValue({
        userId: 'user-456',
        has: vi.fn().mockReturnValue(true),
    } as any)
    const updateUserMetadataMock = vi.fn().mockResolvedValue({})
    mockedCreateClerkClient.mockReturnValue({
        users: {
            updateUserMetadata: updateUserMetadataMock,
        },
    } as unknown as ReturnType<typeof createClerkClient>)
    const loaderArgs = {
        request: {
            url: 'http://www.testurl.com?update'
        }
    } as Route.LoaderArgs

    const result = await billingLoader(loaderArgs)

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
    expect(updateUserMetadataMock).not.toHaveBeenCalled()
    expect(result).toEqual({
        userId: 'user-456',
        isSubscriber: true,
    })
})

it('should throw an error if any error is encountered so that our top-level error boundary can capture it and process it', async () => {
    const testError = new Error('Test error message')
    const loaderArgs = {
        request: {
            url: 'http://www.testurl.com'
        }
    } as Route.LoaderArgs

    mockedGetAuth.mockRejectedValue(testError)

    await expect(billingLoader(loaderArgs)).rejects.toThrow('Test error message')

    expect(mockedGetAuth).toHaveBeenCalledWith(loaderArgs)
})