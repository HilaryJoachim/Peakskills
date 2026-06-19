import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Our Clients', description: 'Organizations across Tanzania and East Africa that have partnered with PeakSkills.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Our Clients" title="Organizations We Have Trained" description="Banks, government institutions, NGOs, universities, and corporates across Tanzania and East Africa who have partnered with PeakSkills." />
}
