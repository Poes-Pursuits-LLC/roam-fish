import type { APIGatewayEvent } from 'aws-lambda'
import { EmailType } from '~/core/notification/notification.model'
import { notificationService } from '~/core/notification/notification.service'

export const main = async (event: APIGatewayEvent) => {
    const eventBody = JSON.parse(event?.body ?? '{}')
    const { email_addresses } = eventBody.data as ClerkUserCreatedEvent['data']
    const email = email_addresses[0].email_address

    await Promise.all([
        notificationService.addToMarketingList(email),
        notificationService.sendEmail(email, EmailType.Welcome),
    ])
}

export interface ClerkUserCreatedEvent {
    data: {
        birthday: string
        created_at: number
        email_addresses: Array<{
            email_address: string
            id: string
            linked_to: string[]
            object: string
            verification: {
                status: string
                strategy: string
            }
        }>
        external_accounts: string[]
        external_id: string
        first_name: string
        gender: string
        id: string
        image_url: string
        last_name: string
        last_sign_in_at: number
        object: string
        password_enabled: boolean
        phone_numbers: string[]
        primary_email_address_id: string
        primary_phone_number_id: string | null
        primary_web3_wallet_id: string | null
        private_metadata: Record<string, string>
        profile_image_url: string
        public_metadata: Record<string, string>
        two_factor_enabled: boolean
        unsafe_metadata: Record<string, string>
        updated_at: number
        username: string | null
        web3_wallets: string[]
    }
    event_attributes: {
        http_request: {
            client_ip: string
            user_agent: string
        }
    }
    object: string
    timestamp: number
    type: 'user.created'
}
