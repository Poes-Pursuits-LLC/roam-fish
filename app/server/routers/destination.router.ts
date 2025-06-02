import { Hono } from 'hono'
import { destinationService } from '~/core/destination/destination.service'
import { handleAsync } from '~/utils'

const destinationRouter = new Hono().get('/destinations', async (c) => {
    const [destinations, getDestinationsError] = await handleAsync(
        destinationService.getDestinations(),
    )
    if (getDestinationsError) {
        console.error(getDestinationsError)
    }

    return c.json({
        destinations: destinations!,
    })
})

export { destinationRouter }
