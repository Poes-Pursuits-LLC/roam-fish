import type { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda'

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
