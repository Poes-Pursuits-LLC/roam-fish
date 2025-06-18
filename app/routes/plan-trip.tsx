import { planTripLoader } from '~/loaders/plan-trip.loader'
import { planTripAction } from '~/actions/plan-trip.action'
import type { Route } from './+types/plan-trip'
import { PlanTripPage } from '~/ui/plan-trip/PlanTripPage'

export async function loader(args: Route.LoaderArgs) {
    return await planTripLoader(args)
}

export async function action(args: Route.ActionArgs) {
    return await planTripAction(args)
}

export default function PlanTrip({
    loaderData,
    actionData,
}: Route.ComponentProps) {
    return <PlanTripPage loaderData={loaderData} actionData={actionData} />
}
