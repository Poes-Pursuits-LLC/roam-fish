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
            <div className="nature-card-elevated text-center max-w-md">
                <h2 className="nature-subheader mb-4 text-slate-800">{title}</h2>
                <p className="nature-body mb-6">
                    {description}
                </p>
                <NavLink to="/login" className="nature-button">
                    Sign Up Free
                </NavLink>
            </div>
        </div>
    )
}
