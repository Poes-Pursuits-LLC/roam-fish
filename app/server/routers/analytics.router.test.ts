import { describe, expect, it, vi } from 'vitest'
import { analyticsService } from '~/core/analytics/analytics.service'
import { analyticsRouter } from './analytics.router'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'

vi.mock('~/core/analytics/analytics.service.ts', () => ({
    analyticsService: {
        getUserAnalyticsSheet: vi.fn(),
    },
}))

vi.mock('../main', () => ({
    main: new Hono().route('/', analyticsRouter),
}))
import { main } from '../main'
import type { UserAnalytics } from '~/core/analytics/analytics.model'

describe('/getUserAnalyticsSheet', () => {
    it('should successfully retrieve a user analytics sheet', async () => {
        const client = testClient(main)
        const userAnalyticsSheet = {
            userId: 'userId',
            totalDaysFishing: 10,
            uniqueDestinations: ['Yellowstone'],
            totalTripCost: 100,
            tripCount: 10,
        } as unknown as UserAnalytics
        const getUserAnalyticsSheet = vi
            .mocked(analyticsService.getUserAnalyticsSheet)
            .mockResolvedValue(userAnalyticsSheet)

        const response = await client.analytics.$get({
            query: { userId: 'userId' },
        })

        expect(getUserAnalyticsSheet).toHaveBeenCalledOnce()
        expect(await response.json()).toEqual({
            userAnalyticsSheet,
        })
    })

    it('should throw an http exception and return a 500 status code if an error occurs', async () => {
        const client = testClient(main)
        const getUserAnalyticsSheet = vi
            .mocked(analyticsService.getUserAnalyticsSheet)
            .mockRejectedValue(new Error('Error'))

        const response = await client.analytics.$get({
            query: { userId: 'userId' },
        })

        expect(getUserAnalyticsSheet).toHaveBeenCalledOnce()
        expect(response.status).toBe(500)
    })
})
