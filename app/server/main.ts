import { Hono } from 'hono'
import { destinationRouter } from './routers/destination.router'
import { tripRouter } from './routers/trip.router'
import { analyticsRouter } from './routers/analytics.router'

const main = new Hono()
    .route('/', destinationRouter)
    .route('/', tripRouter)
    .route('/', analyticsRouter)
export type AppType = typeof main

export { main }
