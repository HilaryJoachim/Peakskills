import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Events & Workshops', description: 'Upcoming public events and seminars from PeakSkills.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Events" title="Events & Workshops" description="Upcoming public events, seminars, and networking sessions hosted or co-hosted by PeakSkills across Tanzania and East Africa." />
}
