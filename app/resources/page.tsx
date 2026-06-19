import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Resource Library', description: 'Downloadable guides and templates for HR and training professionals.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Resources" title="Resource Library" description="Downloadable guides, templates, and frameworks for HR managers, training coordinators, and professional development teams." />
}
