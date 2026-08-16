import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PartnershipServicesClient from '@/components/partnership-services/PartnershipServicesClient'
import { getPartnershipServices } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Partnership Services — POS Solutions',
  description: 'Explore our specialized Point of Sale services and partnerships for supermarkets.',
}

export const revalidate = 60

export default async function PartnershipServicesPage() {
  const services = await getPartnershipServices()

  return (
    <>
      <Header />
      <main>
        <PartnershipServicesClient initialServices={services} />
      </main>
      <Footer />
    </>
  )
}
