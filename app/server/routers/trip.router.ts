import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { tripService } from '~/core/trip/trip.service'
import { handleAsync } from '~/utils'
import { TripDurationEnum, TripStatusEnum } from '~/core/trip/trip.model'
import { createDefaultPackingList } from '~/core/trip/helpers/create-default-packing-list'

const tripRouter = new Hono()
    .get(
        '/getTrip',
        zValidator(
            'query',
            z.object({
                tripId: z.string(),
            }),
        ),
        async (c) => {
            const { tripId } = c.req.valid('query')

            const [trip, getTripError] = await handleAsync(
                tripService.getTrip(tripId),
            )
            if (getTripError) {
                console.error(getTripError)
                throw new Error(getTripError.message)
            }

            if (trip!.status === TripStatusEnum.Generating) {
                const [tripContent, getTripContentError] = await handleAsync(
                    tripService.getTripDetails(trip!.contentId),
                )
                if (getTripContentError) {
                    console.error(getTripContentError)
                    throw new Error(getTripContentError.message)
                }

                if (tripContent) {
                    const [, updateTripError] = await handleAsync(
                        tripService.updateTrip(trip!.tripId, {
                            ...tripContent,
                            status: TripStatusEnum.Planned,
                        }),
                    )
                    if (updateTripError) {
                        console.error(updateTripError)
                        throw new Error(updateTripError.message)
                    }

                    const [updatedTrip, getTripError] = await handleAsync(
                        tripService.getTrip(tripId),
                    )
                    if (getTripError) {
                        console.error(getTripError)
                        throw new Error(getTripError.message)
                    }

                    return c.json({
                        trip: updatedTrip,
                    })
                }
            }

            return c.json({
                trip,
            })
        },
    )
    .post(
        '/createTrip',
        zValidator(
            'json',
            z.object({
                destinationName: z.string(),
                startDate: z.string(),
                duration: z.nativeEnum(TripDurationEnum),
                headcount: z.string(),
                userId: z.string().optional(),
            }),
        ),
        async (c) => {
            const inputs = c.req.valid('json')

            const [contentId, submitTripDetailsError] = await handleAsync(
                tripService.submitTripDetails(inputs),
            )
            if (submitTripDetailsError) {
                console.error(submitTripDetailsError)
                throw new Error(submitTripDetailsError.message)
            }

            const [tripId, createTripError] = await handleAsync(
                tripService.createTrip({
                    ...inputs,
                    contentId: contentId!,
                    status: TripStatusEnum.Generating,
                    duration: inputs.duration,
                    packingList: createDefaultPackingList(inputs.headcount),
                }),
            )
            if (createTripError) {
                console.error(createTripError)
                throw new Error(createTripError.message)
            }

            return c.json({ tripId })
        },
    )

export { tripRouter }
