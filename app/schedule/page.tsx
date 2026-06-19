import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScheduleClient from '@/components/sections/schedule/ScheduleClient'

export const metadata: Metadata = {
  title: '2025 Training Schedule',
  description: 'Plan ahead with our full training calendar, or look back at trainings we\'ve already delivered at PeakSkills.',
}

export default function SchedulePage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Header />
      <main className="pt-20 pb-0">
        <ScheduleClient />
      </main>
      <Footer />
    </div>
  )
}
