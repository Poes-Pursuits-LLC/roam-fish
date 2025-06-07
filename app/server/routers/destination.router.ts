import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { destinationService } from '~/core/destination/destination.service'
import { handleAsync } from '~/utils'

const destinationRouter = new Hono().get('/destinations', async (c) => {
    console.info('Invoked server.getDestinations')
    const [destinations, getDestinationsError] = await handleAsync(
        destinationService.getDestinations(),
    )
    if (getDestinationsError) {
        throw new HTTPException(500, {
            message: getDestinationsError.message,
        })
    }

    return c.json({
        destinations: destinations ?? [],
    })
})

export { destinationRouter }
