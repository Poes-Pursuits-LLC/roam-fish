import { DynamoDestination } from './app/core/destination/destination.dynamo'

async function backfillTypeAttribute() {
    // 1. Scan all items (since they don't have the 'type' attribute yet)
    const { data: destinations } = await DynamoDestination().find({}).go()

    if (!destinations || destinations.length === 0) {
        console.log('No destinations found to update.')
        return
    }

    console.log(`Found ${destinations.length} destinations to update.`)

    for (const dest of destinations) {
        try {
            await DynamoDestination()
                .put({
                    ...dest,
                    gsi1pk: 'destination',
                    gsi1sk: 'destination',
                })
                .go()
            console.log(
                `Replaced destination ${dest.destinationId} with type: 'destination'`,
            )
        } catch (err) {
            console.error(
                `Failed to replace destination ${dest.destinationId}:`,
                err,
            )
        }
    }

    console.log('Backfill complete!')
}

backfillTypeAttribute().catch((err) => {
    console.error('Error during backfill:', err)
})
