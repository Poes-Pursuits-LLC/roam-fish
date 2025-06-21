import { TripDurationEnum } from '../trip.model'

export const createDefaultBudgetList = (
    headcount: string,
    tripDuration: TripDurationEnum,
) => {
    const durationToDaysMap = new Map<TripDurationEnum, number>([
        [TripDurationEnum.Weekend, 2],
        [TripDurationEnum.Week, 7],
        [TripDurationEnum.TwoWeeks, 14],
    ])
    const durationInDays = durationToDaysMap.get(tripDuration)

    return [
        {
            id: 'lodging',
            name: 'Lodging',
            price: `${Number(headcount) * 50 * Number(durationInDays)}`,
        },
        {
            id: 'food',
            name: 'Food',
            price: `${Number(headcount) * 40 * Number(durationInDays)}`,
        },
        {
            id: 'transportation',
            name: 'Transportation',
            price: `${Number(headcount) * 50 * Number(durationInDays)}`,
        },
        {
            id: 'activities',
            name: 'Activities',
            price: `${Number(headcount) * 50 * Number(durationInDays)}`,
        },
    ]
}
