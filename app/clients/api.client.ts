import { hc } from 'hono/client'
import type { AppType } from '~/server/main'

let apiClient: ReturnType<typeof hc<AppType>> | undefined

export const getApiClient = () => {
    if (apiClient) {
        apiClient = hc<AppType>(process.env.SERVER_URL!)
    }
    return apiClient
}
