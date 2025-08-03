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
    fishingSummary: z.string(),
})

export const postTripDetails = async (inputs: {
    destinationName: string
    startDate: string
    duration: string
    headcount: string
    prompt: string
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
                    content: inputs.prompt,
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        destinationName: inputs.destinationName,
                        startDate: inputs.startDate,
                        duration: inputs.duration,
                        headcount: inputs.headcount,
                    }),
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