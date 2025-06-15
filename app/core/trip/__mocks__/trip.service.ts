// import { vi } from 'vitest'
// import { TripDurationEnum } from '../trip.model'
// import { createDefaultPackingList } from '../helpers/create-default-packing-list'
// import { createDefaultBudgetList } from '../helpers/create-default-budget'
// import { createDefaultCheckList } from '../helpers/create-defaultcheckList'

// const mockData = {
//     contentId: 'contentId',
//     packingList: createDefaultPackingList('2'),
//     budgetList: createDefaultBudgetList('2', TripDurationEnum.Week),
//     checkList: createDefaultCheckList(),
//     flies: ['Leech'],
//     hatches: ['cicadas'],
//     weather: 'Sunny',
//     fishingSummary: 'Do well my son',
//     cities: ['New York', 'Buffalo'],
//     airport: 'JFK',
// }

// export const tripService = {
//     getTrip: vi.fn().mockResolvedValue({
//         tripId: 'mock-trip-id',
//         ...mockData,
//     }),
//     updateTrip: vi.fn().mockResolvedValue(undefined),
//     getUserTrips: vi.fn().mockResolvedValue([
//         {
//             tripId: 'mock-trip-id',
//             ...mockData,
//         },
//     ]),
//     createTrip: vi.fn().mockResolvedValue('mock-trip-id'),
//     getTripDetails: vi.fn().mockResolvedValue({
//         packingList: mockData.packingList,
//         budgetList: mockData.budgetList,
//         checkList: mockData.checkList,
//         flies: mockData.flies,
//         hatches: mockData.hatches,
//         weather: mockData.weather,
//         fishingSummary: mockData.fishingSummary,
//         cities: mockData.cities,
//         airport: mockData.airport,
//     }),
//     submitTripDetails: vi.fn().mockResolvedValue(mockData.contentId),
// }
