import { test } from 'magnitude-test'

test(
    'A visitor can create a trip, view it once it is done generating, and then click a CTA to go to the Login page',
    { url: process.env.MAGNITUDE_TEST_URL },
    async ({ ai }) => {
        await ai.step(
            'Navigate to the Plan Trip page using the PLAN TRIP button in the navbar.',
        )

        await ai.step(
            'Fill out the first three inputs of the form with valid values',
        )

        await ai.step('Submit the form and wait several seconds')
        await ai.check(
            'Should no longer see the form but should see a progress bar.',
        )
        await ai.step(
            'Wait for the progress bar to complete and to be redirected to next page.',
            {
                data: 'wait for the progress bar to fill up, which can take up to 20 seconds',
            },
        )

        await ai.check(
            'Basic trip details are visible as well as a call-to-action to sign up.',
        )
        await ai.step('Click the SIGN UP FREE button.')
        await ai.check('Login modal is visible.')
    },
)
