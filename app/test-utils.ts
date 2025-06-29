import type { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda'
import type { ClerkUserCreatedEvent } from './functions/webhook/clerk/main'

export function createApiGatewayEvent(
    args: Partial<APIGatewayEvent> = {},
): APIGatewayEvent {
    return {
        body: JSON.stringify({ bodyKey: 'bodyValue' }),
        headers: {},
        httpMethod: 'POST',
        path: '/webhook',
        requestContext: {
            path: '/webhook',
            httpMethod: 'POST',
            accountId: '',
        } as APIGatewayEventRequestContext,
        resource: '/webhook',
        stageVariables: {},
        isBase64Encoded: false,
        pathParameters: {},
        queryStringParameters: {},
        multiValueHeaders: {},
        multiValueQueryStringParameters: {},
        ...args,
    }
}

export function createClerkUserCreatedEvent(
    args: Partial<ClerkUserCreatedEvent['data']> = {}
): ClerkUserCreatedEvent {
    return {
        data: {
            birthday: '',
            created_at: Date.now(),
            email_addresses: [
                {
                    email_address: 'test@example.com',
                    id: 'idn_test123',
                    linked_to: [],
                    object: 'email_address',
                    verification: {
                        status: 'verified',
                        strategy: 'ticket'
                    }
                }
            ],
            external_accounts: [],
            external_id: '12345',
            first_name: 'Test',
            gender: '',
            id: 'user_test123',
            image_url: 'https://img.clerk.com/test',
            last_name: 'User',
            last_sign_in_at: Date.now(),
            object: 'user',
            password_enabled: true,
            phone_numbers: [],
            primary_email_address_id: 'idn_test123',
            primary_phone_number_id: null,
            primary_web3_wallet_id: null,
            private_metadata: {},
            profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
            public_metadata: {},
            two_factor_enabled: false,
            unsafe_metadata: {},
            updated_at: Date.now(),
            username: null,
            web3_wallets: []
        },
        event_attributes: {
            http_request: {
                client_ip: '127.0.0.1',
                user_agent: 'Mozilla/5.0 (Test Browser)'
            }
        },
        object: 'event',
        timestamp: Date.now(),
        type: 'user.created',
        ...args
    }
}