import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { TripPage } from './TripPage'
import { vi } from 'vitest'
import type { Trip } from '~/core/trip/trip.model'
import { TripDurationEnum, TripStatusEnum } from '~/core/trip/trip.model'
import { useState } from 'react'

// TODO: this is a really messy test to implement without mocking individual components, but lets give it another go later.

const mockTripAction = vi.fn()
vi.mock('~/actions/trip.action', () => ({
    tripAction: mockTripAction,
}))

const mockSubmit = vi.fn()
vi.mock('react-router', async () => {
    const { MemoryRouter
    } = await vi.importActual('react-router')
    return {
        MemoryRouter,
        Form: ({
            children,
            method,
            onSubmit,
        }: {
            children: React.ReactNode
            method?: string
            onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
        }) => (
            <form
                data-testid="trip-form"
                method={method}
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    mockSubmit(formData)
                    if (onSubmit) onSubmit(e)
                }}
            >
                {children}
            </form>
        ),
    }
})

vi.mock('../Navbar', () => ({
    Navbar: ({
        userId,
        isSubscriber,
    }: {
        userId: string | null
        isSubscriber: boolean
    }) => (
        <nav data-testid="navbar">
            <span>User: {userId || 'guest'}</span>
            <span>Subscriber: {isSubscriber ? 'yes' : 'no'}</span>
        </nav>
    ),
}))

vi.mock('./TripHeader', () => ({
    TripHeader: ({
        tripName,
        userId,
        canEditTrip,
    }: {
        tripName: string
        userId: string | null
        canEditTrip: boolean
    }) => {
        const [localTripName, setLocalTripName] = useState(tripName)

        return (
            <div data-testid="trip-header">
                <input
                    name="tripName"
                    value={localTripName}
                    onChange={(e) => setLocalTripName(e.target.value)}
                    data-testid="trip-name-input"
                />
                {userId && (
                    <button
                        type="submit"
                        disabled={!canEditTrip}
                        data-testid="save-changes-button"
                    >
                        Save Changes
                    </button>
                )}
            </div>
        )
    },
}))

vi.mock('./Trip.InfoCards', () => ({
    InfoCards: ({
        destinationName,
        date,
        duration,
        participants,
    }: {
        destinationName: string
        date: string
        duration: string
        participants: number
    }) => (
        <div data-testid="info-cards">
            <span>{destinationName}</span>
            <span>{date}</span>
            <span>{duration}</span>
            <span>{participants}</span>
        </div>
    ),
}))

vi.mock('./TravelDetails', () => ({
    TravelDetails: ({
        airport,
        cities,
    }: {
        airport: string
        cities: string[]
    }) => (
        <div data-testid="travel-details">
            <span>{airport}</span>
            <span>{cities?.join(', ')}</span>
        </div>
    ),
}))

vi.mock('./Budget', () => ({
    Budget: ({
        budgetList,
    }: {
        budgetList: Array<{ id: string; name: string; price: string }>
    }) => {
        const [localBudgetList, setLocalBudgetList] = useState(budgetList)

        const handleItemChange = (
            id: string,
            field: 'name' | 'price',
            value: string,
        ) => {
            setLocalBudgetList((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            [field]:
                                field === 'price'
                                    ? value.replace(/[^0-9.]/g, '')
                                    : value,
                        }
                        : item,
                ),
            )
        }

        return (
            <div data-testid="budget">
                <span>Budget: {localBudgetList?.length || 0} items</span>
                {localBudgetList?.map((item) => (
                    <div key={item.id}>
                        <input
                            name={`budget-${item.id}-name`}
                            value={item.name}
                            onChange={(e) =>
                                handleItemChange(
                                    item.id,
                                    'name',
                                    e.target.value,
                                )
                            }
                            data-testid={`budget-name-${item.id}`}
                        />
                        <input
                            name={`budget-${item.id}-price`}
                            value={item.price}
                            onChange={(e) =>
                                handleItemChange(
                                    item.id,
                                    'price',
                                    e.target.value,
                                )
                            }
                            data-testid={`budget-price-${item.id}`}
                        />
                    </div>
                ))}
                <input
                    type="hidden"
                    name="budgetList"
                    value={JSON.stringify(localBudgetList)}
                    data-testid="budget-list-hidden"
                />
            </div>
        )
    },
}))

