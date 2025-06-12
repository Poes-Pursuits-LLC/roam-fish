import { expect, it } from 'vitest'
import { createDefaultBudgetList } from './create-default-budget'
import { TripDurationEnum } from '../trip.model'

it('should create a default budget list for a trip', () => {
    const headcount = '4'
    const tripDuration = TripDurationEnum.Weekend
    const budgetList = createDefaultBudgetList(headcount, tripDuration)

    expect(budgetList).toEqual([
        {
            id: 'lodging',
            name: 'Lodging',
            price: '800',
        },
        {
            id: 'food',
            name: 'Food',
            price: '800',
        },
        {
            id: 'transportation',
            name: 'Transportation',
            price: '800',
        },
        {
            id: 'activities',
            name: 'Activities',
            price: '800',
        },
        {
            id: 'other',
            name: 'Other',
            price: '800',
        },
    ])
})
