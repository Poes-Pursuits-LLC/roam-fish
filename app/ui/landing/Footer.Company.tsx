import { Fish } from 'lucide-react'

export const FooterCompany = () => {
    return (
        <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
                <Fish className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-black uppercase tracking-wide">
                    Roam.Fish
                </span>
            </div>
            <p className="text-lg font-semibold mb-4">
                The simplest fishing planner on the internet.
            </p>
        </div>
    )
}
