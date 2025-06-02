import { Hono } from 'hono'
import { destinationRouter } from './routers/destination.router'

const main = new Hono().route('/', destinationRouter)
export type AppType = typeof main
export { main }
