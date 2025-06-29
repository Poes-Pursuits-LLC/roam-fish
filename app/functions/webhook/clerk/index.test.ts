import { it, expect, vi } from 'vitest'
import { verifyClerkWebhookEvent } from './verify-event'
import { handler } from '.'
import { main } from './main'
import { createApiGatewayEvent } from '~/test-utils'

vi.mock('./verify-event', () => {
    return {
        verifyClerkWebhookEvent: vi.fn(),
    }
})
const verifyClerkWebhookEventMock = vi.mocked(verifyClerkWebhookEvent)

vi.mock('./main', () => {
    return {
        main: vi.fn(),
    }
})
const mainMock = vi.mocked(main)

it('should verify the received event and then invoke main with said event and return a 200 statusCode if successful', async () => {
    const event = createApiGatewayEvent()

    const result = await handler(event)

    expect(verifyClerkWebhookEventMock).toHaveBeenCalledWith(event)
    expect(mainMock).toHaveBeenCalledWith(event)
    expect(result).toEqual({
        statusCode: 200,
        body: JSON.stringify({ message: 'success' })
    })
})
