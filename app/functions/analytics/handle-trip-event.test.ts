import { it, expect, vi } from 'vitest'
import { analyticsService } from '~/core/analytics/analytics.service'
import { handleTripEvent } from './handle-trip-event'
import type { DynamoDBRecord } from 'aws-lambda'
import { extractTripData } from './extract-trip-data'
import type { ExtractedTripData } from './extract-trip-data'
import { TripDurationEnum } from '~/core/trip/trip.model'
import { getDaysFromDuration } from './get-days-from-duration'

vi.mock('~/core/analytics/analytics.service', () => ({
    analyticsService: {
        createUserAnalyticsSheet: vi.fn(),
        getUserAnalyticsSheet: vi.fn(),
        updateUserAnalyticsSheet: vi.fn(),
    },
}))
vi.mock('./extract-trip-data')
vi.mock('./get-days-from-duration')

const mockRecord = {} as DynamoDBRecord

it('should short circuit when no userId is present', async () => {
    const emptyTripData: Partial<ExtractedTripData> = {}
    vi.mocked(extractTripData).mockReturnValue(
        emptyTripData as ExtractedTripData,
    )

    const result = await handleTripEvent(mockRecord)

    expect(analyticsService.createUserAnalyticsSheet).not.toHaveBeenCalled()
    expect(analyticsService.updateUserAnalyticsSheet).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
})

it('should create new analytics when user does not exist', async () => {
    const mockTripData: ExtractedTripData = {
        userId: 'user123',
        duration: TripDurationEnum.Weekend,
        destinationName: 'Lake Tahoe',
        totalCost: 500,
        startDate: '2024-03-20',
    }
    vi.mocked(extractTripData).mockReturnValue(mockTripData)
    const mockGetAnalytics = vi
        .mocked(analyticsService.getUserAnalyticsSheet)
        .mockResolvedValue({
            data: null,
        })

    await handleTripEvent(mockRecord)

    expect(mockGetAnalytics).toHaveBeenCalledWith('user123')
    expect(analyticsService.createUserAnalyticsSheet).toHaveBeenCalledWith({
        userId: 'user123',
        totalDaysFishing: 2,
        totalTripCost: 500,
        tripCount: 1,
        uniqueDestinations: ['Lake Tahoe'],
    })
    expect(analyticsService.updateUserAnalyticsSheet).not.toHaveBeenCalled()
})

it('should update existing analytics when user exists', async () => {
    const mockTripData: ExtractedTripData = {
        userId: 'user123',
        duration: TripDurationEnum.Weekend,
        destinationName: 'Lake Tahoe',
        totalCost: 500,
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
    } as unknown as unknown as any
    vi.mocked(extractTripData).mockReturnValue(mockTripData)
    const mockGetAnalytics = vi
        .mocked(analyticsService.getUserAnalyticsSheet)
        .mockResolvedValue({
            data: { ...existingAnalytics },
        })

    await handleTripEvent(mockRecord)

    expect(mockGetAnalytics).toHaveBeenCalledWith('user123')
    expect(analyticsService.updateUserAnalyticsSheet).toHaveBeenCalledWith(
        'user123',
        {
            tripCount: 2,
            totalDaysFishing: 10,
            totalTripCost: 1000,
            uniqueDestinations: ['Previous Lake'],
        },
    )
    expect(analyticsService.createUserAnalyticsSheet).not.toHaveBeenCalled()
})

it('should handle null extractTripData result correctly', async () => {
    vi.mocked(extractTripData).mockReturnValue(null)
    vi.mocked(analyticsService.getUserAnalyticsSheet).mockResolvedValue({
        data: null,
    })

    await handleTripEvent(mockRecord)

    // Should not call createUserAnalyticsSheet because userId will be undefined
    expect(analyticsService.createUserAnalyticsSheet).not.toHaveBeenCalled()
    expect(getDaysFromDuration).not.toHaveBeenCalled()
})

it('should debug daysToAdd calculation', async () => {
    const mockTripData: ExtractedTripData = {
        userId: 'user123',
        duration: TripDurationEnum.Weekend,
        destinationName: 'Lake Tahoe',
        totalCost: 500,
        startDate: '2024-03-20',
    }
    vi.mocked(extractTripData).mockReturnValue(mockTripData)
    vi.mocked(getDaysFromDuration).mockImplementation((duration) => {
        console.log('getDaysFromDuration called with:', duration)
        return 2
    })
    vi.mocked(analyticsService.getUserAnalyticsSheet).mockResolvedValue({
        data: null,
    })

    await handleTripEvent(mockRecord)

    console.log('Mock calls:', {
        extractTripData: vi.mocked(extractTripData).mock.calls,
        getDaysFromDuration: vi.mocked(getDaysFromDuration).mock.calls,
        createUserAnalyticsSheet: vi.mocked(
            analyticsService.createUserAnalyticsSheet,
        ).mock.calls,
    })
})
