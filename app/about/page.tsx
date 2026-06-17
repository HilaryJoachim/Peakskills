import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'About PeakSkills', description: 'Our mission, history, methodology, and the team behind PeakSkills.' }
export default function AboutPage() {
  return <ScaffoldPage eyebrow="Who We Are" title="About PeakSkills" description="Our organizational history, mission, facilitation methodology, and the credentials of the team that delivers your programs." />
}
