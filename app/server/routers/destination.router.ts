import { Hono } from 'hono'
import { destinationService } from '~/core/destination/destination.service'
import { handleAsync } from '~/utils'

const destinationRouter = new Hono().get('/destinations', async (c) => {
    console.info('Retrieving destinations...')
    const [destinations, getDestinationsError] = await handleAsync(
        destinationService.getDestinations(),
    )
    if (getDestinationsError) {
        console.error(getDestinationsError)
        throw new Error(getDestinationsError.message)
    }

    return c.json({
        destinations: destinations!,
    })
})

export { destinationRouter }
