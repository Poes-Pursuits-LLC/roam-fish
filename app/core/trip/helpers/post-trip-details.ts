import { Resource } from 'sst'
import z from 'zod'
import { restClient } from '~/clients/rest.client'
import { zodResponseFormat } from 'openai/helpers/zod'

const ZResponseFormat = z.object({
    tripName: z.string(),
    tripDescription: z.string(),
})

export const postTripDetails = async (inputs: {
    destinationName: string
    startDate: string
    endDate: string
}) => {
    const response = await restClient.post<{ response_id: string }>({
        url: `${Resource.XAiUrl.value}/v1/chat/completions`,
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
                    content:
                        'write a brief summary of an amazing fly fishing trip with the provided inputs',
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
    const contentId = response.response_id
    return contentId
}
