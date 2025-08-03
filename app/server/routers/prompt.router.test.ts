import { describe, expect, it, vi } from 'vitest'
import { testClient } from 'hono/testing'
import { promptService } from '~/core/prompt/prompt.service'
import { promptRouter } from './prompt.router'
import { Hono } from 'hono'
import type { Prompt } from '~/core/prompt/prompt.model'

vi.mock('~/core/prompt/prompt.service.ts', () => ({
    promptService: {
        getPrompt: vi.fn(),
        createPrompt: vi.fn(),
        getUserPrompts: vi.fn(),
        updatePrompt: vi.fn(),
        deletePrompt: vi.fn(),
    },
}))

vi.mock('../main', () => ({
    main: new Hono().route('/', promptRouter),
}))
import { main } from '../main'

describe('/createPrompt', () => {
    it('should create a prompt and return its id', async () => {
        const client = testClient(main)
        const inputs = {
            content: 'Test prompt content',
            userId: 'user123',
        }

        vi.mocked(promptService.createPrompt).mockResolvedValue('prompt123')

        const response = await client.createPrompt.$post({
            json: inputs,
        })

        expect(response.status).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toEqual({ promptId: 'prompt123' })
        expect(promptService.createPrompt).toHaveBeenCalledWith(inputs)
    })

    it('should create a prompt without userId', async () => {
        const client = testClient(main)
        const inputs = {
            content: 'Anonymous prompt content',
        }

        vi.mocked(promptService.createPrompt).mockResolvedValue('prompt456')

        const response = await client.createPrompt.$post({
            json: inputs,
        })

        expect(response.status).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toEqual({ promptId: 'prompt456' })
        expect(promptService.createPrompt).toHaveBeenCalledWith(inputs)
    })
})

describe('/getPrompt', () => {
    it('should get a prompt by id', async () => {
        const client = testClient(main)
        const mockPrompt: Prompt = {
            promptId: 'prompt123',
            content: 'Test prompt content',
            userId: 'user123',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
        }

        vi.mocked(promptService.getPrompt).mockResolvedValue(mockPrompt)

        const response = await client.getPrompt.$get({
            query: { promptId: 'prompt123' },
        })

        expect(response.status).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toEqual({ prompt: mockPrompt })
        expect(promptService.getPrompt).toHaveBeenCalledWith('prompt123')
    })
})

describe('/getUserPrompts', () => {
    it('should get user prompts', async () => {
        const client = testClient(main)
        const mockPrompts: Prompt[] = [
            {
                promptId: 'prompt1',
                content: 'First prompt',
                userId: 'user123',
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z',
            },
            {
                promptId: 'prompt2',
                content: 'Second prompt',
                userId: 'user123',
                createdAt: '2024-01-02T00:00:00Z',
                updatedAt: '2024-01-02T00:00:00Z',
            },
        ]

        vi.mocked(promptService.getUserPrompts).mockResolvedValue(mockPrompts)

        const response = await client.getUserPrompts.$get({
            query: { userId: 'user123', count: '2' },
        })

        expect(response.status).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toEqual({ prompts: mockPrompts })
        expect(promptService.getUserPrompts).toHaveBeenCalledWith('user123', 2)
    })
})

describe('/updatePrompt', () => {
    it('should update a prompt', async () => {
        const client = testClient(main)
        const updateData = {
            promptId: 'prompt123',
            updateFields: {
                content: 'Updated content',
            },
        }

        vi.mocked(promptService.updatePrompt).mockResolvedValue(undefined)

        const response = await client.updatePrompt.$post({
            json: updateData,
        })

        expect(response.status).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toEqual({ promptId: 'prompt123' })
        expect(promptService.updatePrompt).toHaveBeenCalledWith(
            'prompt123',
            expect.objectContaining({
                content: 'Updated content',
                updatedAt: expect.any(String),
            }),
        )
    })
})

describe('/deletePrompt', () => {
    it('should delete a prompt', async () => {
        const client = testClient(main)

        vi.mocked(promptService.deletePrompt).mockResolvedValue(undefined)

        const response = await client.deletePrompt.$delete({
            json: { promptId: 'prompt123' },
        })

        expect(response.status).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toEqual({ success: true })
        expect(promptService.deletePrompt).toHaveBeenCalledWith('prompt123')
    })
})