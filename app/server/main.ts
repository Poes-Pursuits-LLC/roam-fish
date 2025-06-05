import { Hono } from 'hono'
import { destinationRouter } from './routers/destination.router'
import { tripRouter } from './routers/trip.router'

const main = new Hono().route('/', destinationRouter).route('/', tripRouter)
export type AppType = typeof main

export { main }