vi.mock('./PackingList', () => ({
    PackingList: ({
        list,
    }: {
        list: Array<{
            id: string
            category: string
            name: string
            quantity: string
        }>
    }) => {
        const [localPackingList, setLocalPackingList] = useState(list)

        const handleItemChange = (
            id: string,
            field: 'name' | 'quantity',
            value: string,
        ) => {
            setLocalPackingList((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            [field]:
                                field === 'quantity'
                                    ? value.replace(/[^0-9]/g, '')
                                    : value,
                        }
                        : item,
                ),
            )
        }

        return (
            <div data-testid="packing-list">
                <span>Packing: {localPackingList?.length || 0} items</span>
                {localPackingList?.map((item) => (
                    <div key={item.id}>
                        <input
                            name={`packing-${item.id}-name`}
                            value={item.name}
                            onChange={(e) =>
                                handleItemChange(
                                    item.id,
                                    'name',
                                    e.target.value,
                                )
                            }
                            data-testid={`packing-name-${item.id}`}
                        />
                        <input
                            name={`packing-${item.id}-quantity`}
                            value={item.quantity}
                            onChange={(e) =>
                                handleItemChange(
                                    item.id,
                                    'quantity',
                                    e.target.value,
                                )
                            }
                            data-testid={`packing-quantity-${item.id}`}
                        />
                    </div>
                ))}
                <input
                    type="hidden"
                    name="packingList"
                    value={JSON.stringify(localPackingList)}
                    data-testid="packing-list-hidden"
                />
            </div>
        )
    },
}))

vi.mock('./Checklist', () => ({
    Checklist: ({
        checkList,
    }: {
        checkList: Array<{ id: string; name: string; completed: boolean }>
    }) => {
        const [items, setItems] = useState(checkList)

        const toggleItem = (id: string) => {
            setItems(
                items.map((item) =>
                    item.id === id
                        ? { ...item, completed: !item.completed }
                        : item,
                ),
            )
        }

        const handleItemChange = (id: string, value: string) => {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, name: value } : item,
                ),
            )
        }

        return (
            <div data-testid="checklist">
                <span>Checklist: {items?.length || 0} items</span>
                {items?.map((item) => (
                    <div key={item.id}>
                        <input
                            name={`checklist-${item.id}-name`}
                            value={item.name}
                            onChange={(e) =>
                                handleItemChange(item.id, e.target.value)
                            }
                            data-testid={`checklist-name-${item.id}`}
                        />
                        <input
                            type="checkbox"
                            name={`checklist-${item.id}-completed`}
                            checked={item.completed}
                            onChange={() => toggleItem(item.id)}
                            data-testid={`checklist-completed-${item.id}`}
                        />
                    </div>
                ))}
                <input
                    type="hidden"
                    name="checkList"
                    value={JSON.stringify(items)}
                    data-testid="checklist-hidden"
                />
            </div>
        )
    },
}))

vi.mock('./Tactics', () => ({
    Tactics: ({
        fishingSummary,
        weather,
        flies,
        hatches,
    }: {
        fishingSummary: string
        weather: string
        flies: string
        hatches: string
    }) => (
        <div data-testid="tactics">
            <span>{fishingSummary}</span>
            <span>{weather}</span>
            <span>{flies}</span>
            <span>{hatches}</span>
        </div>
    ),
}))

vi.mock('./Notes', () => ({
    Notes: ({ notes }: { notes: string }) => {
        const [localNotes, setLocalNotes] = useState(notes)

        return (
            <div data-testid="notes">
                <textarea
                    name="notes"
                    value={localNotes}
                    onChange={(e) => setLocalNotes(e.target.value)}
                    data-testid="notes-textarea"
                />
                <input
                    type="hidden"
                    name="notes"
                    value={localNotes}
                    data-testid="notes-hidden"
                />
            </div>
        )
    },
}))

const createMockTrip = (overrides: Partial<Trip> = {}): Trip => ({
    tripId: 'test-trip-1',
    name: 'Test Fishing Trip',
    destinationName: 'Yellowstone',
    startDate: '2024-06-01',
    duration: TripDurationEnum.Weekend,
    headcount: '2',
    airport: 'BZN',
    cities: ['Bozeman', 'West Yellowstone'],
    budgetList: [{ id: '1', name: 'Hotel', price: '200' }],
    packingList: [
        { id: '1', category: 'Clothing', name: 'Waders', quantity: '1' },
    ],
    checkList: [{ id: '1', name: 'Book flights', completed: false }],
    fishingSummary: 'Great trout fishing',
    weather: 'Sunny, 70°F',
    flies: ['Adams', 'Elk Hair Caddis'],
    hatches: ['Mayfly hatch at dusk'],
    notes: 'Bring extra leaders',
    status: TripStatusEnum.Planned,
    contentId: 'content-123',
    type: 'fishing',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    ...overrides,
})

