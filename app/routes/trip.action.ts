import { hc } from 'hono/client'
import type { Route } from './+types/trip'
import type { AppType } from '~/server/main'

// TODO: add notes, packing list, checklist, budget editability

export const tripAction = async (args: Route.ActionArgs) => {
    const { tripId } = args.params
    const formData = await args.request.formData()
    const tripName = formData.get('tripName') as string

    const client = hc<AppType>(process.env.SERVER_URL!)
    await client.updateTrip.$post({
        json: {
            tripId: tripId,
            updateFields: {
                name: tripName,
            },
        },
    })
}
