import { Resource } from 'sst'
import z from 'zod'
import { restClient } from '~/clients/rest.client'
import { zodResponseFormat } from 'openai/helpers/zod'

const ZResponseFormat = z.object({
    name: z.string(),
    cities: z.array(z.string()),
    airport: z.string(),
    weather: z.string(),
    flies: z.array(z.string()),
    hatches: z.array(z.string()),
    tacticsSummary: z.string(),
})

export const postTripDetails = async (inputs: {
    destinationName: string
    startDate: string
    duration: string
    headcount: string
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
        based on where they want to go to fly fishing for trout. 

    Please provide a detailed plan for the trip, including ALL of the following:
    - a trip name.
    - Up to three cities or towns that I should book accommodations in that would be a good base of operations for fishing. Just specify the city or town name, nor the state or country as the user already knows that by this point.
    - a recommended airport that I should fly in to to get to the area.
    - A list of up to 5 flies to try that are appropriate for trout in the area, typical weather conditions, and time of year. 
    (put them in the "flies" list)
    - A list of up to 5 "hatch" or bugs that are active in the area at that time of year.
    (put them in the "hatches" list)
    - A basic description of the weather that could be expected in the area at that time of year.
    - A brief summary of the tactics that should be used and the best times to use them, incorporating the weather, hatch, and tactics.

    INPUT:
`
