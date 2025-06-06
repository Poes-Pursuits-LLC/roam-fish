import { Resource } from 'sst'
import { restClient } from '~/clients/rest.client'

export const getTripDetails = async (contentId: string) => {
    const response = await restClient.get<any>({
        url: `${Resource.XAiUrl.value}/chat/deferred-completion/${contentId}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Resource.XAiApiKey.value}`,
        },
    })

    if (!response.choices?.[0]?.message?.content) {
        return null
    }
    return JSON.parse(response.choices[0].message.content)
}
