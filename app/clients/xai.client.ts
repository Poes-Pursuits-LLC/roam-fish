import { Resource } from 'sst'
import { OpenAI } from 'openai'

let client: OpenAI | undefined

export enum PromptEnum {
    CreateTripDetails = 'CreateTripDetails',
}

const getXAiClient = () => {
    if (!client) {
        client = new OpenAI({
            apiKey: Resource.XAiApiKey.value,
            baseURL: Resource.XAiUrl.value,
        })
        return client
    }
}

const submitPrompt = async <T>({
    inputs,
    prompt,
}: {
    inputs: T
    prompt: PromptEnum
}) => {
    const client = getXAiClient()
    return client!.responses.stream({
        model: 'grok-2',
        input: [
            {
                role: 'system',
                content: PromptMap.get(prompt)!,
            },
            {
                role: 'user',
                content: JSON.stringify(inputs),
            },
        ],
    })
}

const PromptMap = new Map([
    [
        PromptEnum.CreateTripDetails,
        'write a brief summary of an amazing fly fishing trip with the provided inputs',
    ],
])

export const xAiClient = {
    submitPrompt,
}
