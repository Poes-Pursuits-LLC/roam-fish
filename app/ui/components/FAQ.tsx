import { useState } from 'react'

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: 'How do I plan my first fishing trip?',
            answer: "Simply click 'Plan Trip' and tell us your preferences. We'll suggest the best locations, timing, and gear for your skill level.",
        },
        {
            question: "What if I'm a complete beginner?",
            answer: 'Perfect! We cater to all skill levels. Our recommendations include beginner-friendly spots with detailed guides and equipment suggestions.',
        },
        {
            question: 'Can I track my catches?',
            answer: 'Yes! Our platform lets you log your catches, track your progress, and build your personal fishing knowledge base over time.',
        },
        {
            question: 'How accurate are the fishing forecasts?',
            answer: 'We use real-time weather data, tide information, and fish activity patterns to provide highly accurate fishing condition forecasts.',
        },
    ]

    return (
        <section className="px-6 py-20 bg-teal-50">
            <div className="max-w-4xl mx-auto">
                <h2 className="neo-subheader text-center mb-12 text-slate-800">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="neo-card bg-stone-50">
                            <button
                                onClick={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index,
                                    )
                                }
                                className="w-full text-left p-2 font-bold text-lg uppercase tracking-wide hover:text-emerald-700 transition-colors text-slate-800"
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
