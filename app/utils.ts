import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function scrollToElement({ elementId }: { elementId: string }) {
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
