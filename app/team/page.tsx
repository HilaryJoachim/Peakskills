import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TeamSection from '@/components/sections/about/TeamSection'

export const metadata: Metadata = { 
  title: 'Our Team | PeakSkills', 
  description: 'The facilitators and consultants behind PeakSkills programs.' 
}

export default function Page() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '72px' }}>
        {/* Simple Page Header */}
        <div style={{ background: '#1D2430', padding: '60px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,44px)', lineHeight: 1.15, color: '#fff', margin: '0 0 14px' }}>
              Our Team
            </h1>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.7)', margin: '0 auto', maxWidth: '600px' }}>
              The facilitators, consultants, and specialists who design and deliver PeakSkills programs.
            </p>
          </div>
        </div>
        
        {/* The New Team Section */}
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}
