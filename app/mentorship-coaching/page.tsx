import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Mentorship & Coaching', description: 'One-to-one executive coaching and structured mentorship programs.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Services" title="Mentorship & Coaching" description="One-to-one executive coaching and structured mentorship programs for senior leaders and high-potential managers. Engagements run for three to six months." />
}
