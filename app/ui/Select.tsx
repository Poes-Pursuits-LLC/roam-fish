import { type ComponentProps, type ReactNode } from 'react'
import { cn } from '~/utils'

export interface SelectProps<T>
    extends Omit<ComponentProps<'select'>, 'onChange' | 'value'> {
    options: T[]
    value: T | null
    onChange: (value: T | null) => void
    getId: (option: T) => string
    getLabel: (option: T) => string
    getValue: (option: T) => string
    label?: ReactNode
    error?: string
}

export function Select<T>({
    options,
    value,
    onChange,
    getId,
    getLabel,
    getValue,
    label,
    error,
    className = '',
    ...props
}: SelectProps<T>) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-lg font-bold mb-2 uppercase tracking-wide text-slate-800">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    value={value ? getValue(value) : ''}
                    onChange={(e) => {
                        if (!e.target.value) {
                            onChange(null)
                            return
                        }
                        const selected = options.find(
                            (option) => getValue(option) === e.target.value,
                        )
                        if (selected) onChange(selected)
                    }}
                    className={cn(
                        'neo-input w-full text-lg',
                        error && 'border-red-500',
                        className,
                    )}
                    {...props}
                >
                    <option value="" className="text-slate-500">
                        Select an option
                    </option>
                    {options.map((option) => (
                        <option
                            key={getId(option)}
                            value={getValue(option)}
                            className="text-slate-800"
                        >
                            {getLabel(option)}
                        </option>
                    ))}
                </select>
            </div>
            {error && (
                <p className="mt-2 text-sm font-medium text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}