const defaultLoaderData = {
    trip: createMockTrip(),
    userId: 'user-123',
    isSubscriber: false,
}

beforeEach(() => {
    vi.clearAllMocks()
})

it('should fill out all form inputs and submit with updated data', async () => {
    render(
        <MemoryRouter>
            <TripPage loaderData={defaultLoaderData} />
        </MemoryRouter>,
    )

    const tripNameInput = screen.getByTestId('trip-name-input')
    fireEvent.change(tripNameInput, {
        target: { value: 'Updated Fishing Trip' },
    })

    const budgetNameInput = screen.getByTestId('budget-name-1')
    const budgetPriceInput = screen.getByTestId('budget-price-1')
    fireEvent.change(budgetNameInput, { target: { value: 'Updated Hotel' } })
    fireEvent.change(budgetPriceInput, { target: { value: '250' } })

    const packingNameInput = screen.getByTestId('packing-name-1')
    const packingQuantityInput = screen.getByTestId('packing-quantity-1')
    fireEvent.change(packingNameInput, { target: { value: 'Updated Waders' } })
    fireEvent.change(packingQuantityInput, { target: { value: '2' } })

    const checklistNameInput = screen.getByTestId('checklist-name-1')
    const checklistCompletedInput = screen.getByTestId('checklist-completed-1')
    fireEvent.change(checklistNameInput, {
        target: { value: 'Updated Book flights' },
    })
    fireEvent.click(checklistCompletedInput)

    const notesTextarea = screen.getByTestId('notes-textarea')
    fireEvent.change(notesTextarea, {
        target: { value: 'Updated notes with more details' },
    })

    const saveButton = screen.getByTestId('save-changes-button')
    fireEvent.click(saveButton)

    await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1)
    })

    const submittedFormData = mockSubmit.mock.calls[0][0]

    expect(submittedFormData.get('tripName')).toBe('Updated Fishing Trip')
    expect(submittedFormData.get('notes')).toBe(
        'Updated notes with more details',
    )

    const budgetListJson = submittedFormData.get('budgetList')
    const budgetList = JSON.parse(budgetListJson)
    expect(budgetList).toEqual([
        { id: '1', name: 'Updated Hotel', price: '250' },
    ])

    const checkListJson = submittedFormData.get('checkList')
    const checkList = JSON.parse(checkListJson)
    expect(checkList).toEqual([
        { id: '1', name: 'Updated Book flights', completed: true },
    ])

    const packingListJson = submittedFormData.get('packingList')
    const packingList = JSON.parse(packingListJson)
    expect(packingList).toEqual([
        {
            id: '1',
            category: 'Clothing',
            name: 'Updated Waders',
            quantity: '2',
        },
    ])

    expect(submittedFormData.get('budget-1-name')).toBe('Updated Hotel')
    expect(submittedFormData.get('budget-1-price')).toBe('250')
    expect(submittedFormData.get('packing-1-name')).toBe('Updated Waders')
    expect(submittedFormData.get('packing-1-quantity')).toBe('2')
    expect(submittedFormData.get('checklist-1-name')).toBe(
        'Updated Book flights',
    )
    expect(submittedFormData.get('checklist-1-completed')).toBe('on')
})

test('should submit the loaded trip data for all fields that are not changed alongside those that are', async () => {
    render(
        <MemoryRouter>
            <TripPage loaderData={defaultLoaderData} />
        </MemoryRouter>,
    )

    const tripNameInput = screen.getByTestId('trip-name-input')
    fireEvent.change(tripNameInput, {
        target: { value: 'Updated Fishing Trip' },
    })

    const saveButton = screen.getByTestId('save-changes-button')
    fireEvent.click(saveButton)

    await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1)
    })

    const submittedFormData = mockSubmit.mock.calls[0][0]

    expect(submittedFormData.get('tripName')).toBe('Updated Fishing Trip')
    expect(submittedFormData.get('notes')).toBe(defaultLoaderData.trip.notes)
    expect(submittedFormData.get('budgetList')).toBe(
        JSON.stringify(defaultLoaderData.trip.budgetList),
    )
    expect(submittedFormData.get('checkList')).toBe(
        JSON.stringify(defaultLoaderData.trip.checkList),
    )
    expect(submittedFormData.get('packingList')).toBe(
        JSON.stringify(defaultLoaderData.trip.packingList),
    )
})
