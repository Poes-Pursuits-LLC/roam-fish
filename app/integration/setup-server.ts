import { serve, type ServerType } from '@hono/node-server'
import { Hono } from 'hono'
import { vi } from 'vitest'
import { destinationRouter } from '~/server/routers/destination.router'
import { tripRouter } from '~/server/routers/trip.router'
import type { AppType } from '~/server/main'

type MockConfig = {
    tripService?: {
        submitTripDetails?: () => Promise<string>
    }
}
let server: ServerType | undefined

export const setupServer = async (mockConfig?: MockConfig) => {
    const app = new Hono()

    if (mockConfig?.tripService) {
        vi.mock('~/core/trip/trip.service', async () => {
            const actual = (await vi.importActual(
                '~/core/trip/trip.service',
            )) as {
                tripService: typeof import('~/core/trip/trip.service').tripService
            }
            return {
                tripService: {
                    ...actual.tripService,
                    ...mockConfig.tripService,
                },
            }
        })
    }

    app.route('/', destinationRouter)
    app.route('/', tripRouter)

    server = serve({
        fetch: app.fetch,
        port: 3000,
    })

    return {
        server,
        app: app as AppType,
    }
}

export const teardownServer = async () => {
    server?.close()
}
