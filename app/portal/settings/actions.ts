'use server'

import { supabase } from '@/lib/supabase'
import { getStudentSession } from '@/lib/auth'

export async function updateStudentProfile(formData: {
  fullName: string
  phone: string
  dateOfBirth: string
}) {
  const session = await getStudentSession()
  if (!session) {
    throw new Error('Not authenticated')
  }

  if (!supabase) {
    throw new Error('Database not configured')
  }

  // Find the student's application_id
  const { data: student, error: studentError } = await supabase
    .from('students')
    .select('application_id')
    .eq('id', session.studentId)
    .single()

  if (studentError || !student) {
    throw new Error('Student not found')
  }

  // Update applications table
  const { error: updateError } = await supabase
    .from('applications')
    .update({
      full_name: formData.fullName,
      phone_number: formData.phone,
    })
    .eq('id', student.application_id)

  if (updateError) {
    console.error('Update error:', updateError)
    throw new Error('Failed to update profile')
  }

  return { success: true }
}
