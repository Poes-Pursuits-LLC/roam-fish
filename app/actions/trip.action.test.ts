import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { tripAction } from './trip.action'
import type { Route } from './+types/trip'
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

it('should call the updateTrip endpoint with the trip updateFields from the submitted form', async () => {
    const tripId = 'test-trip-id'
    const tripName = 'My Awesome Trip'
    const formData = new FormData()
    formData.append('tripName', tripName)

    const request = new Request(`http://localhost/trip/${tripId}`, {
        method: 'POST',
        body: formData,
    })

    const actionArgs = {
        request,
        params: { tripId },
    } as Route.ActionArgs

    // TODO: change to see how cicd works.
    const mockUpdateTripPost = vi.fn().mockResolvedValue({ ok: true })
    mockedHc.mockReturnValue({
        updateTrip: {
            $post: mockUpdateTripPost,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    await tripAction(actionArgs)

    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(mockUpdateTripPost).toHaveBeenCalledWith({
        json: {
            tripId,
            updateFields: {
                name: tripName,
            },
        },
    })
})
