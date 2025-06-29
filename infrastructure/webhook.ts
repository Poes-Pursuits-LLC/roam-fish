import { allSecrets } from './secret'

const clerkWebhook = new sst.aws.Function('ClerkWebhook', {
    handler: 'app/functions/webhook/clerk/index.handler',
    link: [...allSecrets],
    url: true,
})

export const outputs = {
    url: clerkWebhook.url,
}
