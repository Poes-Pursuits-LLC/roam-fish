import { useState } from 'react'
import { FishingStyleEnum } from '~/core/trip/trip.model'

interface StyleRadioProps {
    value: FishingStyleEnum
    onChange: (value: FishingStyleEnum) => void
    required?: boolean
}

export const StyleRadio = ({ value, onChange, required = false }: StyleRadioProps) => {
    const [selectedStyle, setSelectedStyle] = useState<FishingStyleEnum>(value)

    const handleStyleChange = (style: FishingStyleEnum) => {
        setSelectedStyle(style)
        onChange(style)
    }

    return (
        <div className="space-y-3">
            <label className="flex items-center gap-3 text-base font-medium mb-2 text-slate-700">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                Fishing Style
            </label>
            <div className="grid grid-cols-2 gap-3">
                {Object.values(FishingStyleEnum).map((style) => (
                    <label
                        key={style}
                        className={`relative flex cursor-pointer rounded-lg border p-4 transition-all hover:bg-slate-50 ${selectedStyle === style
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-slate-200'
                            }`}
                    >
                        <input
                            type="radio"
                            name="fishingStyle"
                            value={style}
                            checked={selectedStyle === style}
                            onChange={() => handleStyleChange(style)}
                            className="sr-only"
                            required={required}
                        />
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                                <div className="text-sm">
                                    <p className="font-medium text-slate-900">{style}</p>
                                    <p className="text-slate-500">
                                        {style === FishingStyleEnum.FlyFishing
                                            ? 'Traditional fly casting'
                                            : 'Spinning reel technique'}
                                    </p>
                                </div>
                            </div>
                            {selectedStyle === style && (
                                <div className="shrink-0 text-emerald-600">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    )
}
