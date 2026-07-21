import { getStudentSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/portal/SettingsForm'

export default async function SettingsPage() {
  const session = await getStudentSession()

  if (!session) {
    redirect('/login')
  }

  // Fetch real student data
  const { data: student, error } = await supabase!
    .from('students')
    .select('applications(full_name, email, phone_number)')
    .eq('id', session.studentId)
    .single()

  if (error || !student || !student.applications) {
    redirect('/login')
  }

  const appData = Array.isArray(student.applications) ? student.applications[0] : student.applications

  return (
    <SettingsForm initialData={appData} studentId={session.studentId} />
  )
}
