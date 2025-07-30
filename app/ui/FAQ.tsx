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
        <section className="px-6 py-20 nature-gradient-bg">
            <div className="max-w-4xl mx-auto">
                <h2 className="nature-subheader text-center mb-12 text-slate-800">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {config.map((faq, index) => (
                        <div key={index} className="nature-card">
                            <button
                                onClick={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index,
                                    )
                                }
                                className="cursor-pointer w-full text-left p-4 font-semibold text-lg hover:text-emerald-700 transition-colors text-slate-800"
                            >
                                {faq.question}
                            </button>
                            {openIndex === index && (
                                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 font-medium text-slate-700">
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
