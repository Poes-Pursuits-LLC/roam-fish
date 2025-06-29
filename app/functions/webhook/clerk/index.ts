import type { APIGatewayEvent } from 'aws-lambda'
import { main } from './main'
import { verifyClerkWebhookEvent } from './verify-event'

export const handler = async (event: APIGatewayEvent) => {
    try {
        verifyClerkWebhookEvent(event)
        await main(event)
    } catch (error) {
        console.error(
            `Error in analytics processor: ${(error as Error).message}`,
        )
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }
}
