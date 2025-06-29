import { Webhook } from 'svix'
import { Resource } from 'sst'
import type { APIGatewayEvent } from 'aws-lambda'

export const verifyClerkWebhookEvent = (event: APIGatewayEvent) => {
    const wh = new Webhook(Resource.ClerkWebhookSecret.value)
    const svix_id = event.headers['svix-id']
    const svix_timestamp = event.headers['svix-timestamp']
    const svix_signature = event.headers['svix-signature']

    wh.verify(event.body!, {
        'svix-id': svix_id!,
        'svix-timestamp': svix_timestamp!,
        'svix-signature': svix_signature!,
    })
}
