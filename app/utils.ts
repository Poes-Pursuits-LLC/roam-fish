import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const scrollToElement = ({ elementId }: { elementId: string }) => {
    const contentElement = document.getElementById(elementId)
    if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth' })
    }
}
