import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProgramsCatalogueClient from '@/components/programs/ProgramsCatalogueClient'
import { getPrograms, getCategories } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Training Programs — Full Catalogue',
  description:
    'Browse PeakSkills\' full catalogue of corporate training programs across leadership, banking, government capacity building, customer service, HR, and more. Enroll individually or request in-house delivery.',
}

export const revalidate = 3600

export default async function ProgramsPage() {
  const [programs, categories] = await Promise.all([
    getPrograms(),
    getCategories(),
  ])

  return (
    <>
      <Header />
      <main>
        <ProgramsCatalogueClient programs={programs} categories={categories} />
      </main>
      <Footer />
    </>
  )
}
