/* eslint-disable @typescript-eslint/no-explicit-any */
import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { dashboardAction } from './dashboard-action'
import type { Route } from '../routes/+types/dashboard'
import { hc } from 'hono/client'

vi.mock('hono/client', () => ({
    hc: vi.fn(),
}))
const mockedHc = vi.mocked(hc)

const originalEnv = { ...process.env }
const serverUrl = 'http://test.server'

beforeEach(() => {
    process.env.SERVER_URL = serverUrl
})

afterEach(() => {
    process.env = originalEnv
})

it('should call the updateTrip endpoint with the provided userId so we can associate a locally stored trip with a newly created user', async () => {
    const tripId = 'tripId'
    const userId = 'userId'

    const formData = new FormData()
    formData.append('tripId', tripId)
    formData.append('userId', userId)

    const request = new Request(serverUrl, {
        method: 'POST',
        body: formData
    })

    const actionArgs = {
        request,
    } as Route.ActionArgs

    const mockUpdateTripPost = vi.fn().mockResolvedValue({ ok: true })
    mockedHc.mockReturnValue({
        updateTrip: {
            $post: mockUpdateTripPost,
        },
    } as unknown as any)

    await dashboardAction(actionArgs)

    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(mockUpdateTripPost).toHaveBeenCalledWith({
        json: {
            tripId,
            updateFields: {
                userId,
            }
        },
    })
})

it('should throw an error if any error is encountered so that our top-level error boundary can capture it and process it', async () => {
    const testError = new Error('Test error message')
    const formData = new FormData()
    const request = new Request(serverUrl, {
        method: 'POST',
        body: formData
    })
    const actionArgs = {
        request,
    } as Route.ActionArgs
    const mockUpdateTripPost = vi.fn().mockRejectedValue(testError)
    mockedHc.mockReturnValue({
        updateTrip: {
            $post: mockUpdateTripPost,
        },
    } as unknown as any)

    await expect(dashboardAction(actionArgs)).rejects.toThrow()
})