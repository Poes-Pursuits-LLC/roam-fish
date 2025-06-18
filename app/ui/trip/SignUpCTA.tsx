import { NavLink } from 'react-router'

export function SignUpCTA({
    title,
    description,
}: {
    title: string
    description: string
}) {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="neo-card text-center max-w-md">
                <h2 className="neo-subheader mb-4 text-slate-800">{title}</h2>
                <p className="text-lg font-semibold text-slate-700 mb-6">
                    {description}
                </p>
                <NavLink to="/login" className="neo-button">
                    Sign Up Free
                </NavLink>
            </div>
        </div>
    )
}
