import { TripDurationEnum } from '~/core/trip/trip.model'

export const getDaysFromDuration = (duration: TripDurationEnum) => {
    switch (duration) {
        case TripDurationEnum.Weekend:
            return 2
        case TripDurationEnum.Week:
            return 7
        case TripDurationEnum.TwoWeeks:
            return 14
        default:
            return 2
    }
}
