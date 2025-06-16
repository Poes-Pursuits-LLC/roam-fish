// import './app.css'
// import { render, renderHook as renderReactHook } from '@testing-library/react'
// import {
//     Outlet,
//     type RoutesTestStubProps,
//     createRoutesStub,
// } from 'react-router'
// import { afterEach, beforeEach, vi } from 'vitest'
// export type StubRouteEntry = Parameters<typeof createRoutesStub>[0][0]

// const renderStub = async (args?: {
//     props?: RoutesTestStubProps
//     entries?: StubRouteEntry[]
// }) => {
//     const entries: StubRouteEntry[] = [
//         {
//             id: 'root',
//             path: '/',
//             children: args?.entries ?? [],
//             Component: () => (
//                 <div data-testid="root">
//                     <Outlet />
//                 </div>
//             ),
//         },
//     ]

//     const props: RoutesTestStubProps = {
//         ...args?.props,
//         initialEntries: args?.props?.initialEntries ?? ['/'],
//     }

//     const Stub = createRoutesStub(entries)
//     const renderedRoute = render(<Stub {...props} />)
//     return renderedRoute
// }

// const renderHook = renderReactHook

// declare module 'vitest' {
//     export interface TestContext {
//         renderStub: typeof renderStub
//         renderHook: typeof renderHook
//     }
// }

// beforeEach((ctx) => {
//     ctx.renderStub = renderStub
//     ctx.renderHook = renderHook
// })

// afterEach(() => {
//     vi.clearAllMocks()
// })
