import { hc } from 'hono/client'
import type { Route } from '../routes/+types/trip'
import type { AppType } from '~/server/main'

export const tripAction = async (args: Route.ActionArgs) => {
    try {
        const { tripId } = args.params
        const formData = await args.request.formData()
        const tripName = formData.get('tripName') as string
        const budgetListJson = formData.get('budgetList') as string
        const checkListJson = formData.get('checkList') as string
        const packingListJson = formData.get('packingList') as string
        const notes = formData.get('notes') as string

        const client = hc<AppType>(process.env.SERVER_URL!)
        await client.updateTrip.$post({
            json: {
                tripId,
                updateFields: {
                    ...(tripName && { name: tripName }),
                    ...(budgetListJson && {
                        budgetList: JSON.parse(budgetListJson),
                    }),
                    ...(checkListJson && {
                        checkList: JSON.parse(checkListJson),
                    }),
                    ...(packingListJson && {
                        packingList: JSON.parse(packingListJson),
                    }),
                    ...(notes && { notes }),
                },
            },
        })
    } catch (error) {
        throw Error(error)
    }
}
