export const Copyright = ({ year }: { year: number }) => {
    return (
        <div className="border-t-2 border-stone-100 mt-8 pt-8 text-center">
            <p className="font-bold">
                &copy; {year} Roam.fish. All rights reserved.
            </p>
        </div>
    )
}
