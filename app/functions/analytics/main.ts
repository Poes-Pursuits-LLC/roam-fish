import type { DynamoDBStreamEvent } from "aws-lambda"
import { DynamoTrip } from "~/core/trip/trip.dynamo"
import { DynamoDestinationAnalytics } from "~/core/analytics/destination-analytics.dynamo"

async function handleTripEvent(dynamodb: any, eventName: string) {
    if (!dynamodb?.NewImage) return;

    const trip = DynamoTrip();
    const analytics = DynamoDestinationAnalytics();
    const newTrip = dynamodb.NewImage;
    const oldTrip = dynamodb.OldImage;

    // Extract trip data
    const destinationName = newTrip.destinationName.S;
    const userId = newTrip.userId.S;

    const startDate = newTrip.startDate.S;

    // Calculate total cost from budgetList
    const budgetList = newTrip.budgetList.L || [];
    const totalCost = budgetList.reduce((sum: number, item: any) => {
        const price = parseFloat(item.M.price.S) || 0;
        return sum + price;
    }, 0);

    // Get existing analytics for this destination
    const existingAnalytics = await analytics.get({
        userId,
        destinationName
    }).catch(() => null);

    if (existingAnalytics) {
        // Update existing analytics
        const current = existingAnalytics.data;
        await analytics.update({
            userId,
            destinationName,
            totalCost: current.totalCost + totalCost,
            visitCount: current.visitCount + 1,
            averageCost: (current.totalCost + totalCost) / (current.visitCount + 1),
            lastVisited: startDate
        });
    } else {
        // Create new analytics
        await analytics.create({
            userId,
            destinationName,
            totalCost,
            visitCount: 1,
            averageCost: totalCost,
            lastVisited: startDate
        });
    }

    // If this is a deletion, we might want to handle that differently
    if (eventName === "REMOVE" && oldTrip) {
        // For deletions, we could either:
        // 1. Remove the analytics entry
        // 2. Or keep it as historical data
        // For now, we'll keep it as historical data
    }
}

export const main = async (event: DynamoDBStreamEvent) => {
    for (const record of event.Records) {
        const entityType = record.dynamodb?.NewImage?.type.S
        const eventName = record.eventName;

        switch (entityType) {
            case 'trip':
                await handleTripEvent(record.dynamodb, eventName)
                break;
            default:
                return
        }
    }
}
