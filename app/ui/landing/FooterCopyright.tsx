export const Copyright = ({ year }: { year: number }) => {
    return (
        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
            <p className="text-slate-600 font-medium">
                &copy; {year} Roam.fish. All rights reserved.
            </p>
        </div>
    )
}
