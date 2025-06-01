import type { Route } from './+types/home'
import { useNavigate } from 'react-router-dom'
import { Fish, MapPin, Calendar } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import SearchBar from '@/components/SearchBar'
import Destinations from '@/components/Destinations'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Welcome to React Router!' },
    ]
}ut

export default function LandingPage() {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <Hero />
                <Features />
                <SearchBar />
                <Destinations />
                <FAQ />
                <Footer />
            </div>
        )
    }
}
