import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import z from 'zod'
import { destinationService } from '~/core/destination/destination.service'
import { handleAsync } from '~/utils'

const destinationRouter = new Hono()
    .get('/destinations', async (c) => {
        console.info('Invoked server.getDestinations')
        const [destinations, getDestinationsError] = await handleAsync(
            destinationService.getDestinations(),
        )
        if (getDestinationsError) {
            console.info(getDestinationsError)
            throw new HTTPException(500, {
                message: getDestinationsError.message,
            })
        }

        return c.json({
            destinations: destinations ?? [],
        })
    })
    .post(
        '/createDestinations',
        zValidator(
            'json',
            z.object({
                destinations: z.array(
                    z.object({
                        name: z.string(),
                        province: z.string(),
                        country: z.string(),
                        type: z.string(),
                        imageUrl: z.string(),
                    }),
                ),
            }),
        ),
        async (c) => {
            const inputs = c.req.valid('json')
            console.info(
                'Invoked server.createDestinations with destinations:',
                inputs,
            )

            const [, createDestinationsError] = await handleAsync(
                destinationService.createDestinations(inputs.destinations),
            )
            if (createDestinationsError) {
                console.info(createDestinationsError)
                throw new HTTPException(500, {
                    message: createDestinationsError.message,
                })
            }

            return c.json({
                message: 'Destinations created successfully',
            })
        },
    )

export { destinationRouter }
