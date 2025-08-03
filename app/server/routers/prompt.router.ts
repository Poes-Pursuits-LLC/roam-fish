import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { promptService } from '~/core/prompt/prompt.service'
import { createFormattedDate, handleAsync } from '~/utils'
import { PromptSchema } from '~/core/prompt/prompt.model'
import { HTTPException } from 'hono/http-exception'

const updatablePromptFields = PromptSchema.pick({
    content: true,
    updatedAt: true,
}).partial()

const promptRouter = new Hono()
    .get(
        '/getPrompt',
        zValidator(
            'query',
            z.object({
                promptId: z.string(),
            }),
        ),
        async (c) => {
            const { promptId } = c.req.valid('query')
            console.info('Invoked server.getPrompt with promptId:', promptId)

            const [prompt, getPromptError] = await handleAsync(
                promptService.getPrompt(promptId),
            )
            if (getPromptError) {
                console.error(`Error getting prompt: ${getPromptError.message}`)
                throw new HTTPException(404, { message: 'Prompt not found' })
            }

            return c.json({
                prompt: prompt!,
            })
        },
    )
    .get(
        '/getUserPrompts',
        zValidator(
            'query',
            z.object({ userId: z.string(), count: z.string().optional() }),
        ),
        async (c) => {
            const { userId, count } = c.req.valid('query')
            console.info(
                'Invoked server.getUserPrompts with userId:',
                userId,
                count,
            )

            const [prompts, getPromptsError] = await handleAsync(
                promptService.getUserPrompts(userId, Number(count)),
            )
            if (getPromptsError) {
                console.error(`Error getting prompts: ${getPromptsError.message}`)
                throw new HTTPException(500, {
                    message: getPromptsError.message,
                })
            }
            return c.json({ prompts: prompts ?? [] })
        },
    )
    .post(
        '/createPrompt',
        zValidator(
            'json',
            z.object({
                content: z.string(),
                userId: z.string().optional(),
            }),
        ),
        async (c) => {
            const inputs = c.req.valid('json')
            console.info('Invoked server.createPrompt with inputs:', inputs)

            const [promptId, createPromptError] = await handleAsync(
                promptService.createPrompt(inputs),
            )
            if (createPromptError) {
                console.error(`Error creating prompt: ${createPromptError.message}`)
                throw new HTTPException(500, {
                    message: createPromptError.message,
                })
            }

            return c.json({ promptId })
        },
    )
    .post(
        '/updatePrompt',
        zValidator(
            'json',
            z.object({
                promptId: z.string(),
                updateFields: updatablePromptFields,
            }),
        ),
        async (c) => {
            const { promptId, updateFields } = c.req.valid('json')
            console.info(
                `Invoked server.updatePrompt with promptId: ${promptId} and updates:`,
                updateFields,
            )

            const [, updatePromptError] = await handleAsync(
                promptService.updatePrompt(promptId, {
                    ...updateFields,
                    updatedAt: createFormattedDate(),
                }),
            )
            if (updatePromptError) {
                console.error(`Error updating prompt: ${updatePromptError.message}`)
                throw new HTTPException(500, {
                    message: updatePromptError.message,
                })
            }

            return c.json({ promptId })
        },
    )
    .delete(
        '/deletePrompt',
        zValidator(
            'json',
            z.object({
                promptId: z.string(),
            }),
        ),
        async (c) => {
            const { promptId } = c.req.valid('json')
            console.info('Invoked server.deletePrompt with promptId:', promptId)

            const [, deletePromptError] = await handleAsync(
                promptService.deletePrompt(promptId),
            )
            if (deletePromptError) {
                console.error(`Error deleting prompt: ${deletePromptError.message}`)
                throw new HTTPException(500, {
                    message: deletePromptError.message,
                })
            }

            return c.json({ success: true })
        },
    )

export { promptRouter }