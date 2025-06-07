import { describe, it, expect } from 'vitest'
import { createDefaultPackingList } from './create-default-packing-list'

describe('createDefaultPackingList', () => {
    it('should create a packing list with correct number of items', () => {
        const list = createDefaultPackingList('2')
        expect(list).toHaveLength(29)
    })

    it('should create items in correct categories', () => {
        const list = createDefaultPackingList('2')
        const categories = new Set(list.map((item) => item.category))
        expect(categories).toEqual(
            new Set(['Fishing', 'Essentials', 'Toiletries', 'Clothing']),
        )
    })

    it('should have correct number of items per category', () => {
        const list = createDefaultPackingList('2')
        const categoryCounts = list.reduce(
            (acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + 1
                return acc
            },
            {} as Record<string, number>,
        )

        expect(categoryCounts['Fishing']).toBe(6)
        expect(categoryCounts['Essentials']).toBe(3)
        expect(categoryCounts['Toiletries']).toBe(10)
        expect(categoryCounts['Clothing']).toBe(10)
    })

    it('should handle different headcounts correctly', () => {
        const list1 = createDefaultPackingList('1')
        const list2 = createDefaultPackingList('4')

        // Test individual items
        const getItem = (
            list: ReturnType<typeof createDefaultPackingList>,
            name: string,
        ) => list.find((item) => item.name === name)

        // Test personal items (should match headcount)
        expect(getItem(list1, 'Waders')?.quantity).toBe('1')
        expect(getItem(list2, 'Waders')?.quantity).toBe('4')

        // Test shared items (should be divided)
        expect(getItem(list1, 'Pliers')?.quantity).toBe('1')
        expect(getItem(list2, 'Pliers')?.quantity).toBe('2') // One per two people

        // Test multiple items per person
        expect(getItem(list1, 'Quick-dry Clothing Set')?.quantity).toBe('2')
        expect(getItem(list2, 'Quick-dry Clothing Set')?.quantity).toBe('8')
    })

    it('should generate unique IDs for each item', () => {
        const list = createDefaultPackingList('2')
        const ids = new Set(list.map((item) => item.id))
        expect(ids.size).toBe(list.length) // Each ID should be unique
    })

    it('should have correct quantity types', () => {
        const list = createDefaultPackingList('2')
        list.forEach((item) => {
            expect(typeof item.quantity).toBe('string')
            expect(Number(item.quantity)).not.toBeNaN()
        })
    })

    it('should have specific required items', () => {
        const list = createDefaultPackingList('2')
        const itemNames = list.map((item) => item.name)

        // Test for essential fishing items
        expect(itemNames).toContain('Waders')
        expect(itemNames).toContain('Fishing Pack / Vest')
        expect(itemNames).toContain('Fly Box with Assorted Flies')

        // Test for essential safety items
        expect(itemNames).toContain('Headlamp/Flashlight')
        expect(itemNames).toContain('Multi-tool')

        // Test for essential clothing
        expect(itemNames).toContain('Rain Gear')
        expect(itemNames).toContain('Quick-dry Clothing Set')
    })

    it('should calculate shared items correctly', () => {
        const testCases = [
            { headcount: '1', expectedPliers: '1' },
            { headcount: '2', expectedPliers: '1' },
            { headcount: '3', expectedPliers: '2' },
            { headcount: '4', expectedPliers: '2' },
            { headcount: '5', expectedPliers: '3' },
        ]

        testCases.forEach(({ headcount, expectedPliers }) => {
            const list = createDefaultPackingList(headcount)
            const pliers = list.find((item) => item.name === 'Pliers')
            expect(pliers?.quantity).toBe(expectedPliers)
        })
    })
})
