import { Webhook } from 'svix'
import { Resource } from 'sst'
import type { APIGatewayEvent } from 'aws-lambda'

export const verifyClerkWebhookEvent = (event: APIGatewayEvent) => {
    try {
        const wh = new Webhook(Resource.ClerkWebhookSecret.value)
        const svix_id = event.headers['svix-id']
        const svix_timestamp = event.headers['svix-timestamp']
        const svix_signature = event.headers['svix-signature']

        console.info('here is our secret as we go to verify the webhook signature!', Resource.ClerkWebhookSecret.value)

        wh.verify(event.body!, {
            'svix-id': svix_id!,
            'svix-timestamp': svix_timestamp!,
            'svix-signature': svix_signature!,
        })
    } catch (error) {
        console.error(JSON.stringify(error))
        throw Error(error)
    }
}
