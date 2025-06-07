export const secret = {
    ServerUrl: new sst.Secret('ServerUrl'),
    ClerkSecretKey: new sst.Secret('ClerkSecretKey'),
    ClerkPublishableKey: new sst.Secret('ClerkPublishableKey'),
    XAiUrl: new sst.Secret('XAiUrl'),
    XAiApiKey: new sst.Secret('XAiApiKey'),
}

export const allSecrets = Object.values(secret)
