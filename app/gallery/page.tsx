import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Gallery & Events', description: 'Photographs from past training sessions and events across Tanzania.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Gallery" title="Gallery & Events" description="Photographs from past training sessions, workshops, and community programs across Tanzania and East Africa." />
}
