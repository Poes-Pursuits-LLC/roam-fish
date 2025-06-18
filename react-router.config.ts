import type { Config } from '@react-router/dev/config'

export default {
    ssr: true,
    async prerender() {
        return ['/terms-of-service', '/privacy-policy']
    },
} satisfies Config
