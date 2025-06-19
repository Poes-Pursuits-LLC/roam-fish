import type { Route } from './+types/trip'
import { tripLoader } from '~/loaders/trip.loader'
import { tripAction } from '~/actions/trip.action'
import { TripPage } from '~/ui/trip/TripPage'

export async function loader(args: Route.LoaderArgs) {
    return await tripLoader(args)
}

export async function action(args: Route.ActionArgs) {
    await tripAction(args)
}

export default function TripRoute({ loaderData }: Route.ComponentProps) {
    return <TripPage loaderData={loaderData} />
}
