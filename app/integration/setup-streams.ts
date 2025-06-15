import {
    DynamoDBStreamsClient,
    DescribeStreamCommand,
    GetShardIteratorCommand,
    GetRecordsCommand,
} from '@aws-sdk/client-dynamodb-streams'
import { DynamoDBClient, DescribeTableCommand } from '@aws-sdk/client-dynamodb'
import { getDynamoClient } from '~/clients/table.client'
import { main } from '~/functions/analytics/main'
import type { DynamoDBStreamEvent, StreamRecord } from 'aws-lambda'

const getStreamClient = () => {
    return new DynamoDBStreamsClient({
        endpoint: process.env.DYNAMO_ENDPOINT,
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    })
}

export const setupStreamProcessing = async () => {
    const tableName = 'integration-table'
    const client = getDynamoClient() as DynamoDBClient
    const streamClient = getStreamClient()

    // Get the stream ARN
    const { Table } = await client.send(
        new DescribeTableCommand({ TableName: tableName }),
    )
    const streamArn = Table?.LatestStreamArn

    if (!streamArn) {
        throw new Error('No stream ARN found for table')
    }

    // Get stream details
    const { StreamDescription } = await streamClient.send(
        new DescribeStreamCommand({ StreamArn: streamArn }),
    )

    if (!StreamDescription?.Shards) {
        throw new Error('No shards found in stream')
    }

    // Get shard iterator for the first shard
    const { ShardIterator } = await streamClient.send(
        new GetShardIteratorCommand({
            StreamArn: streamArn,
            ShardId: StreamDescription.Shards[0].ShardId,
            ShardIteratorType: 'LATEST',
        }),
    )

    if (!ShardIterator) {
        throw new Error('No shard iterator found')
    }

    // Start processing stream in background
    const processStream = async () => {
        let currentShardIterator = ShardIterator
        try {
            while (true) {
                const { Records, NextShardIterator } = await streamClient.send(
                    new GetRecordsCommand({
                        ShardIterator: currentShardIterator,
                    }),
                )

                if (Records && Records.length > 0) {
                    // Convert stream records to DynamoDBStreamEvent format
                    const streamEvent: DynamoDBStreamEvent = {
                        Records: Records.map((record: StreamRecord) => ({
                            eventID: record.eventID!,
                            eventName: record.eventName!,
                            eventVersion: record.eventVersion!,
                            eventSource: record.eventSource!,
                            awsRegion: record.awsRegion!,
                            dynamodb: record.dynamodb!,
                            eventSourceARN: record.eventSourceARN!,
                        })),
                    }

                    // Process the stream event
                    await main(streamEvent)
                }

                // Wait before next poll
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // Update shard iterator for next poll
                if (NextShardIterator) {
                    currentShardIterator = NextShardIterator
                } else {
                    break
                }
            }
        } catch (error) {
            console.error('Error processing stream:', error)
            throw error
        }
    }

    // Start stream processing in background
    processStream().catch(console.error)

    return {
        stop: () => {
            // We could add cleanup logic here if needed
        },
    }
}
