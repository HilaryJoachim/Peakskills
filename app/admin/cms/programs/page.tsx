import Link from 'next/link'
import { getPrograms } from '@/lib/supabase'
import { Plus, Edit, Trash2 } from 'lucide-react'

export const metadata = {
  title: 'Programs CMS | PeakSkills Admin',
}

export default async function ProgramsCMSPage() {
  const programs = await getPrograms()

  return (
    <div className="cms-programs">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Programs</h1>
          <p className="text-slate-400 mt-1">Manage training programs displayed on the website.</p>
        </div>
        <Link 
          href="/admin/cms/programs/new" 
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Program
        </Link>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700">
              <th className="p-4 text-slate-300 font-medium">Title</th>
              <th className="p-4 text-slate-300 font-medium">Category</th>
              <th className="p-4 text-slate-300 font-medium">Format</th>
              <th className="p-4 text-slate-300 font-medium">Featured</th>
              <th className="p-4 text-slate-300 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {programs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No programs found.
                </td>
              </tr>
            ) : programs.map((program) => (
              <tr key={program.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-slate-200">{program.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{program.slug}</div>
                </td>
                <td className="p-4 text-slate-400">
                  {program.category?.name || '-'}
                </td>
                <td className="p-4 text-slate-400 capitalize">
                  {program.format}
                </td>
                <td className="p-4">
                  {program.is_featured ? (
                    <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full border border-amber-500/30">
                      Featured
                    </span>
                  ) : '-'}
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <Link 
                    href={`/admin/cms/programs/${program.slug}`}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
