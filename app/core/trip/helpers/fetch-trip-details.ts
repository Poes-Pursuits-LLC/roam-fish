import { Resource } from 'sst'
import { restClient } from '~/clients/rest.client'
import type { ChatCompletion } from 'openai/resources/chat'

export const fetchTripDetails = async (contentId: string) => {
    const response = await restClient.get<ChatCompletion>({
        url: `${Resource.XAiUrl.value}/chat/deferred-completion/${contentId}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Resource.XAiApiKey.value}`,
        },
    })
    if (!response?.choices?.[0]?.message?.content) {
        return null
    }
    return JSON.parse(response?.choices[0].message.content)
}
