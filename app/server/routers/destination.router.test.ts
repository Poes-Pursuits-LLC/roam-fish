import { beforeEach, describe, expect, it, vi } from 'vitest'
import { destinationService } from '~/core/destination/destination.service'
import { main } from '../main'
import type { Destination } from '~/core/destination/destination.model'

vi.mock('~/core/destination/destination.service.ts', () => ({
    destinationService: {
        getDestinations: vi.fn(),
    },
}))

beforeEach(() => {
    vi.resetAllMocks()
})

describe('/getDestinations', () => {
    it('should successfully retrieve all destinations as requested', async () => {
        const destinations = [
            { destinationId: 'destinationId' },
        ] as unknown as Destination[]
        const mockedGetDestinations = vi
            .spyOn(destinationService, 'getDestinations')
            .mockResolvedValue(destinations)

        const res = await main.request('/destinations', {
            method: 'GET',
        })

        expect(mockedGetDestinations).toHaveBeenCalledOnce()
        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({
            destinations,
        })
    })
})
