import type {} from '../.sst/platform/config'

export const secret = {
    ServerUrl: new sst.Secret('ServerUrl'),
    ClerkSecretKey: new sst.Secret('ClerkSecretKey'),
    ClerkPublishableKey: new sst.Secret('ClerkPublishableKey'),
}

export const allSecrets = Object.values(secret)
