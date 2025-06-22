import { dashboardAction } from '~/actions/dashboard-action'
import type { Route } from './+types/dashboard'
import { dashboardLoader } from '~/loaders/dashboard.loader'
import { DashboardPage } from '~/ui/dashboard/DashboardPage'

export async function loader(args: Route.LoaderArgs) {
    return await dashboardLoader(args)
}

export async function action(args: Route.ActionArgs) {
    return await dashboardAction(args)
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
    return <DashboardPage {...loaderData} />
}
