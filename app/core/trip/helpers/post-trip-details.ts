import { Resource } from 'sst'
import z from 'zod'
import { restClient } from '~/clients/rest.client'
import { zodResponseFormat } from 'openai/helpers/zod'

const ZResponseFormat = z.object({
    name: z.string(),
    description: z.string(),
})

export const postTripDetails = async (inputs: {
    destinationName: string
    startDate: string
    endDate: string
}) => {
    const response = await restClient.post<{ request_id: string }>({
        url: `${Resource.XAiUrl.value}/chat/completions`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Resource.XAiApiKey.value}`,
        },
        body: {
            model: 'grok-3-fast',
            n: 1,
            temperature: 0.9,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: JSON.stringify(inputs),
                },
            ],
            deferred: true,
            response_format: zodResponseFormat(
                ZResponseFormat,
                'tripContentResponse',
            ),
        },
    })

    const contentId = response.request_id
    return contentId
}

const systemPrompt = `you are an expert trip planner and fly fishing expert who will construct trips for users 
        based on where they want to go to fly fishing. for trout. 
        You will do your best to provide helpful advice and suggestions for the trip.
        You will return your suggestions in structured JSON, using the specific inputs provided 
        by the user to generate the trip details.

    Please provide a detailed plan for the trip, including ALL of the following:
    - A basic trip description that respects the user inputs.
    - Up to three cities or towns that I should book accommodations in that would be a good base of operations for fishing. Just specify the city or town name, nor the state or country as the user already knows that by this point.
    - a recommended city with a decent airport that I should fly in to to get to the area.
    - A list of up to 5 flies to try that are appropriate for the species, typical weather conditions, and time of year. 
    (put them in the "tactics" list with a { name: [flyName] type: Fly } structure)
    - A list of up to 5 "hatch" or bugs that are active in the area at that time of year.
    (put them in the "tactics" list with a { name: [flyName] type: Hatch } structure)
    - A list of up to 3 types of day it could make sense to go fishing.
    (put them in the "tactics" list with a { name: [flyName] type: TimeOfDay } structure)
    - A list of up to 3 tactics that could make sense to use to target that fish that times of year.
    (put them in the "tactics" list with a { name: [flyName] type: Method } structure)
    - A list of 3 typical weather conditions that could be expected in the area at that time of year.
    (put them in the "tactics" list with a { name: [flyName] type: Weather } structure)
    - A summary of the tactics that should be used and the best times to use them, incorporating the weather, hatch, and tactics.
    - A rudimentary packing list broken down into essentials, electronics, clothes, toiletries, and fishing-specific items as well as quantities. Up to 10 items per category.
    They should be organized as { name: [name of item] type: [type of item, IE Clothes, Electronics, etc.]. }
    - a list of up to 3 nearby fly fishing shops that are in the area with contact info, if you can find it.

    INPUT:
    `
