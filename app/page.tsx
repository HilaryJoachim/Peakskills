import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import IndustriesWeServe from '@/components/sections/IndustriesWeServe'
import TrustStrip from '@/components/sections/TrustStrip'
import ServicesOverview from '@/components/sections/ServicesOverview'
import FeaturedPrograms from '@/components/sections/FeaturedPrograms'
import WhyPeakSkills from '@/components/sections/WhyPeakSkills'
import TestimonialsExcerpt from '@/components/sections/TestimonialsExcerpt'
import SchedulePreview from '@/components/sections/SchedulePreview'
import SubscribeBand from '@/components/sections/SubscribeBand'
import {
  getPrograms,
  getFeaturedTestimonials,
  getClients,
  getUpcomingCohorts,
} from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'PeakSkills — Corporate Training, Consulting & Coaching | Tanzania',
  description:
    'PeakSkills delivers practical corporate training, consulting, mentorship and coaching for banks, government institutions, NGOs, and growing organizations across Tanzania and East Africa.',
}

// Revalidate homepage data every hour
export const revalidate = 3600

export default async function HomePage() {
  const [featuredPrograms, testimonials, clients, upcomingCohorts] = await Promise.all([
    getPrograms({ featured: true, limit: 6 }),
    getFeaturedTestimonials(),
    getClients(),
    getUpcomingCohorts(6),
  ])

  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* V2.0: Industries We Serve directly below hero */}
        <IndustriesWeServe />
        <TrustStrip clients={clients} />
        <ServicesOverview />
        <FeaturedPrograms programs={featuredPrograms} />
        <WhyPeakSkills />
        <TestimonialsExcerpt testimonials={testimonials} />
        <SchedulePreview cohorts={upcomingCohorts as any} />
        <SubscribeBand />
      </main>
      <Footer />
    </>
  )
}
