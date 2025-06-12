import type { TripDurationEnum } from '~/core/trip/trip.model'
import type { Route } from '../routes/+types/plan-trip'
import type { AppType } from '~/server/main'
import { hc } from 'hono/client'
import { createClerkClient } from '@clerk/backend'

export const planTripAction = async (args: Route.ActionArgs) => {
    const formData = await args.request.formData()
    const destinationName = String(formData.get('destinationName'))
    const startDate = String(formData.get('startDate'))
    const headcount = String(formData.get('headcount'))
    const duration = String(formData.get('duration')) as TripDurationEnum
    const userId = formData.get('userId')
        ? String(formData.get('userId'))
        : null

    const client = hc<AppType>(process.env.SERVER_URL!)
    const tripId = await client.createTrip
        .$post({
            json: {
                destinationName,
                startDate,
                headcount,
                duration,
                ...(userId && { userId }),
            },
        })
        .then((res) => res.json())
        .then((data) => data.tripId)

    // TODO: user is also not subscriber. if they are, they can do unlimited trips so we do not fall into this block.
    if (userId) {
        const clerkClient = createClerkClient({
            secretKey: process.env.CLERK_SECRET_KEY,
        })
        const user = await clerkClient.users.getUser(userId)
        const freeTripCount =
            (user.privateMetadata as { freeTripCount: number })
                ?.freeTripCount ?? 0

        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: { freeTripCount: freeTripCount + 1 },
        })
    }

    return { tripId }
}
