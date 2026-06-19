import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Our Team', description: 'The facilitators and consultants behind PeakSkills programs.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Our People" title="Our Team" description="The facilitators, consultants, and specialists who design and deliver PeakSkills programs — practitioners with direct sector experience, not generalist trainers." />
}
