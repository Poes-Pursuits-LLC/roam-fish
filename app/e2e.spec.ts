import { test, expect } from '@playwright/test'

test('Visitor flow: Visitor can submit a trip, see its content, then click on a CTA and be directed to the login page', async ({
    page,
}) => {
    await page.goto('/')
    await page.getByTestId('plan-trip-button').click({ timeout: 5000 })

    await expect(page).toHaveURL('/plan-trip')

    await page.waitForSelector('select[name="destinationName"]')
    const options = await page
        .locator('select[name="destinationName"] option')
        .all()
    if (options.length > 1) {
        const firstOptionValue = await options[1].getAttribute('value')
        if (firstOptionValue) {
            await page.selectOption(
                'select[name="destinationName"]',
                firstOptionValue,
            )
        }
    }

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowString = tomorrow.toISOString().split('T')[0]
    await page.fill('input[name="startDate"]', tomorrowString)
    await page.fill('input[name="headcount"]', '2')

    await page.click('button[type="submit"]')

    await expect(
        page.getByRole('heading', { name: 'Trip Details' }),
    ).not.toBeVisible()
    await expect(
        page.getByRole('heading', { name: 'Planning Your Trip...' }),
    ).toBeVisible()

    await page.waitForURL(/\/trip\/[^/]+$/, { timeout: 30000 })

    await expect(page.getByRole('textbox', { name: 'tripName' })).toBeVisible()
    await expect(page.getByText('Location')).toBeVisible()
    await expect(page.getByText('Date')).toBeVisible()
    await expect(page.getByText('Duration')).toBeVisible()
    await expect(page.getByText('Participants')).toBeVisible()
    await expect(page.getByText('Fishing Summary')).toBeVisible()
    await expect(page.getByText('Weather')).toBeVisible()
    await expect(page.getByText('Flies')).toBeVisible()
    await expect(page.getByText('Hatches')).toBeVisible()
    await expect(page.getByText('Notes')).toBeVisible()

    await expect(
        page.getByRole('heading', { name: 'Want to save this trip?' }),
    ).toBeVisible()
    await expect(
        page.getByText(
            'Sign up for free to access our trip management tools and save many more trips!',
        ),
    ).toBeVisible()

    await page.getByRole('link', { name: 'Sign Up Free' }).click()

    await expect(page).toHaveURL('/login')
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
})
