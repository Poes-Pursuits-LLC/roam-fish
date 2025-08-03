import { Hono } from 'hono'

import { destinationRouter } from './routers/destination.router'
import { tripRouter } from './routers/trip.router'
import { analyticsRouter } from './routers/analytics.router'
import { promptRouter } from './routers/prompt.router'

const main = new Hono()
    .route('/', destinationRouter)
    .route('/', tripRouter)
    .route('/', analyticsRouter)
    .route('/', promptRouter)
export type AppType = typeof main

export { main }
