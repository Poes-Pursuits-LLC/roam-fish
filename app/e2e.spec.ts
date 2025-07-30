import { test, expect } from '@playwright/test'

test('Visitor flow: Visitor can submit a trip, see its content, then click on a CTA and be directed to the login page', async ({
    page,
}) => {
    await page.goto('/')
    await page.getByTestId('plan-trip-button').click()

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

    await page.waitForURL(/\/trip\/[^/]+$/, { timeout: 45000 })

    await expect(page.getByTestId('trip-name-input')).toBeVisible()
    await expect(page.getByText('Location')).toBeVisible()
    await expect(page.getByText('Date')).toBeVisible()
    await expect(page.getByText('Duration')).toBeVisible()
    await expect(page.getByText('Participants')).toBeVisible()

    await expect(page.getByRole('heading', { name: 'Budget' })).toBeVisible()
    const budgetItems = page.locator('input[name^="budget-"][name$="-name"]')
    await expect(budgetItems.first()).toBeVisible()
    const budgetItemCount = await budgetItems.count()
    expect(budgetItemCount).toBeGreaterThan(0)

    await expect(
        page.getByRole('heading', { name: 'Packing List' }),
    ).toBeVisible()

    const packingItems = page.locator('input[placeholder="Item name"]')
    await expect(packingItems.first()).toBeVisible()
    const packingItemCount = await packingItems.count()
    expect(packingItemCount).toBeGreaterThan(0)

    await expect(page.getByRole('heading', { name: 'Checklist' })).toBeVisible()
    const checklistItems = page.locator(
        'input[placeholder="Add checklist item..."]',
    )
    await expect(checklistItems.first()).toBeVisible()
    const checklistItemCount = await checklistItems.count()
    expect(checklistItemCount).toBeGreaterThan(0)

    await expect(page.getByRole('heading', { name: 'WEATHER' })).toBeVisible()
    await expect(
        page.getByRole('heading', { name: 'RECOMMENDED FLIES' }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'HATCHES' })).toBeVisible()

    await page.getByRole('link', { name: 'Sign Up Free' }).nth(0).click()

    await expect(page).toHaveURL('/login')
    await expect(
        page.getByRole('heading', { name: 'CONTINUE TO ROAM.FISH' }),
    ).toBeVisible()
})
