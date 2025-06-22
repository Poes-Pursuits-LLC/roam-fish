import { Suspense, use, type ReactNode } from 'react'
import { Select, type SelectProps } from '../Select'
import type { Destination } from '~/core/destination/destination.model'

interface DestinationSelectProps
    extends Omit<
        SelectProps<Destination>,
        'getLabel' | 'getValue' | 'options' | 'getId'
    > {
    destinations: Destination[]
}

export function DestinationSelect({
    destinations,
    ...props
}: DestinationSelectProps) {
    return (
        <Select
            name="destinationName"
            options={destinations}
            getId={(destination) => destination.destinationId}
            getLabel={(destination) => `${destination.name}, ${destination.province}, ${destination.country}`}
            getValue={(destination) => destination.name}
            {...props}
        />
    )
}

interface SuspendedDestinationSelectProps
    extends Omit<DestinationSelectProps, 'destinations'> {
    destinationsPromise: Promise<Destination[]>
    fallback?: ReactNode
}

function DestinationSelectWithData({
    destinationsPromise,
    ...props
}: SuspendedDestinationSelectProps) {
    const destinations = use(destinationsPromise)
    return <DestinationSelect destinations={destinations} {...props} />
}

export function SuspendedDestinationSelect({
    destinationsPromise,
    fallback = (
        <div className="w-full">
            <div className="relative">
                <div className="neo-input w-full text-lg bg-stone-50 animate-pulse">
                    <div className="h-6 w-3/4 bg-stone-200 rounded" />
                </div>
            </div>
        </div>
    ),
    ...props
}: SuspendedDestinationSelectProps) {
    return (
        <Suspense fallback={fallback}>
            <DestinationSelectWithData
                destinationsPromise={destinationsPromise}
                {...props}
            />
        </Suspense>
    )
}
