import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { tripService } from '~/core/trip/trip.service'
import { handleAsync } from '~/utils'
import { TripDurationEnum, TripStatusEnum } from '~/core/trip/trip.model'
import { createDefaultPackingList } from '~/core/trip/helpers/create-default-packing-list'
import { HTTPException } from 'hono/http-exception'

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
            console.info('Invoked server.getTrip with tripId:', tripId)

            const [trip, getTripError] = await handleAsync(
                tripService.getTrip(tripId),
            )
            if (getTripError) {
                throw new HTTPException(500, { message: getTripError.message })
            }

            if (trip!.status === TripStatusEnum.Generating) {
                const [tripContent, getTripContentError] = await handleAsync(
                    tripService.getTripDetails(trip!.contentId),
                )
                if (getTripContentError) {
                    throw new HTTPException(500, {
                        message: getTripContentError.message,
                    })
                }

                if (tripContent) {
                    const [, updateTripError] = await handleAsync(
                        tripService.updateTrip(trip!.tripId, {
                            ...tripContent,
                            status: TripStatusEnum.Planned,
                        }),
                    )
                    if (updateTripError) {
                        throw new HTTPException(500, {
                            message: updateTripError.message,
                        })
                    }

                    const [updatedTrip, getTripError] = await handleAsync(
                        tripService.getTrip(tripId),
                    )
                    if (getTripError) {
                        throw new HTTPException(500, {
                            message: getTripError.message,
                        })
                    }

                    return c.json({
                        trip: updatedTrip!,
                    })
                }
            }

            return c.json({
                trip: trip!,
            })
        },
    )
    .get(
        '/getUserTrips',
        zValidator('query', z.object({ userId: z.string() })),
        async (c) => {
            const { userId } = c.req.valid('query')
            console.info('Invoked server.getUserTrips with userId:', userId)

            const [trips, getTripsError] = await handleAsync(
                tripService.getUserTrips(userId),
            )
            if (getTripsError) {
                throw new HTTPException(500, {
                    message: getTripsError.message,
                })
            }
            return c.json({ trips: trips ?? [] })
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
            console.info('Invoked server.createTrip with inputs:', inputs)

            const [contentId, submitTripDetailsError] = await handleAsync(
                tripService.submitTripDetails(inputs),
            )
            if (submitTripDetailsError) {
                throw new HTTPException(500, {
                    message: submitTripDetailsError.message,
                })
            }

            const [tripId, createTripError] = await handleAsync(
                tripService.createTrip({
                    ...inputs,
                    contentId: contentId!,
                    status: TripStatusEnum.Generating,
                    packingList: createDefaultPackingList(inputs.headcount),
                }),
            )
            if (createTripError) {
                throw new HTTPException(500, {
                    message: createTripError.message,
                })
            }

            return c.json({ tripId })
        },
    )

export { tripRouter }
