import { it, expect, vi } from 'vitest'
import { handleTripRecord } from './handle-trip-record'
import { analyticsService } from '~/core/analytics/analytics.service'
import { TripStatusEnum, TripDurationEnum } from '~/core/trip/trip.model'
import type { DynamoDBRecord } from 'aws-lambda'
import { extractTripData } from './extract-trip-data'

vi.mock('~/core/analytics/analytics.service', () => ({
    analyticsService: {
        createUserAnalyticsSheet: vi.fn(),
        getUserAnalyticsSheet: vi.fn(),
        updateUserAnalyticsSheet: vi.fn(),
    },
}))
vi.mock('./extract-trip-data')
const mockAnalyticsService = vi.mocked(analyticsService)
const mockExtractTripData = vi.mocked(extractTripData)

const createMockRecord = (
    oldStatus: TripStatusEnum,
    newStatus: TripStatusEnum,
    userId = 'user123',
    tripId = 'trip123',
): DynamoDBRecord =>
    ({
        eventName: 'MODIFY',
        dynamodb: {
            OldImage: {
                id: { S: tripId },
                userId: { S: userId },
                destinationName: { S: 'Yellowstone' },
                startDate: { S: '2024-06-01' },
                duration: { S: TripDurationEnum.Weekend },
                status: { S: oldStatus },
                budgetList: { L: [] },
            },
            NewImage: {
                id: { S: tripId },
                userId: { S: userId },
                destinationName: { S: 'Yellowstone' },
                startDate: { S: '2024-06-01' },
                duration: { S: TripDurationEnum.Weekend },
                status: { S: newStatus },
                budgetList: { L: [] },
            },
        },
    }) as DynamoDBRecord

it('should count trip when transitioning from Generating to Planned', async () => {
    const record = createMockRecord(
        TripStatusEnum.Generating,
        TripStatusEnum.Planned,
    )

    mockExtractTripData.mockReturnValue({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-06-01',
        duration: TripDurationEnum.Weekend,
        status: TripStatusEnum.Planned,
        oldStatus: TripStatusEnum.Generating,
        netCostChange: 0,
        currentBudgetTotal: 0,
    })

    mockAnalyticsService.getUserAnalyticsSheet.mockResolvedValue({
        userId: 'user123',
        tripCount: 0,
        totalDaysFishing: 0,
        totalTripCost: 0,
        uniqueDestinations: [],
        type: 'userAnalytics',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    })

    await handleTripRecord(record)

    expect(mockAnalyticsService.updateUserAnalyticsSheet).toHaveBeenCalledWith(
        'user123',
        {
            tripCount: 1,
            totalDaysFishing: 2, // Weekend = 2 days
            totalTripCost: 0,
            uniqueDestinations: ['Yellowstone'],
        },
    )
})

it('should NOT count trip when status changes from Planned to Completed', async () => {
    const record = createMockRecord(
        TripStatusEnum.Planned,
        TripStatusEnum.Completed,
    )

    mockExtractTripData.mockReturnValue({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-06-01',
        duration: TripDurationEnum.Weekend,
        status: TripStatusEnum.Completed,
        oldStatus: TripStatusEnum.Planned,
        netCostChange: 0,
        currentBudgetTotal: 0,
    })

    mockAnalyticsService.getUserAnalyticsSheet.mockResolvedValue({
        userId: 'user123',
        tripCount: 1,
        totalDaysFishing: 2,
        totalTripCost: 100,
        uniqueDestinations: ['Yellowstone'],
        type: 'userAnalytics',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    })

    await handleTripRecord(record)

    expect(mockAnalyticsService.updateUserAnalyticsSheet).toHaveBeenCalledWith(
        'user123',
        {
            totalTripCost: 100, // Existing 100 + netCostChange 0 = 100
        },
    )
})

it('should NOT count trip when status changes from Generating to Generating (no change)', async () => {
    const record = createMockRecord(
        TripStatusEnum.Generating,
        TripStatusEnum.Generating,
    )

    mockExtractTripData.mockReturnValue({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-06-01',
        duration: TripDurationEnum.Weekend,
        status: TripStatusEnum.Generating,
        oldStatus: TripStatusEnum.Generating,
        netCostChange: 0,
        currentBudgetTotal: 0,
    })

    mockAnalyticsService.getUserAnalyticsSheet.mockResolvedValue({
        userId: 'user123',
        tripCount: 0,
        totalDaysFishing: 0,
        totalTripCost: 0,
        uniqueDestinations: [],

        type: 'userAnalytics',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    })

    await handleTripRecord(record)

    expect(mockAnalyticsService.updateUserAnalyticsSheet).toHaveBeenCalledWith(
        'user123',
        {
            totalTripCost: 0, // Only cost change, no trip count increment
        },
    )
})

it('should create new analytics sheet for new planned trip', async () => {
    const record = createMockRecord(
        TripStatusEnum.Generating,
        TripStatusEnum.Planned,
    )

    mockExtractTripData.mockReturnValue({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-06-01',
        duration: TripDurationEnum.Weekend,
        status: TripStatusEnum.Planned,
        oldStatus: TripStatusEnum.Generating,
        netCostChange: 0,
        currentBudgetTotal: 0,
    })

    mockAnalyticsService.getUserAnalyticsSheet.mockResolvedValue(null)

    await handleTripRecord(record)

    expect(mockAnalyticsService.createUserAnalyticsSheet).toHaveBeenCalledWith({
        userId: 'user123',
        totalDaysFishing: 2,
        totalTripCost: 0,
        tripCount: 1,
        uniqueDestinations: ['Yellowstone'],
    })
})

it('should NOT create analytics sheet for non-planned trip', async () => {
    const record = createMockRecord(
        TripStatusEnum.Generating,
        TripStatusEnum.Generating,
    )

    mockExtractTripData.mockReturnValue({
        userId: 'user123',
        destinationName: 'Yellowstone',
        startDate: '2024-06-01',
        duration: TripDurationEnum.Weekend,
        status: TripStatusEnum.Generating,
        oldStatus: TripStatusEnum.Generating,
        netCostChange: 0,
        currentBudgetTotal: 0,
    })

    mockAnalyticsService.getUserAnalyticsSheet.mockResolvedValue(null)

    await handleTripRecord(record)

    expect(mockAnalyticsService.createUserAnalyticsSheet).not.toHaveBeenCalled()
})
