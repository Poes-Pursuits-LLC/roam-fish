import { it, expect } from 'vitest'
import { v4 } from 'uuid'

const SERVER_URL = `http://localhost:${process.env.SERVER_PORT}`

it('should be able to create and retrieve a prompt', async () => {
    const createPromptArgs = {
        content: 'This is a test prompt content',
        userId: 'user123',
    }

    const returnedPromptId = await fetch(`${SERVER_URL}/createPrompt`, {
        method: 'POST',
        body: JSON.stringify(createPromptArgs),
    })
        .then((res) => res.json())
        .then((data) => data.promptId)

    const fetchedPrompt = await fetch(
        `${SERVER_URL}/getPrompt?promptId=${returnedPromptId}`,
        {
            method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((data) => data.prompt)

    expect(returnedPromptId).toBeDefined()
    expect(fetchedPrompt).toBeDefined()
    expect(fetchedPrompt.promptId).toBe(returnedPromptId)
    expect(fetchedPrompt.content).toBe('This is a test prompt content')
    expect(fetchedPrompt.userId).toBe('user123')
    expect(fetchedPrompt.createdAt).toBeDefined()
    expect(fetchedPrompt.updatedAt).toBeDefined()
})

it('should still create a prompt if no userId is provided', async () => {
    const createPromptArgs = {
        content: 'Anonymous prompt content',
    }

    const returnedPromptId = await fetch(`${SERVER_URL}/createPrompt`, {
        method: 'POST',
        body: JSON.stringify(createPromptArgs),
    })
        .then((res) => res.json())
        .then((data) => data.promptId)

    expect(returnedPromptId).toBeDefined()
})

it('should update a prompt', async () => {
    const createPromptArgs = {
        content: 'Original prompt content',
        userId: 'user123',
    }

    const createdPromptId = await fetch(`${SERVER_URL}/createPrompt`, {
        method: 'POST',
        body: JSON.stringify(createPromptArgs),
    })
        .then((response) => response.json())
        .then((data) => data.promptId)

    await fetch(`${SERVER_URL}/updatePrompt`, {
        method: 'POST',
        body: JSON.stringify({
            promptId: createdPromptId,
            updateFields: {
                content: 'Updated prompt content',
            },
        }),
    })

    const updatedPrompt = await fetch(
        `${SERVER_URL}/getPrompt?promptId=${createdPromptId}`,
        {
            method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((data) => data.prompt)

    expect(createdPromptId).toBeDefined()
    expect(updatedPrompt.promptId).toBe(createdPromptId)
    expect(updatedPrompt.content).toBe('Updated prompt content')
    expect(updatedPrompt.userId).toBe('user123')
})

it('should fetch the asked-of amount of prompts for a specific user in descending order', async () => {
    const userId = v4()
    const prompts = [
        {
            content: 'First prompt',
            userId,
        },
        {
            content: 'Second prompt',
            userId,
        },
        {
            content: 'Third prompt',
            userId,
        },
        {
            content: 'Fourth prompt for different user',
            userId: 'differentUser',
        },
    ]

    for (const prompt of prompts) {
        await fetch(`${SERVER_URL}/createPrompt`, {
            method: 'POST',
            body: JSON.stringify(prompt),
        })
    }

    const userPrompts = await fetch(
        `${SERVER_URL}/getUserPrompts?userId=${userId}&count=2`,
        {
            method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((data) => data.prompts)

    expect(userPrompts.length).toEqual(2)
    expect(userPrompts.every((p: any) => p.userId === userId)).toBe(true)
})

it('should delete a prompt', async () => {
    const createPromptArgs = {
        content: 'Prompt to be deleted',
        userId: 'user123',
    }

    const createdPromptId = await fetch(`${SERVER_URL}/createPrompt`, {
        method: 'POST',
        body: JSON.stringify(createPromptArgs),
    })
        .then((response) => response.json())
        .then((data) => data.promptId)

    await fetch(`${SERVER_URL}/deletePrompt`, {
        method: 'DELETE',
        body: JSON.stringify({
            promptId: createdPromptId,
        }),
    })

    const deletedPromptResponse = await fetch(
        `${SERVER_URL}/getPrompt?promptId=${createdPromptId}`,
        {
            method: 'GET',
        },
    )

    expect(deletedPromptResponse.status).toBe(404)
})