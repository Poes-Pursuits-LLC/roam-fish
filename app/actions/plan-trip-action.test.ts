import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { planTripAction } from './plan-trip-action'
import type { Route } from '../routes/+types/plan-trip'
import { createClerkClient } from '@clerk/backend'
import { hc } from 'hono/client'
import { getAuth } from '@clerk/react-router/ssr.server'
import { TripDurationEnum, FishingStyleEnum } from '~/core/trip/trip.model'

vi.mock('@clerk/react-router/ssr.server', () => ({
    getAuth: vi.fn(),
}))
const mockedGetAuth = vi.mocked(getAuth)

vi.mock('@clerk/backend', () => ({
    createClerkClient: vi.fn(),
}))
const mockedCreateClerkClient = vi.mocked(createClerkClient)

vi.mock('hono/client', () => ({
    hc: vi.fn(),
}))
const mockedHc = vi.mocked(hc)

const originalEnv = { ...process.env }
const serverUrl = 'http://test.server'
const clerkSecretKey = 'test-secret'

const createMockActionArgs = (
    data: Record<string, string>,
): Route.ActionArgs => {
    const formData = new FormData()
    for (const key in data) {
        formData.append(key, data[key])
    }
    const request = {
        formData: vi.fn().mockResolvedValue(formData),
    } as unknown as Request
    return { request, context: {} } as unknown as Route.ActionArgs
}

beforeEach(() => {
    process.env.SERVER_URL = serverUrl
    process.env.CLERK_SECRET_KEY = clerkSecretKey
    vi.clearAllMocks()
})

afterEach(() => {
    process.env = originalEnv
})

it('should create a trip and update user metadata for an authenticated user who is not a subscriber', async () => {
    const userId = 'user-123'
    const tripId = 'trip-456'
    const freeTripCount = 5
    mockedGetAuth.mockResolvedValue({
        userId,
        has: vi.fn().mockReturnValue(false),
    } as unknown as Awaited<ReturnType<typeof getAuth>>)
    const actionArgs = createMockActionArgs({
        destinationName: 'Paris',
        startDate: '2025-01-01',
        headcount: '2',
        duration: 'DAYS_3_5',
        fishingStyle: FishingStyleEnum.FlyFishing,
        userId,
    })

    const postMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ tripId }),
    })
    mockedHc.mockReturnValue({
        createTrip: {
            $post: postMock,
        },
    } as unknown as ReturnType<typeof hc>)

    const getUserMock = vi.fn().mockResolvedValue({
        privateMetadata: { freeTripCount },
    })
    const updateUserMetadataMock = vi.fn().mockResolvedValue({})
    mockedCreateClerkClient.mockReturnValue({
        users: {
            getUser: getUserMock,
            updateUserMetadata: updateUserMetadataMock,
        },
    } as unknown as ReturnType<typeof createClerkClient>)

    const result = await planTripAction(actionArgs)

    expect(actionArgs.request.formData).toHaveBeenCalled()
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(postMock).toHaveBeenCalledWith({
        json: {
            destinationName: 'Paris',
            startDate: '2025-01-01',
            headcount: '2',
            duration: 'DAYS_3_5',
            fishingStyle: FishingStyleEnum.FlyFishing,
            userId,
        },
    })
    expect(mockedCreateClerkClient).toHaveBeenCalledWith({
        secretKey: clerkSecretKey,
    })
    expect(getUserMock).toHaveBeenCalledWith(userId)
    expect(updateUserMetadataMock).toHaveBeenCalledWith(userId, {
        privateMetadata: { freeTripCount: freeTripCount + 1 },
    })
    expect(result).toEqual({ tripId })
})

it('should create a trip and initialize freeTripCount for a user without it who is not a subscriber', async () => {
    const userId = 'user-789'
    const tripId = 'trip-101'
    mockedGetAuth.mockResolvedValue({
        userId,
        has: vi.fn().mockReturnValue(false),
    } as unknown as Awaited<ReturnType<typeof getAuth>>)
    const actionArgs = createMockActionArgs({
        destinationName: 'Tokyo',
        startDate: '2025-06-15',
        headcount: '1',
        duration: 'WEEK_1',
        fishingStyle: FishingStyleEnum.SpinFishing,
        userId,
    })

    const postMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ tripId }),
    })
    mockedHc.mockReturnValue({
        createTrip: {
            $post: postMock,
        },
    } as unknown as ReturnType<typeof hc>)

    const getUserMock = vi.fn().mockResolvedValue({
        privateMetadata: {},
    })
    const updateUserMetadataMock = vi.fn().mockResolvedValue({})
    mockedCreateClerkClient.mockReturnValue({
        users: {
            getUser: getUserMock,
            updateUserMetadata: updateUserMetadataMock,
        },
    } as unknown as ReturnType<typeof createClerkClient>)

    const result = await planTripAction(actionArgs)

    expect(result).toEqual({ tripId })
    expect(updateUserMetadataMock).toHaveBeenCalledWith(userId, {
        privateMetadata: { freeTripCount: 1 },
    })
})

