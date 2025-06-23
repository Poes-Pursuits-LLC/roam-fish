import { it, expect, vi } from 'vitest'
import { analyticsService } from '~/core/analytics/analytics.service'
import { handleTripRecord } from './handle-trip-record'
import type { DynamoDBRecord } from 'aws-lambda'
import { extractTripData } from './extract-trip-data'
import type { ExtractedTripData } from './extract-trip-data'
import { TripDurationEnum } from '~/core/trip/trip.model'

vi.mock('~/core/analytics/analytics.service', () => ({
    analyticsService: {
        createUserAnalyticsSheet: vi.fn(),
        getUserAnalyticsSheet: vi.fn(),
        updateUserAnalyticsSheet: vi.fn(),
    },
}))
vi.mock('./extract-trip-data')

const mockRecord = {} as DynamoDBRecord

it('should short circuit when no userId is present', async () => {
    const emptyTripData: Partial<ExtractedTripData> = {}
    vi.mocked(extractTripData).mockReturnValue(
        emptyTripData as ExtractedTripData,
    )

    const result = await handleTripRecord(mockRecord)

    expect(analyticsService.createUserAnalyticsSheet).not.toHaveBeenCalled()
    expect(analyticsService.updateUserAnalyticsSheet).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
})

it('should create new analytics when user analytics sheet does not exist', async () => {
    const mockTripData: ExtractedTripData = {
        userId: 'user123',
        duration: TripDurationEnum.Weekend,
        destinationName: 'Lake Tahoe',
        netCostChange: 0,
        currentBudgetTotal: 350,
        startDate: '2024-03-20',
    }
    vi.mocked(extractTripData).mockReturnValue(mockTripData)
    const mockGetAnalytics = vi
        .mocked(analyticsService.getUserAnalyticsSheet)
        .mockResolvedValue(null)

    // Mock the record with budget list data
    const mockRecordWithBudget = {
        dynamodb: {
            NewImage: {
                budgetList: {
                    L: [
                        {
                            M: {
                                id: { S: '1' },
                                name: { S: 'Lodging' },
                                price: { S: '200.00' },
                            },
                        },
                        {
                            M: {
                                id: { S: '2' },
                                name: { S: 'Food' },
                                price: { S: '150.00' },
                            },
                        },
                    ],
                },
            },
        },
    } as DynamoDBRecord

    await handleTripRecord(mockRecordWithBudget)

    expect(mockGetAnalytics).toHaveBeenCalledWith('user123')
    expect(analyticsService.createUserAnalyticsSheet).toHaveBeenCalledWith({
        userId: 'user123',
        totalDaysFishing: 2,
        totalTripCost: 350,
        tripCount: 1,
        uniqueDestinations: ['Lake Tahoe'],
    })
    expect(analyticsService.updateUserAnalyticsSheet).not.toHaveBeenCalled()
})

it('should update existing analytics when user analytics sheet already exists', async () => {
    const mockTripData: ExtractedTripData = {
        userId: 'user123',
        duration: TripDurationEnum.Weekend,
        destinationName: 'Lake Tahoe',
        netCostChange: 500,
        currentBudgetTotal: 350,
        startDate: '2024-03-20',
    }
    const existingAnalytics = {
        userId: 'user123',
        tripCount: 2,
        totalDaysFishing: 10,
        totalTripCost: 1000,
        type: 'type',
        uniqueDestinations: ['Previous Lake'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as unknown as any
    vi.mocked(extractTripData).mockReturnValue(mockTripData)
    const mockGetAnalytics = vi
        .mocked(analyticsService.getUserAnalyticsSheet)
        .mockResolvedValue(existingAnalytics)

    await handleTripRecord(mockRecord)

    expect(mockGetAnalytics).toHaveBeenCalledWith('user123')
    expect(analyticsService.updateUserAnalyticsSheet).toHaveBeenCalledWith(
        'user123',
        {
            tripCount: 3,
            totalDaysFishing: 12,
            totalTripCost: 1500,
            uniqueDestinations: ['Previous Lake', 'Lake Tahoe'],
        },
    )
    expect(analyticsService.createUserAnalyticsSheet).not.toHaveBeenCalled()
})
