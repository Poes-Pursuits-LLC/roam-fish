import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { tripService } from '~/core/trip/trip.service'
import { createFormattedDate, handleAsync } from '~/utils'
import {
    TripDurationEnum,
    TripStatusEnum,
    TripSchema,
} from '~/core/trip/trip.model'
import { createDefaultPackingList } from '~/core/trip/helpers/create-default-packing-list'
import { HTTPException } from 'hono/http-exception'
import { createDefaultBudgetList } from '~/core/trip/helpers/create-default-budget'
import { createDefaultCheckList } from '~/core/trip/helpers/create-defaultcheckList'

const updatableTripFields = TripSchema.pick({
    name: true,
    notes: true,
    status: true,
    packingList: true,
    budgetList: true,
    checkList: true,
    startDate: true,
    updatedAt: true,
}).partial()

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
                console.info('TRIP CONTENT BRUH', tripContent)
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
                console.error('hey whats up', submitTripDetailsError)
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
                    budgetList: createDefaultBudgetList(
                        inputs.headcount,
                        inputs.duration,
                    ),
                    checkList: createDefaultCheckList(),
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
    .post(
        '/updateTrip',
        zValidator(
            'json',
            z.object({
                tripId: z.string(),
                updateFields: updatableTripFields,
            }),
        ),
        async (c) => {
            const { tripId, updateFields } = c.req.valid('json')
            console.info(
                `Invoked server.updateTrip with tripId: ${tripId} and updates:`,
                updateFields,
            )

            const [, updateTripError] = await handleAsync(
                tripService.updateTrip(tripId, {
                    ...updateFields,
                    updatedAt: createFormattedDate(),
                }),
            )
            if (updateTripError) {
                throw new HTTPException(500, {
                    message: updateTripError.message,
                })
            }

            return c.json({ tripId })
        },
    )

export { tripRouter }
