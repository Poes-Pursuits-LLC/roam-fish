export const FeatureSet = ({
    config,
}: {
    config: {
        header?: string
        features: {
            icon: React.ElementType
            title: string
            description: string
        }[]
    }
}) => {
    return (
        <section className="px-6 py-20 nature-gradient-bg">
            <div className="max-w-6xl mx-auto">
                {config.header && (
                    <h2 className="nature-subheader text-center mb-16 text-slate-800">
                        {config.header}
                    </h2>
                )}
                <div className="grid md:grid-cols-3 gap-8">
                    {config.features.map((feature, index) => (
                        <div
                            key={index}
                            className="nature-card text-center group hover:scale-105 transition-transform duration-300"
                        >
                            <div className="p-4 bg-slate-100 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                <feature.icon className="w-10 h-10 text-emerald-700" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-slate-800">
                                {feature.title}
                            </h3>
                            <p className="nature-body">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
