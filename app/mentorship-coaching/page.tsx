import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MentorshipHero from '@/components/sections/mentorship/MentorshipHero'
import HowItWorks from '@/components/sections/mentorship/HowItWorks'
import LearningCohorts from '@/components/sections/mentorship/LearningCohorts'
import RequestTrainingForm from '@/components/forms/RequestTrainingForm'
import { getPrograms, getUpcomingCohorts } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Mentorship & Career Guidance',
  description:
    'Build your career with expert mentorship from PeakSkills. Programs for university students, fresh graduates, young professionals, and job seekers. Online and physical classes available with certificates of completion.',
  keywords: [
    'mentorship Tanzania',
    'career guidance Dar es Salaam',
    'student mentorship East Africa',
    'career coaching Tanzania',
    'professional development youth',
    'interview preparation Tanzania',
    'resume writing course',
    'leadership training young professionals',
  ],
}

export const revalidate = 60 // Revalidate every minute

export default async function MentorshipPage() {
  const [programs, cohorts] = await Promise.all([
    getPrograms(),
    getUpcomingCohorts(100)
  ])

  const simplePrograms = programs.map(p => ({ id: p.id, title: p.title }))
  const simpleCohorts = cohorts.map(c => ({ id: c.id, program_id: c.program_id, start_date: c.start_date, location: c.location }))

  return (
    <>
      <Header />
      <main>
        <MentorshipHero />
        <HowItWorks />
        <LearningCohorts />
        
        <section id="apply" style={{ background: '#F4F7FA', padding: '80px 24px' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '12px', color: '#0FAFAF', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>
                Student Admission Portal
              </p>
              <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1.15, color: '#1D2430', margin: '0 0 14px' }}>
                Apply for Mentorship
              </h2>
              <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px', color: '#5C6B7A', margin: 0, maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
                Complete the form below to apply for a PeakSkills mentorship program. All applications are reviewed within 2-3 business days.
              </p>
            </div>
            
            <div style={{ background: '#fff', borderRadius: '10px', padding: 'clamp(24px, 5vw, 48px)', border: '1px solid #DDE4EC', boxShadow: '0 2px 8px rgba(29,36,48,0.06)' }}>
              <RequestTrainingForm programs={simplePrograms} cohorts={simpleCohorts} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
