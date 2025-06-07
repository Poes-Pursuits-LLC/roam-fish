import type { Trip } from '../trip.model'
import { nanoid } from 'nanoid'

export const createDefaultPackingList = (
    headcount: Trip['headcount'],
): Trip['packingList'] => {
    const headcountNum = Number(headcount)

    return [
        // Fishing Gear
        {
            id: nanoid(),
            name: 'Waders',
            category: 'Fishing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Fishing Pack / Vest',
            category: 'Fishing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Fly Box with Assorted Flies',
            category: 'Fishing',
            quantity: String(Math.ceil(headcountNum * 2)),
        },
        {
            id: nanoid(),
            name: 'Fishing Net',
            category: 'Fishing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Clippers',
            category: 'Fishing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Pliers',
            category: 'Fishing',
            quantity: String(Math.ceil(headcountNum / 2)),
        },

        // Essentials
        {
            id: nanoid(),
            name: 'Fishing License',
            category: 'Essentials',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Headlamp/Flashlight',
            category: 'Essentials',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Multi-tool',
            category: 'Essentials',
            quantity: String(Math.ceil(headcountNum / 2)),
        },

        // Toiletries
        {
            id: nanoid(),
            name: 'Sunscreen (SPF 50+)',
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
            name: 'Lip Balm with SPF',
            category: 'Toiletries',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Hand Sanitizer',
            category: 'Toiletries',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Toilet Paper',
            category: 'Toiletries',
            quantity: String(Math.ceil(headcountNum / 2)),
        },
        {
            id: nanoid(),
            name: 'Biodegradable Soap',
            category: 'Toiletries',
            quantity: String(Math.ceil(headcountNum / 2)),
        },
        {
            id: nanoid(),
            name: 'Toothbrush & Toothpaste',
            category: 'Toiletries',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Personal Medications',
            category: 'Toiletries',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Eye Drops',
            category: 'Toiletries',
            quantity: String(Math.ceil(headcountNum / 2)),
        },
        {
            id: nanoid(),
            name: 'Wet Wipes',
            category: 'Toiletries',
            quantity: headcount,
        },

        // Clothing
        {
            id: nanoid(),
            name: 'Quick-dry Clothing Set',
            category: 'Clothing',
            quantity: String(headcountNum * 2),
        },
        {
            id: nanoid(),
            name: 'Rain Gear',
            category: 'Clothing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Warm Base Layer',
            category: 'Clothing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Fishing Hat with Neck Cover',
            category: 'Clothing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Polarized Sunglasses',
            category: 'Clothing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Waterproof Boots',
            category: 'Clothing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Wool Socks',
            category: 'Clothing',
            quantity: String(headcountNum * 2),
        },
        {
            id: nanoid(),
            name: 'Gloves (for cold weather)',
            category: 'Clothing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Swimsuit',
            category: 'Clothing',
            quantity: headcount,
        },
        {
            id: nanoid(),
            name: 'Buff/Neck Gaiter',
            category: 'Clothing',
            quantity: headcount,
        },
    ]
}
