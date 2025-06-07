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
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    {title}
                </h2>
                <p className="text-slate-600 mb-6">{description}</p>
                <NavLink
                    to="/login"
                    className="inline-block neo-button bg-blue-600 text-white hover:bg-blue-700 px-6 py-2"
                >
                    Sign Up Free
                </NavLink>
            </div>
        </div>
    )
}
