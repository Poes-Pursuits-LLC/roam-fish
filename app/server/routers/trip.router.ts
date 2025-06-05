import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { PromptEnum, xAiClient } from '~/clients/xai.client'
import { streamSSE } from 'hono/streaming'

const tripRouter = new Hono().post(
    '/createTrip',
    zValidator(
        'json',
        z.object({
            destinationName: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            userId: z.string().optional(),
        }),
    ),
    async (c) => {
        const inputs = c.req.valid('json')

        const tripContentStream = xAiClient.submitPrompt({
            inputs: {
                destinationName: inputs.destinationName,
                startDate: inputs.startDate,
            },
            prompt: PromptEnum.CreateTripDetails,
        })
        console.info('here is our tripContentStream', tripContentStream)

        return streamSSE(c, async (sseStream) => {
            for await (const chunk of tripContentStream) {
                await sseStream.writeSSE({
                    data: JSON.stringify(chunk),
                })
            }
        })
    },
)

export { tripRouter }
