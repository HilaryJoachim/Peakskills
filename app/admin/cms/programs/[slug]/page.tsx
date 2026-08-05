import { getProgramBySlug, getCategories } from '@/lib/supabase'
import ProgramForm from '@/components/admin/ProgramForm'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Edit Program | PeakSkills Admin',
}

export default async function EditProgramPage({ params }: { params: { slug: string } }) {
  const isNew = params.slug === 'new'
  
  // Await params if you're using Next.js 15+ correctly, but we'll extract slug directly here
  // Note: in Next 15 `params` is a promise, so we should ideally await it:
  // const resolvedParams = await params
  // const isNew = resolvedParams.slug === 'new'
  
  // We'll safely await params just in case it's a promise
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const isNewMode = slug === 'new';

  const [program, categories] = await Promise.all([
    isNewMode ? null : getProgramBySlug(slug),
    getCategories()
  ])

  if (!isNewMode && !program) {
    notFound()
  }

  return (
    <div className="cms-program-edit">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">
          {isNewMode ? 'Create New Program' : `Edit: ${program?.title}`}
        </h1>
        <p className="text-slate-400 mt-1">
          {isNewMode ? 'Add a new training program to the catalogue.' : 'Update program details, pricing, and images.'}
        </p>
      </div>

      <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-8">
        <ProgramForm program={program} categories={categories} />
      </div>
    </div>
  )
}