it('should create a trip but not update metadata for an authenticated user who is a subscriber', async () => {
    const userId = 'subscriber-123'
    const tripId = 'trip-subscriber-456'
    mockedGetAuth.mockResolvedValue({
        userId,
        has: vi.fn().mockReturnValue(true),
    } as unknown as Awaited<ReturnType<typeof getAuth>>)
    const actionArgs = createMockActionArgs({
        destinationName: 'London',
        startDate: '2025-08-01',
        headcount: '4',
        duration: TripDurationEnum.Weekend,
        fishingStyle: FishingStyleEnum.FlyFishing,
        userId,
    })

    const postMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ tripId }),
    })
    mockedHc.mockReturnValue({
        createTrip: {
            $post: postMock,
        },
    } as unknown as ReturnType<typeof hc>)

    const getUserMock = vi.fn().mockResolvedValue({ privateMetadata: {} })
    const updateUserMetadataMock = vi.fn().mockResolvedValue({})
    mockedCreateClerkClient.mockReturnValue({
        users: {
            getUser: getUserMock,
            updateUserMetadata: updateUserMetadataMock,
        },
    } as unknown as ReturnType<typeof createClerkClient>)

    const result = await planTripAction(actionArgs)

    expect(result).toEqual({ tripId })
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(postMock).toHaveBeenCalledWith({
        json: {
            destinationName: 'London',
            startDate: '2025-08-01',
            headcount: '4',
            duration: TripDurationEnum.Weekend,
            fishingStyle: FishingStyleEnum.FlyFishing,
            userId,
        },
    })
    expect(mockedCreateClerkClient).not.toHaveBeenCalled()
    expect(getUserMock).not.toHaveBeenCalled()
    expect(updateUserMetadataMock).not.toHaveBeenCalled()
})

it('should create a trip but not update metadata for an unauthenticated user', async () => {
    const tripId = 'trip-unauth-123'
    mockedGetAuth.mockResolvedValue({
        userId: null,
        has: vi.fn().mockReturnValue(false),
    } as unknown as Awaited<ReturnType<typeof getAuth>>)
    const actionArgs = createMockActionArgs({
        destinationName: 'London',
        startDate: '2025-08-01',
        headcount: '4',
        duration: TripDurationEnum.Weekend,
        fishingStyle: FishingStyleEnum.FlyFishing,
    })

    const postMock = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ tripId }),
    })
    mockedHc.mockReturnValue({
        createTrip: {
            $post: postMock,
        },
    } as unknown as ReturnType<typeof hc>)

    const getUserMock = vi.fn().mockResolvedValue({ privateMetadata: {} })
    const updateUserMetadataMock = vi.fn().mockResolvedValue({})
    mockedCreateClerkClient.mockReturnValue({
        users: {
            getUser: getUserMock,
            updateUserMetadata: updateUserMetadataMock,
        },
    } as unknown as ReturnType<typeof createClerkClient>)

    const result = await planTripAction(actionArgs)

    expect(result).toEqual({ tripId })
    expect(mockedHc).toHaveBeenCalledWith(serverUrl)
    expect(postMock).toHaveBeenCalledWith({
        json: {
            destinationName: 'London',
            startDate: '2025-08-01',
            headcount: '4',
            duration: TripDurationEnum.Weekend,
            fishingStyle: FishingStyleEnum.FlyFishing,
        },
    })
    expect(mockedCreateClerkClient).not.toHaveBeenCalled()
    expect(getUserMock).not.toHaveBeenCalled()
    expect(updateUserMetadataMock).not.toHaveBeenCalled()
})

it('should throw an error if any error is encountered so that our top-level error boundary can capture it and process it', async () => {
    const testError = new Error('Test error message')
    const actionArgs = createMockActionArgs({
        destinationName: 'London',
        startDate: '2025-08-01',
        headcount: '4',
        duration: TripDurationEnum.Weekend,
        fishingStyle: FishingStyleEnum.FlyFishing,
    })
    const postMock = vi.fn().mockRejectedValue(testError)
    mockedHc.mockReturnValue({
        createTrip: {
            $post: postMock,
        },
    } as unknown as ReturnType<typeof hc>)


    await expect(planTripAction(actionArgs)).rejects.toThrow()
})