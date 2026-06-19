import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Client Testimonials', description: 'What organizations say about working with PeakSkills.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Client Feedback" title="Client Testimonials" description="What organizations across banking, government, and the development sector say about working with PeakSkills." />
}
