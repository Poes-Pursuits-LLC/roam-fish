import { main } from './main'
import { type DynamoDBStreamEvent } from "aws-lambda";

export const handler = async (event: DynamoDBStreamEvent) => {
    try {
        console.info("Processing dynamo stream event")
        await main(event)
        console.info("Successfully processed dynamo stream event")
    } catch (error) {
        console.error(`Error in analytics processor: ${(error as Error).message}`)
        throw new Error(`${(error as Error).message}`)
    }
}
