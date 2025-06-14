import { expect, it } from 'vitest'
import { getDaysFromDuration } from './get-days-from-duration'
import { TripDurationEnum } from '~/core/trip/trip.model'

it('should return the appropriate number of days from the provided duration value', () => {
    const resultOne = getDaysFromDuration(TripDurationEnum.Weekend)
    const resultTwo = getDaysFromDuration(TripDurationEnum.Week)
    const resultThree = getDaysFromDuration(TripDurationEnum.TwoWeeks)

    expect(resultOne).toBe(2)
    expect(resultTwo).toBe(7)
    expect(resultThree).toBe(14)
})
