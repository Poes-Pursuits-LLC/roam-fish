import type { Trip } from '../trip.model'
import { nanoid } from 'nanoid'

export const createDefaultPackingList = (
    headcount: Trip['headcount'],
): Trip['packingList'] => {
    return [
        {
            id: nanoid(),
            name: 'Fishing Rod & Reel',
            category: 'Fishing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Waders',
            category: 'Fishing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Fishing Vest',
            category: 'Fishing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Fishing License',
            category: 'Essentials',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Sunscreen',
            category: 'Toiletries',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Insect Repellent',
            category: 'Toiletries',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Quick-dry Clothing Set',
            category: 'Clothing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Rain Gear',
            category: 'Clothing',
            quantity: headcount,
        },
    ]
}
