import { FAQ } from '../FAQ'

export const LandingFAQ = () => {
    return <FAQ config={config} />
}

const config = [
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
