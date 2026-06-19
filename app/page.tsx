import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import IndustriesWeServe from '@/components/sections/IndustriesWeServe'
import WhyPeakSkills from '@/components/sections/WhyPeakSkills'
import FeaturedPrograms from '@/components/sections/FeaturedPrograms'
import SubscribeBand from '@/components/sections/SubscribeBand'
import EventsShowcase from '@/components/sections/EventsShowcase'
import CalendarCTA from '@/components/sections/CalendarCTA'
import TrainingImpact from '@/components/sections/TrainingImpact'
import CategoriesRibbon from '@/components/sections/CategoriesRibbon'
import { getPrograms } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'PeakSkills — Corporate Training, Consulting & Coaching | Tanzania',
  description:
    'PeakSkills delivers practical corporate training, consulting, mentorship and coaching for banks, government institutions, NGOs, and growing organizations across Tanzania and East Africa.',
}

// Revalidate homepage data every hour
export const revalidate = 3600

export default async function HomePage() {
  const featuredPrograms = await getPrograms({ limit: 6 })

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoriesRibbon />
        <WhyPeakSkills />
        {/* V2.0: Industries We Serve */}
        <IndustriesWeServe />
        <FeaturedPrograms programs={featuredPrograms} />
        <EventsShowcase />
        <CalendarCTA />
        <TrainingImpact />
        <SubscribeBand />
      </main>
      <Footer />
    </>
  )
}
