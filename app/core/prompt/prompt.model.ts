import z from 'zod'

export interface Prompt {
    promptId: string
    content: string
    userId?: string
    createdAt: string
    updatedAt: string
    expireAt?: number
}

export const PromptSchema = z.object({
    promptId: z.string(),
    content: z.string(),
    userId: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})