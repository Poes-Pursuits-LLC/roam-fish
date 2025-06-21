import { FAQ } from '../FAQ'

export const LandingFAQ = () => {
    return <FAQ config={config} />
}

const config = [
    {
        question: 'How does it work?',
        answer: 'As the simplest fishing planner on the internet, we pride ourselves on making your life easy. Just select your destination, travel dates, headcount, and we will do the rest. Your custom trip will be generated in about 10 seconds.',
    },
    {
        question: 'Why not just use Yellow Dog?',
        answer: 'Yellow Dog is an amazing service and everyone should use them. That being said, they tend to focus on expensive, all-inclusive lodge experiences which may have 3-day minimums. Roam, on the other hand, gives you immediate information as a starting point as well as tools to plan your trip, filling the niche for your DIY and budget-friendly trips.',
    },
    {
        question: 'I made my first trip. Now what?',
        answer: 'Once you have made your free trip, you can sign up to use our trip management tools to actually manage your trips and unlock advanced functionality',
    },
    {
        question: 'How much does it cost?',
        answer: 'Roam is completely free to use. A fully optional paid plan exists that enables sharing your trips with others and an unlimited trip count, but it is completely optional.',
    },
]
