import { MapPin, Plane } from 'lucide-react'
import { useEffect, useRef } from 'react'

export const TravelDetails = ({
    airport,
    cities,
}: {
    airport: string
    cities: string[]
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const containerRefTwo = useRef<HTMLDivElement>(null)
    const scriptRef = useRef<HTMLScriptElement | null>(null)
    const scriptRefTwo = useRef<HTMLScriptElement | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        if (scriptRef.current) {
            scriptRef.current.remove()
            scriptRef.current = null
        }

        const existingScript = containerRef.current.querySelector(
            'script[src*="tp.media"]',
        )
        if (existingScript) {
            existingScript.remove()
        }

        const script = document.createElement('script')
        script.src =
            'https://tp.media/content?trs=398838&shmarker=615207&locale=en&curr=USD&powered_by=true&border_radius=0&plain=true&color_button=%2310B981&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121&border_radius=10'
        script.async = true
        scriptRef.current = script
        containerRef.current.appendChild(script)

        return () => {
            if (scriptRef.current) {
                scriptRef.current.remove()
                scriptRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (!containerRefTwo.current) return

        if (scriptRefTwo.current) {
            scriptRefTwo.current.remove()
            scriptRefTwo.current = null
        }

        const existingScript = containerRefTwo.current.querySelector(
            'script[src*="tp.media"]',
        )
        if (existingScript) {
            existingScript.remove()
        }

        const script = document.createElement('script')
        script.src =
            'https://tp.media/content?currency=usd&trs=398838&shmarker=615207&show_hotels=false&powered_by=true&locale=en&searchUrl=search.hotellook.com&primary_override=%2310B981&color_button=%2310B981&color_icons=%2310B981&secondary=%23FFFFFF&dark=%23262626&light=%23FFFFFF&special=%23C4C4C4&color_focused=%23FF8E01&border_radius=10&no_labels=true&plain=true&promo_id=7873&campaign_id=101'
        script.async = true
        scriptRefTwo.current = script
        containerRefTwo.current.appendChild(script)

        return () => {
            if (scriptRefTwo.current) {
                scriptRefTwo.current.remove()
                scriptRefTwo.current = null
            }
        }
    }, [])

    return (
        <div className="neo-card bg-stone-50 mb-8">
            <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-emerald-700" />
                <h2 className="neo-subheader text-slate-800">Travel Details</h2>
            </div>
            <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-stone-700" />
                <span className="text-slate-700 font-semibold">
                    We recommend flying into {airport}
                </span>
            </div>
            <div className="mt-4" ref={containerRef} />

            <div className="flex items-center gap-2 mt-6">
                <MapPin className="w-5 h-5 text-stone-700" />
                <span className="text-slate-700 font-semibold">
                    We recommend staying in any of the following cities:{' '}
                    {cities.join(', ')}
                </span>
            </div>
            <div className="mt-4" ref={containerRefTwo} />
        </div>
    )
}
