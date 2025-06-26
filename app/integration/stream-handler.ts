import {
    DynamoDBStreamsClient,
    GetRecordsCommand,
    GetShardIteratorCommand,
    DescribeStreamCommand,
    ShardIteratorType,
    type _Record,
} from '@aws-sdk/client-dynamodb-streams'
import type { DynamoDBStreamEvent, DynamoDBRecord } from 'aws-lambda'
import { main } from '~/functions/analytics/main'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const convertStreamRecord = (record: _Record): DynamoDBRecord => {
    return {
        eventName: record.eventName,
        eventID: record.eventID,
        eventVersion: record.eventVersion,
        eventSource: record.eventSource,
        awsRegion: record.awsRegion,
        dynamodb: record.dynamodb
            ? {
                  ApproximateCreationDateTime:
                      record.dynamodb.ApproximateCreationDateTime?.getTime(),
                  Keys: record.dynamodb.Keys,
                  NewImage: record.dynamodb.NewImage,
                  OldImage: record.dynamodb.OldImage,
                  SequenceNumber: record.dynamodb.SequenceNumber,
                  SizeBytes: record.dynamodb.SizeBytes,
                  StreamViewType: record.dynamodb.StreamViewType,
              }
            : undefined,
    } as DynamoDBRecord
}

const shardIterators = new Map<string, string>()

const client = new DynamoDBStreamsClient({
    endpoint: process.env.DYNAMODB_ENDPOINT!,
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'local',
        secretAccessKey: 'local',
    },
})

const getShardIds = async (streamArn: string): Promise<string[]> => {
    try {
        const command = new DescribeStreamCommand({
            StreamArn: streamArn,
        })
        const response = await client.send(command)
        return (
            response.StreamDescription?.Shards?.map(
                (shard) => shard.ShardId!,
            ).filter(Boolean) || []
        )
    } catch (error) {
        console.error('Failed to describe stream:', error)
        return []
    }
}

const getInitialShardIterator = async (
    streamArn: string,
    shardId: string,
): Promise<string | null> => {
    try {
        const command = new GetShardIteratorCommand({
            StreamArn: streamArn,
            ShardId: shardId,
            ShardIteratorType: ShardIteratorType.LATEST,
        })
        const response = await client.send(command)
        return response.ShardIterator || null
    } catch (error) {
        console.error(
            `Failed to get shard iterator for shard ${shardId}:`,
            error,
        )
        return null
    }
}

const fetchAndProcessStreamRecords = async () => {
    const streamArn = process.env.STREAM_ARN!

    try {
        if (shardIterators.size === 0) {
            const shardIds = await getShardIds(streamArn)

            for (const shardId of shardIds) {
                const iterator = await getInitialShardIterator(
                    streamArn,
                    shardId,
                )
                if (iterator) {
                    shardIterators.set(shardId, iterator)
                }
            }
        }

        for (const [shardId, shardIterator] of shardIterators.entries()) {
            try {
                const getRecordsCommand = new GetRecordsCommand({
                    ShardIterator: shardIterator,
                    Limit: 100,
                })

                const response = await client.send(getRecordsCommand)
                const records = response.Records || []

                if (records.length > 0) {
                    const mockEvent: DynamoDBStreamEvent = {
                        Records: records.map(convertStreamRecord),
                    }

                    await main(mockEvent)
                }

                if (response.NextShardIterator) {
                    shardIterators.set(shardId, response.NextShardIterator)
                } else {
                    shardIterators.delete(shardId)
                }
            } catch (error) {
                console.error(`Error processing shard ${shardId}:`, error)
                shardIterators.delete(shardId)
            }
        }
    } catch (error) {
        console.error('Error in fetchAndProcessStreamRecords:', error)
    }
}

await fetchAndProcessStreamRecords()
setInterval(fetchAndProcessStreamRecords, 1000)

const app = new Hono()
serve(
    {
        fetch: app.fetch,
        port: 3001,
    },
    (info) => {
        console.log(`Stream handler server listening on port ${info.port}`)
    },
)
