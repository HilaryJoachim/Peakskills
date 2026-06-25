import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServicesHero from '@/components/sections/services/ServicesHero'
import AllServicesGrid from '@/components/sections/services/AllServicesGrid'
import WhyChoosePeakSkills from '@/components/sections/services/WhyChoosePeakSkills'
import ClienteleSection from '@/components/sections/ClienteleSection'


export const metadata: Metadata = {
  title: 'Services & Programs',
  description: 'Corporate training, business consulting, mentorship, and branding services by PeakSkills in Tanzania and East Africa.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        
        <AllServicesGrid />

        <WhyChoosePeakSkills />
        <ClienteleSection />
      </main>
      <Footer />
    </>
  )
}
