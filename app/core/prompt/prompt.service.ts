import { DynamoPrompt } from './prompt.dynamo'
import { FishingStyleEnum } from '../trip/trip.model'
import type { Prompt } from './prompt.model'

const getPromptContent = async (fishingStyle: FishingStyleEnum) => {
    const { data: prompt } = await DynamoPrompt().get({ fishingStyle }).go()
    return prompt?.content ?? null
}

const createPrompt = async (prompt: Pick<Prompt, 'content' | 'fishingStyle'>) => {
    await DynamoPrompt()
        .put(prompt)
        .go()
}

export const promptService = {
    getPromptContent,
    createPrompt,
}