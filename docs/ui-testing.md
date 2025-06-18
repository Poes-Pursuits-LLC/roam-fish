### UI Testing

## Headaches

UI testing has been extremely frustrating in this project. React Router 7 has about 100 lines of documentation indicating a createRouteStub method but does little in the way of examples or explanation. Further, it isn't typesafe and has an open issue in their repo regarding this huge deficiency. In short, it's a mess and needs some time.

## What We Will Test

For now then, we will keep tests simple and assert against:

1. conditional logic. It is hard at times to keep track of all that can be rendered throughout the app based on an ever-expanding set of conditionals, so unit tests around these sets serve as documentation and sanity checks that we are still branching according to state appropriately.

2. Key state changes. If something key needs to happen as a result of state change, most likely due to user behavior, then we want to test that. As a random example, if the one way to pay for the app is to click "Pay Now", we'd like to ensure that the billing modal does in fact display.

## Implementation Details

Most tests can be as simple as:

```jsx
<MemoryRouter initialEntries={[/]}>
    <ComponentToRender {...propsBasedOnTest} />
</MemoryRouter>
```

And then asserting some simple facts about conditional render and state changes. Let's save the really robust testing of key business logic for e2e tests.
