import { FishingStyleEnum } from '../trip/trip.model'

export interface Prompt {
    promptId: string
    content: string
    fishingStyle: FishingStyleEnum
    createdAt: string
    updatedAt: string
    expireAt?: number
}   