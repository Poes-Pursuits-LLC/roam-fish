import type { APIGatewayEvent } from 'aws-lambda'
import { main } from './main'
import { verifyClerkWebhookEvent } from './verify-event'

export const handler = async (event: APIGatewayEvent) => {
    try {
        console.info(`Clerk webhook handler processing event: ${event}`)
        verifyClerkWebhookEvent(event)
        await main(event)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'success' })
        }
    } catch (error) {
        console.error(
            `Error in clerk webhook handler: ${(error as Error)}`,
        )

        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }
}
