import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
    index('routes/landing.tsx'),
    route('/login', 'routes/login.tsx'),
    route('/plan-trip', 'routes/plan-trip.tsx'),
    route('/trip/:tripId', 'routes/trip.tsx'),
    route('/dashboard', 'routes/dashboard.tsx'),
] satisfies RouteConfig
