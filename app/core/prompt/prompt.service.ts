import { DynamoPrompt } from './prompt.dynamo'
import type { Prompt } from './prompt.model'
import { createFormattedDate, getTTL } from '~/utils'

const getPrompt = async (promptId: string) => {
    const { data: prompt } = await DynamoPrompt().get({ promptId }).go()
    return prompt
}

const getUserPrompts = async (userId: string, count?: number) => {
    const { data: prompts } = await DynamoPrompt()
        .query.byUserId({ userId })
        .go({ order: 'desc', ...(count && { count }) })
    return prompts
}

const createPrompt = async (
    prompt: Pick<Prompt, 'content' | 'userId'>,
) => {
    const { data } = await DynamoPrompt()
        .put({
            ...prompt,
            ...(process.env.CICD_WEB_URL && { expireAt: getTTL(1) }),
        })
        .go()
    return data.promptId
}

const updatePrompt = async (promptId: string, promptFields: Partial<Prompt>) => {
    await DynamoPrompt()
        .patch({ promptId })
        .set({
            ...promptFields,
            updatedAt: createFormattedDate(),
        })
        .go()
}

const deletePrompt = async (promptId: string) => {
    await DynamoPrompt().delete({ promptId }).go()
}

export const promptService = {
    getPrompt,
    getUserPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
}