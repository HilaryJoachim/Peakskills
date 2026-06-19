import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Blog & Insights', description: 'Professional development insights and training resources from PeakSkills.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Insights" title="Blog & Insights" description="Thought leadership, professional development resources, and training perspectives from the PeakSkills team." />
}
