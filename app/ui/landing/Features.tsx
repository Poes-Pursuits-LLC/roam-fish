import { MapPin, Calendar, Fish } from 'lucide-react'

const Features = () => {
    const features = [
        {
            icon: MapPin,
            title: 'Find Perfect Spots',
            description:
                'Discover the best fishing locations based on your preferences and skill level',
        },
        {
            icon: Calendar,
            title: 'Plan Your Schedule',
            description:
                'Optimize timing for weather, tides, and fish activity patterns',
        },
        {
            icon: Fish,
            title: 'Track Your Catches',
            description:
                'Log your successful trips and build your fishing knowledge base',
        },
    ]

    return (
        <section className="px-6 py-20 bg-stone-100">
            <div className="max-w-6xl mx-auto">
                <h2 className="neo-subheader text-center mb-16 text-slate-800">
                    Everything You Need To Fish Better
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="neo-card text-center bg-amber-50"
                        >
                            <feature.icon className="w-16 h-16 mx-auto mb-4 transform rotate-3 text-emerald-700" />
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide text-slate-800">
                                {feature.title}
                            </h3>
                            <p className="text-lg font-semibold text-slate-700">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
