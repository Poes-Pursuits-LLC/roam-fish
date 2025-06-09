import { main } from './main'

export const handler = async (event: unknown) => {
    await main(event)
}
