import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Consulting Services', description: 'Organizational development, HR strategy, and performance consulting.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Services" title="Consulting Services" description="Organizational development, HR strategy, and performance consulting for institutions navigating structural change, growth, or regulatory evolution." />
}
