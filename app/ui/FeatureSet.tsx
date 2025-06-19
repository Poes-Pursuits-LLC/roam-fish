export const FeatureSet = ({
    config,
}: {
    config: {
        header: string
        features: {
            icon: React.ElementType
            title: string
            description: string
        }[]
    }
}) => {
    return (
        <section className="px-6 py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="neo-subheader text-center mb-16">
                    {config.header}
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {config.features.map((feature, index) => (
                        <div
                            key={index}
                            className="neo-card text-center bg-amber-50"
                        >
                            <feature.icon className="w-16 h-16 mx-auto mb-4 transform rotate-3 text-[#1F513F]" />
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">
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
