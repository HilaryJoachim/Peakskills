import { Metadata } from 'next'
import ScaffoldPage from '@/components/layout/ScaffoldPage'
export const metadata: Metadata = { title: 'Verify a PeakSkills Certificate', description: 'Verify the authenticity of a PeakSkills training certificate.' }
export default function Page() {
  return <ScaffoldPage eyebrow="Certificate Verification" title="Verify a PeakSkills Certificate" description="Enter a certificate ID or participant name and program to verify the authenticity of a PeakSkills training certificate. This feature is coming soon." />
}
