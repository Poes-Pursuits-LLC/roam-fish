import { main } from './main'

export const handler = async (event: any) => {
    await main(event)
}
