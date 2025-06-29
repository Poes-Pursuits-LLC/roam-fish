import type { APIGatewayEvent } from 'aws-lambda'
import { main } from './main'
import { verifyClerkWebhookEvent } from './verify-event'

export const handler = async (event: APIGatewayEvent) => {
    try {
        console.info(`Clerk webhook handler received event: ${event}`)
        verifyClerkWebhookEvent(event)
        await main(event)
        console.info(`Clerk webhook handler successfully processed event`)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'success' })
        }
    } catch (error) {
        console.error(
            `Error in Clerk webhook handler: ${(error.message)}`,
        )

        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }
}
