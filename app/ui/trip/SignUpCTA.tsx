import { NavLink } from 'react-router'

export function SignUpCTA({
    title,
    description,
    className,
}: {
    title: string
    description: string
    className?: string
}) {
    return (
        <div
            className={`flex items-center justify-center p-8 ${className || ''}`}
        >
            <div className="neo-card bg-amber-50 text-center max-w-md">
                <h2 className="neo-subheader mb-4 text-slate-800">{title}</h2>
                <p className="text-lg font-semibold text-slate-700 mb-6">
                    {description}
                </p>
                <NavLink
                    to="/login"
                    className="neo-button text-white border-black"
                >
                    Sign Up Free
                </NavLink>
            </div>
        </div>
    )
}
