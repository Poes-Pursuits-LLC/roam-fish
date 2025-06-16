import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { handler } from '~/server/index'
import type { Context as LambdaContext } from 'aws-lambda'

const mockContext: LambdaContext = {
    callbackWaitsForEmptyEventLoop: true,
    functionName: 'test-function',
    functionVersion: '$LATEST',
    invokedFunctionArn: 'arn:aws:lambda:region:account:function:test-function',
    memoryLimitInMB: '128',
    awsRequestId: 'test-request-id',
    logGroupName: '/aws/lambda/test-function',
    logStreamName: '2024/01/01/[$LATEST]test',
    getRemainingTimeInMillis: () => 1000,
    done: () => {},
    fail: () => {},
    succeed: () => {},
}

function createLambdaEvent(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string>,
) {
    return {
        httpMethod: method,
        path,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
        queryStringParameters: queryParams || {},
        requestContext: {
            http: { method, path },
            elb: {
                targetGroupArn:
                    'arn:aws:elasticloadbalancing:region:123456789012:targetgroup/my-targets/73e2d6bc24d8a067',
            },
        },
        isBase64Encoded: false,
    }
}

interface LambdaResponse {
    statusCode?: number
    body?: string
}

function parseLambdaResponse(lambdaResponse: LambdaResponse): {
    statusCode: number
    body: string
} {
    return {
        statusCode: lambdaResponse.statusCode || 200,
        body: lambdaResponse.body || '',
    }
}

const app = new Hono()

app.all('*', async (c) => {
    const method = c.req.method
    const path = c.req.path
    const body = method === 'POST' ? await c.req.json() : undefined
    const queryParams = c.req.query() as Record<string, string>

    const event = createLambdaEvent(method, path, body, queryParams)
    console.info('Lambda Event created:', JSON.stringify(event, null, 2))
    const result = await handler(event, mockContext)
    console.info('Lambda Handler result:', JSON.stringify(result, null, 2))
    const { statusCode, body: responseBody } = parseLambdaResponse(result)

    return c.json(
        JSON.parse(responseBody),
        statusCode as ContentfulStatusCode,
        {
            'Content-Type': 'application/json',
        },
    )
})

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

serve(
    {
        fetch: app.fetch,
        port,
    },
    (info) => {
        console.log(
            `Test Lambda server running at http://localhost:${info.port}`,
        )
    },
)
