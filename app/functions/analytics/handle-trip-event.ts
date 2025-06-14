import type { DynamoDBRecord, DynamoDBStreamEvent } from "aws-lambda";

export const handleTripEvent = (recordData: DynamoDBRecord['dynamodb'], eventName: DynamoDBRecord['eventName']) => {
    switch event
}