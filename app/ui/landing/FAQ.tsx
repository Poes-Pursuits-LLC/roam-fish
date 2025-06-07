import { useState } from 'react'

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: 'How does it work?',
            answer: "It's simple. You specify your desired destination, the amount of people going, when you want to go,  and we'll do the rest. A custom trip with flights, accommodations, a packing list, and fly-fishing specific information like flies, weather, and tactics will be generated for you in under thirty seconds.",
        },
        {
            question: 'Why not just use Yellow Dog?',
            answer: 'Yellow Dog is an amazing service and everyone should use them. That being said, they tend to focus on expensive, all-inclusive lodge experiences which may have 3-day minimums. Roam, on the other hand, gives you immediate information as a starting point as well as tools to plan your trip, filling the niche for your DIY and budget-friendly trips.',
        },
        {
            question: 'I made my first trip. Now what?',
            answer: 'Once you have made your free trip, you can sign up to create more trips and use our trip management tools for free.',
        },
        {
            question: 'How much does it cost?',
            answer: 'Roam is completely free to use. A fully optional yearly plan is available to unlock advanced features and manage unlimited trips.',
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
