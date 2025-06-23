import type { Route } from './+types/landing'
import { landingLoader } from '../loaders/landing.loader'
import { LandingPage } from '~/ui/landing/LandingPage'

export function meta() {
    return [
        { title: 'Roam.Fish' },
        {
            name: 'description',
            content: 'The simplest fishing planner on the internet',
        },
    ]
}

export async function loader(args: Route.LoaderArgs) {
    return await landingLoader(args)
}

export default function Landing({ loaderData }: Route.ComponentProps) {
    return <LandingPage {...loaderData} />
}
