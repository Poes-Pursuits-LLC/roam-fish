import { expect, it, vi } from 'vitest'
import { fetchTripDetails } from './fetch-trip-details'
import { restClient } from '~/clients/rest.client'

vi.mock('~/clients/rest.client', () => ({
    restClient: {
        get: vi.fn(),
    },
}))

vi.mock('sst', () => ({
    Resource: {
        XAiUrl: { value: 'https://api.x.ai' },
        XAiApiKey: { value: 'test-api-key' },
    },
}))

it('should use the rest client to make a GET request to the xAi API to get generated trip details for a specific trip contentId', async () => {
    const contentId = 'contentId'
    const tripDetails = {
        tripDescription: 'tripDescription',
        tripName: 'tripName',
    }
    const get = vi.mocked(restClient.get).mockResolvedValue({
        choices: [
            {
                message: {
                    content: JSON.stringify(tripDetails),
                },
            },
        ],
    })

    const result = await fetchTripDetails(contentId)

    expect(get).toHaveBeenCalledOnce()
    expect(get).toHaveBeenCalledWith(
        expect.objectContaining({
            url: `https://api.x.ai/chat/deferred-completion/${contentId}`,
        }),
    )
    expect(result).toEqual(tripDetails)
})

it('should throw an error if the API call fails', async () => {
    const contentId = 'contentId'
    vi.mocked(restClient.get).mockRejectedValue(
        new Error('Internal Server Error'),
    )

    await expect(fetchTripDetails(contentId)).rejects.toThrow()
})
