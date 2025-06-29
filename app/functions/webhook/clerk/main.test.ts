import { createApiGatewayEvent } from '~/test-utils'

it('should response to a user.created event from Clerk by sending the new user an email and enrolling them in the marketing contact list', () => {
    const event = createApiGatewayEvent({ body: JSON.stringify({}) })
})
