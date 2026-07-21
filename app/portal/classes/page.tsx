import { getStudentSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import CurriculumList from '@/components/portal/CurriculumList'

export default async function ClassesPage() {
  const session = await getStudentSession()
  if (!session) redirect('/login')

  const { data: student } = await supabase!
    .from('students')
    .select('applications(program_id)')
    .eq('id', session.studentId)
    .single()

  const appData = Array.isArray(student?.applications) ? student?.applications[0] : student?.applications
  const programId = appData?.program_id

  let curriculum: any[] = []
  if (programId) {
    const { data } = await supabase!
      .from('modules')
      .select(`
        *,
        course_materials(*),
        assignments(*)
      `)
      .eq('program_id', programId)
      .order('order_index', { ascending: true })
      
    if (data) curriculum = data
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #0077B6 0%, #0FAFAF 100%)', 
        borderRadius: '16px', 
        padding: '32px', 
        color: '#ffffff',
        boxShadow: '0 10px 30px rgba(0, 119, 182, 0.15)'
      }}>
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', margin: '0 0 12px' }}>
          My Classes
        </h2>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
          Access your enrolled programs, syllabus, and course materials.
        </p>
      </div>

      <CurriculumList curriculum={curriculum} />
    </div>
  )
}
