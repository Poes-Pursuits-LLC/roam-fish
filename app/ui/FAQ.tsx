import { useState } from 'react'

export const FAQ = ({
    config,
}: {
    config: {
        question: string
        answer: string
    }[]
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="px-6 py-20 bg-teal-50">
            <div className="max-w-4xl mx-auto">
                <h2 className="neo-subheader text-center mb-12 text-slate-800">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {config.map((faq, index) => (
                        <div key={index} className="neo-card bg-stone-50">
                            <button
                                onClick={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index,
                                    )
                                }
                                className="cursor-pointer w-full text-left p-2 font-bold text-lg uppercase tracking-wide hover:text-emerald-700 transition-colors text-slate-800"
                            >
                                {faq.question}
                            </button>
                            {openIndex === index && (
                                <div className="mt-4 p-4 bg-amber-50 border-2 border-black font-semibold text-slate-700">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
