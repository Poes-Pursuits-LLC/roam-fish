import { expect, it, vi } from 'vitest'
import { postTripDetails } from './post-trip-details'
import { restClient } from '~/clients/rest.client'

vi.mock('~/clients/rest.client', () => ({
    restClient: {
        post: vi.fn(),
    },
}))

vi.mock('sst', () => ({
    Resource: {
        XAiUrl: { value: 'https://api.xai.com' },
        XAiApiKey: { value: 'test-api-key' },
    },
}))

const inputs = {
    destinationName: 'Yellowstone',
    startDate: '2024-06-01',
    endDate: '2024-06-07',
    headcount: '2',
    duration: 'Weekend',
}
const requestId = 'resp_123456789'

it('should use the rest client to make a post request to the xAi completion endpoint with the included inputs and return the response id', async () => {
    const restClientPostSpy = vi
        .spyOn(restClient, 'post')
        .mockResolvedValue({ request_id: requestId })

    const contentId = await postTripDetails(inputs)

    expect(restClientPostSpy).toHaveBeenCalledWith(
        expect.objectContaining({
            body: expect.objectContaining({
                messages: expect.arrayContaining([
                    expect.objectContaining({
                        content: JSON.stringify(inputs),
                    }),
                ]),
            }),
        }),
    )
    expect(restClientPostSpy).toHaveBeenCalledOnce()
    expect(contentId).toBe(requestId)
})

it('should throw an error if the API call fails', async () => {
    vi.spyOn(restClient, 'post').mockRejectedValue(
        new Error('Internal Server Error'),
    )

    await expect(postTripDetails(inputs)).rejects.toThrow()
})
