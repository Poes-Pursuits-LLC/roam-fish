// import { expect, it } from 'vitest'
// import Navbar from './Navbar'

// it('renders login link when user Id is null', async ({ renderStub }) => {
//     const routeProps = {
//         Component: Navbar,
//         loaderData: {
//             userId: null,
//             isSubscriber: null,
//             getDestinationsPromise: Promise.resolve([]),
//         },
//     }

//     const { getByText } = await renderStub({
//         Component: Navbar,
//         props: routeProps,
//     })

//     expect(getByText('Roam.fish')).toBeInTheDocument()
// })

// // it('renders dashboard link and user button when userId is provided', () => {
// //     render(
// //         <BrowserRouter>
// //             <Navbar userId="user123" isSubscriber={false} />
// //         </BrowserRouter>,
// //     )
// //     expect(screen.getByText('Dashboard')).toBeInTheDocument()
// //     expect(screen.getByRole('button', { name: /user/i })).toBeInTheDocument()
// // })

// // it('renders promotional banner when userId is provided and isSubscriber is false', () => {
// //     render(
// //         <BrowserRouter>
// //             <Navbar userId="user123" isSubscriber={false} />
// //         </BrowserRouter>,
// //     )
// //     expect(screen.getByText(/Unlock Premium Features/i)).toBeInTheDocument()
// // })
