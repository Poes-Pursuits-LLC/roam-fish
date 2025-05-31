import type {} from '../.sst/platform/config'

export const secret = {
    // Web Secrets
    WebUrl: new sst.Secret('WebUrl'),
    // ServerUrl: new sst.Secret('ServerUrl'),
    // ClerkSecret: new sst.Secret('ClerkSecret'),
    // ClerkPublishableKey: new sst.Secret('ClerkPublishableKey'),

}

export const allSecrets = Object.values(secret)
