import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import z from 'zod'
import { analyticsService } from '~/core/analytics/analytics.service'
import { handleAsync } from '~/utils'

const analyticsRouter = new Hono().get(
    '/analytics',
    zValidator(
        'query',
        z.object({
            userId: z.string(),
        }),
    ),
    async (c) => {
        const { userId } = c.req.valid('query')
        console.info('Invoked server.getUserAnalyticsSheet with userId', userId)

        const [userAnalyticsSheet, getUserAnalyticsSheetError] =
            await handleAsync(analyticsService.getUserAnalyticsSheet(userId))
        if (getUserAnalyticsSheetError) {
            throw new HTTPException(500, {
                message: getUserAnalyticsSheetError.message,
            })
        }

        return c.json({
            userAnalyticsSheet: userAnalyticsSheet ?? {},
        })
    },
)

export { analyticsRouter }
