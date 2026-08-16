import { Metadata } from 'next'
import { getPartnershipServices } from '@/lib/supabase'
import PartnershipServiceManager from './PartnershipServiceManager'

export const metadata: Metadata = {
  title: 'Partnership Services CMS | PeakSkills Admin',
  description: 'Manage partnership and POS services',
}

export const revalidate = 0

export default async function PartnershipServicesCMSPage() {
  const services = await getPartnershipServices()

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <PartnershipServiceManager initialServices={services} />
    </div>
  )
}
