import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function scrollToElement(elementId: string) {
    const contentElement = document.getElementById(elementId)
    if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth' })
    }
}

export const handleAsync = async <T>(
    fn: Promise<T>,
): Promise<[T | null, null | Error]> => {
    try {
        const result = await fn
        return [result, null]
    } catch (error) {
        return [null, error as Error]
    }
}

export function debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number,
) {
    let timer: ReturnType<typeof setTimeout> | null = null
    function debounced(...args: Parameters<T>) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
    debounced.cancel = () => {
        if (timer) clearTimeout(timer)
    }
    return debounced as typeof debounced & { cancel: () => void }
}

export const createFormattedDate = () => {
    return new Date().toISOString()
}

export const getTTL = (hours: number) => {
    const now = new Date()
    const futureDate = new Date(now.getTime() + hours * 60 * 60 * 1000)
    return Math.floor(futureDate.getTime() / 1000)
}

export const isIntegrationTest = () => {
    return process.env.INTEGRATION_TEST_FLAG === 'true'
}

export const getLocalTripId = () => {
    if (typeof window === 'undefined' || !window.localStorage) return null
    const tripId = localStorage.getItem('roamfish-tripId')
    if (!tripId) return null
    return tripId
}

export const setLocalTripId = (tripId: string) => {
    if (typeof window === 'undefined' || !window.localStorage) return
    localStorage.setItem('roamfish-tripId', tripId)
}

export const deleteLocalTripId = () => {
    if (typeof window === 'undefined' || !window.localStorage) return
    localStorage.removeItem('roamfish-tripId')
}
