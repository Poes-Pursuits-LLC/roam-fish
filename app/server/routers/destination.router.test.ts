import { describe, expect, it, vi } from 'vitest'
import { destinationService } from '~/core/destination/destination.service'
import type { Destination } from '~/core/destination/destination.model'
import { destinationRouter } from './destination.router'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'

vi.mock('~/core/destination/destination.service.ts', () => ({
    destinationService: {
        getDestinations: vi.fn(),
    },
}))

vi.mock('../main', () => ({
    main: new Hono().route('/', destinationRouter),
}))
import { main } from '../main'

describe('/getDestinations', () => {
    it('should successfully retrieve all destinations as requested', async () => {
        const client = testClient(main)
        const destinations = [
            { destinationId: 'destinationId' },
        ] as Destination[]
        const getDestinations = vi
            .mocked(destinationService.getDestinations)
            .mockResolvedValue(destinations)

        const response = await client.destinations.$get()

        expect(getDestinations).toHaveBeenCalledOnce()
        expect(await response.json()).toEqual({
            destinations,
        })
    })
})
