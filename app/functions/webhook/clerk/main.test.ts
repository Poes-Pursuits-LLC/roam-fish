import { it, expect, vi } from 'vitest'
import { createApiGatewayEvent, createClerkUserCreatedEvent } from '~/test-utils'
import { notificationService } from '~/core/notification/notification.service'
import { main } from './main'
import { EmailType } from '~/core/notification/notification.model'

vi.mock('~/core/notification/notification.service', () => {
    return {
        notificationService: {
            sendEmail: vi.fn(),
            addToMarketingList: vi.fn(),
        }
    }
})
const sendEmail = vi.mocked(notificationService.sendEmail)
const addToMarketingList = vi.mocked(notificationService.addToMarketingList)

it('should response to a user.created event from Clerk by sending the new user an email and enrolling them in the marketing contact list', async () => {
    const event = createApiGatewayEvent({ body: JSON.stringify(createClerkUserCreatedEvent()) })

    await main(event)

    expect(sendEmail).toHaveBeenCalledWith('test@example.com', EmailType.Welcome)
    expect(addToMarketingList).toHaveBeenCalledWith('test@example.com')
})
