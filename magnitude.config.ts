import { type MagnitudeConfig } from 'magnitude-test'
import { Resource } from 'sst'

// Learn more about configuring Magnitude:
// https://docs.magnitude.run/customizing/configuration

process.env.MOONDREAM_API_KEY = Resource.MoondreamApiKey.value

export default {
    url: 'http://localhost:5173',
    planner: {
        provider: 'openai-generic',
        options: {
            baseUrl: Resource.XAiUrl.value,
            apiKey: Resource.XAiApiKey.value,
            model: 'grok-3',
        },
    },
} satisfies MagnitudeConfig
