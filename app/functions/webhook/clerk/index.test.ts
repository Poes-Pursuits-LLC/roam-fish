import { verifyClerkWebhookEvent } from './verify-event'
import { handler } from '.'
import { main } from './main'
import { createApiGatewayEvent } from '~/test-utils'

it('should verify the received event and then invoke main with said event', async () => {
    const verifyClerkWebhookEventMock = vi.mocked(verifyClerkWebhookEvent)
    const mainMock = vi.mocked(main)
    const event = createApiGatewayEvent()

    await handler(event)

    expect(verifyClerkWebhookEventMock).toHaveBeenCalledWith(event)
    expect(mainMock).toHaveBeenCalledWith(event)
})
