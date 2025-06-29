import type {} from '../.sst/platform/config'

export const secret = {
    ServerUrl: new sst.Secret('ServerUrl'),
    ClerkSecretKey: new sst.Secret('ClerkSecretKey'),
    ClerkPublishableKey: new sst.Secret('ClerkPublishableKey'),
    ClerkWebhookSecret: new sst.Secret('ClerkWebhookSecret'),
    XAiUrl: new sst.Secret('XAiUrl'),
    XAiApiKey: new sst.Secret('XAiApiKey'),
    ResendApiKey: new sst.Secret('ResendApiKey'),
    Environment: new sst.Secret('Environment'),
}

export const allSecrets = Object.values(secret)
