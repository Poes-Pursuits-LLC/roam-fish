import { hc } from "hono/client";
import type { Route } from "../routes/+types/dashboard";
import type { AppType } from "~/server/main";

export const dashboardAction = async (args: Route.ActionArgs) => {
    const formData = await args.request.formData()
    const tripId = String(formData.get('tripId'))
    const userId = String(formData.get('userId'))

    const client = hc<AppType>(process.env.SERVER_URL!)

    await client.updateTrip.$post({
        json: {
            tripId,
            updateFields: {
                userId,
            }
        }
    })
}