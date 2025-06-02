import { secret } from './secret'
import { server } from './server'
import { isProduction } from './stage'

new sst.aws.React('Web', {
    environment: {
        SERVER_URL: server.url,
        VITE_CLERK_PUBLISHABLE_KEY: secret.ClerkPublishableKey.value,
        CLERK_SECRET_KEY: secret.ClerkSecretKey.value,
    },
    ...(isProduction && {
        domain: {
            name: 'roam.fish',
            redirects: ['www.roam.fish'],
        },
    }),
})
