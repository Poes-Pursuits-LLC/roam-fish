const Navbar = () => {
    return (
        <nav className="bg-stone-50 border-b-4 border-black px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <span className="text-2xl font-black uppercase tracking-wide text-slate-800">
                        Roam.Fish
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    <link href="/plan-trip" className="neo-button-primary">
                        Plan Trip
                    </link>
                    <button
                        onClick={() => navigate('/login')}
                        className="neo-button bg-emerald-700 text-white border-black"
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
