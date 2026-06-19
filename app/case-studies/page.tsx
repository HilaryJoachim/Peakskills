import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Case Studies', description: 'Detailed accounts of PeakSkills training and consulting engagements.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Case Studies" title="Case Studies" description="Detailed accounts of training and consulting engagements — what the challenge was, what we designed, and what changed as a result." />
}
