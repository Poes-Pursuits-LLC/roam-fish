import { vi } from 'vitest'
import { main } from '~/server/main'
import { serve } from '@hono/node-server'
import { spawn } from 'child_process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb'

const __dirname = dirname(fileURLToPath(import.meta.url))
let dockerComposeProcess: ReturnType<typeof spawn>
let server: ReturnType<typeof serve>

vi.mock('sst', () => ({
    Resource: {
        Table: {
            name: 'test-table',
        },
    },
}))

async function startDockerCompose() {
    return new Promise<void>((resolve, reject) => {
        dockerComposeProcess = spawn('docker-compose', ['up', '-d'], {
            cwd: __dirname,
            stdio: 'pipe',
        })

        dockerComposeProcess.on('close', (code) => {
            if (code === 0) {
                resolve()
            } else {
                reject(new Error(`docker-compose up failed with code ${code}`))
            }
        })

        dockerComposeProcess.on('error', (err) => {
            reject(err)
        })
    })
}

async function stopDockerCompose() {
    return new Promise<void>((resolve, reject) => {
        const stopProcess = spawn('docker-compose', ['down'], {
            cwd: __dirname,
            stdio: 'pipe',
        })

        stopProcess.on('close', (code) => {
            if (code === 0) {
                resolve()
            } else {
                reject(
                    new Error(`docker-compose down failed with code ${code}`),
                )
            }
        })

        stopProcess.on('error', (err) => {
            reject(err)
        })
    })
}

async function waitForDynamoDBHealth() {
    const maxAttempts = 30
    const delayMs = 1000

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await new Promise<void>((resolve, reject) => {
                const req = http.get('http://localhost:8000', (res) => {
                    if (res.statusCode === 400) {
                        // DynamoDB returns 400 for invalid requests, which means it's running
                        resolve()
                    } else {
                        reject(
                            new Error(
                                `Unexpected status code: ${res.statusCode}`,
                            ),
                        )
                    }
                })
                req.on('error', () => {
                    // Ignore errors and continue waiting
                    reject()
                })
                req.end()
            })
            return
        } catch {
            // Ignore errors and continue waiting
            await new Promise((resolve) => setTimeout(resolve, delayMs))
        }
    }
    throw new Error(
        'DynamoDB container failed to become healthy within the timeout period',
    )
}

async function createTestTable() {
    const client = new DynamoDBClient({
        endpoint: process.env.DYNAMODB_ENDPOINT,
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    })
    try {
        await client.send(
            new CreateTableCommand({
                TableName: 'test-table',
                AttributeDefinitions: [
                    { AttributeName: 'pk', AttributeType: 'S' },
                    { AttributeName: 'sk', AttributeType: 'S' },
                    { AttributeName: 'gsi1pk', AttributeType: 'S' },
                    { AttributeName: 'gsi1sk', AttributeType: 'S' },
                ],
                KeySchema: [
                    { AttributeName: 'pk', KeyType: 'HASH' },
                    { AttributeName: 'sk', KeyType: 'RANGE' },
                ],
                GlobalSecondaryIndexes: [
                    {
                        IndexName: 'gsi1pk-gsi1sk-index',
                        KeySchema: [
                            { AttributeName: 'gsi1pk', KeyType: 'HASH' },
                            { AttributeName: 'gsi1sk', KeyType: 'RANGE' },
                        ],
                        Projection: { ProjectionType: 'ALL' },
                        ProvisionedThroughput: {
                            ReadCapacityUnits: 1,
                            WriteCapacityUnits: 1,
                        },
                    },
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1,
                },
            }),
        )
        console.log('Created test-table in DynamoDB Local')
    } catch (err: unknown) {
        if (
            typeof err === 'object' &&
            err &&
            'name' in err &&
            (err as { name: string }).name === 'ResourceInUseException'
        ) {
            console.log('test-table already exists')
        } else {
            throw err
        }
    }
}

export async function setupTestEnvironment() {
    process.env.DYNAMODB_ENDPOINT = 'http://localhost:8000'
    process.env.AWS_ACCESS_KEY_ID = 'local'
    process.env.AWS_SECRET_ACCESS_KEY = 'local'
    process.env.AWS_REGION = 'us-east-1'
    process.env.NODE_ENV = 'test'

    try {
        await startDockerCompose()
        await waitForDynamoDBHealth()
        await createTestTable()
    } catch (error) {
        console.error('Failed to start Docker Compose:', error)
        throw error
    }

    server = serve({
        fetch: main.fetch,
        port: 3000,
    })

    return {
        serverUrl: 'http://localhost:3000',
        dynamoEndpoint: process.env.DYNAMODB_ENDPOINT,
    }
}

export async function teardownTestEnvironment() {
    server?.close()
    try {
        await stopDockerCompose()
    } catch (error) {
        console.error('Failed to stop Docker Compose:', error)
        throw error
    }
}
