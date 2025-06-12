import { expect, it } from 'vitest'
import { createDefaultCheckList } from './create-defaultcheckList'

it('should create a default checklist for a trip', () => {
    const checklist = createDefaultCheckList()

    expect(checklist).toEqual([
        {
            id: '1',
            name: 'Buy plane tickets',
            completed: false,
        },
        {
            id: '2',
            name: 'Buy car rental',
            completed: false,
        },
        {
            id: '3',
            name: 'Buy fishing license',
            completed: false,
        },
        {
            id: '4',
            name: 'Book accommodations',
            completed: false,
        },
        {
            id: '5',
            name: 'Pack',
            completed: false,
        },
    ])
})
