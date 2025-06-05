import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { handleAsync } from '~/utils'
import { tripService } from '~/core/trip/trip.service'

const tripRouter = new Hono().post(
    '/create-trip',
    zValidator(
        'json',
        z.object({
            destinationName: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            userId: z.string().optional(),
        }),
    ),
    async (c) => {
        const inputs = c.req.valid('json')

        const [trip, createTripError] = await handleAsync(
            tripService.createTrip({
                startDate: inputs.startDate,
                endDate: inputs.endDate,
                ...(inputs.userId && { userId: inputs.userId }),
            }),
        )
        if (createTripError) {
            console.error(createTripError)
        }

        // create trip details stream.
    },
)

export { tripRouter }
