import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
    index('routes/landing.tsx'),
    route('/login', 'routes/login.tsx'),
    route('/terms-of-service', 'routes/terms-of-service.tsx'),
    route('/privacy-policy', 'routes/privacy-policy.tsx'),
    route('/plan-trip', 'routes/plan-trip.tsx'),
    route('/trip/:tripId', 'routes/trip.tsx'),
    route('/dashboard', 'routes/dashboard.tsx'),
    route('/trips', 'routes/trips.tsx'),
    route('/billing', 'routes/billing.tsx'),
    route('/sitemap.xml', 'routes/sitemap.xml.ts'),
] satisfies RouteConfig
