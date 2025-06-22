/* eslint-disable @typescript-eslint/no-explicit-any */
import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { tripAction } from './trip.action'
import type { Route } from '../routes/+types/trip'
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

it('should call the updateTrip endpoint with all form fields when all are provided', async () => {
    const tripId = 'test-trip-id'
    const tripName = 'My Awesome Trip'
    const budgetList = [{ item: 'Hotel', amount: 100 }]
    const checkList = [{ item: 'Passport', done: false }]
    const notes = 'Important trip notes'

    const formData = new FormData()
    formData.append('tripName', tripName)
    formData.append('budgetList', JSON.stringify(budgetList))
    formData.append('checkList', JSON.stringify(checkList))
    formData.append('notes', notes)

    const request = new Request(`${serverUrl}/trip/${tripId}`, {
        method: 'POST',
        body: formData,
    })

    const actionArgs = {
        request,
        params: { tripId },
    } as Route.ActionArgs

    const mockUpdateTripPost = vi.fn().mockResolvedValue({ ok: true })
    mockedHc.mockReturnValue({
        updateTrip: {
            $post: mockUpdateTripPost,
        },
    } as unknown as any)

    await tripAction(actionArgs)

    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(mockUpdateTripPost).toHaveBeenCalledWith({
        json: {
            tripId,
            updateFields: {
                name: tripName,
                budgetList,
                checkList,
                notes,
            },
        },
    })
})

it('should call the updateTrip endpoint with only provided fields', async () => {
    const tripId = 'test-trip-id'
    const checkList = [{ item: 'Passport', done: false }]
    const notes = 'Important trip notes'

    const formData = new FormData()
    formData.append('checkList', JSON.stringify(checkList))
    formData.append('notes', notes)

    const request = new Request(`http://localhost/trip/${tripId}`, {
        method: 'POST',
        body: formData,
    })

    const actionArgs = {
        request,
        params: { tripId },
    } as Route.ActionArgs

    const mockUpdateTripPost = vi.fn().mockResolvedValue({ ok: true })
    mockedHc.mockReturnValue({
        updateTrip: {
            $post: mockUpdateTripPost,
        },
    } as any)

    await tripAction(actionArgs)

    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(mockUpdateTripPost).toHaveBeenCalledWith({
        json: {
            tripId,
            updateFields: {
                checkList,
                notes,
            },
        },
    })
})

it('should throw an error if any error is encountered so that our top-level error boundary can capture it and process it', async () => {
    const testError = new Error('Test error message')
    const tripId = 'test-trip-id'
    const checkList = [{ item: 'Passport', done: false }]
    const notes = 'Important trip notes'

    const formData = new FormData()
    formData.append('checkList', JSON.stringify(checkList))
    formData.append('notes', notes)

    const request = new Request(`http://localhost/trip/${tripId}`, {
        method: 'POST',
        body: formData,
    })

    const actionArgs = {
        request,
        params: { tripId },
    } as Route.ActionArgs

    const mockUpdateTripPost = vi.fn().mockRejectedValue(testError)
    mockedHc.mockReturnValue({
        updateTrip: {
            $post: mockUpdateTripPost,
        },
    } as any)

    await expect(tripAction(actionArgs)).rejects.toThrow()
})