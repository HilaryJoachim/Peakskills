'use server'

import { supabase } from '@/lib/supabase'

export async function getCohortsForDropdown() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('cohorts')
    .select('id, start_date, program:programs(title)')
    .order('start_date', { ascending: false })

  if (error) {
    console.error('Error fetching cohorts:', error)
    return []
  }
  return data
}

export async function getSessionsByCohort(cohortId: string) {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('training_sessions')
    .select('*')
    .eq('cohort_id', cohortId)
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching sessions:', error)
    return []
  }
  return data
}

export async function getStudentsByCohort(cohortId: string) {
  if (!supabase) return []

  // Fetch students whose application matches the given cohort (session_id in applications table)
  const { data, error } = await supabase
    .from('students')
    .select('id, status, application:applications!inner(full_name, learning_mode, session_id)')
    .eq('applications.session_id', cohortId)
    .in('status', ['Active Student', 'Completed']) // Optionally restrict to active students

  if (error) {
    console.error('Error fetching students:', error)
    return []
  }
  return data
}

export async function getAttendanceRecords(sessionId: string) {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('session_id', sessionId)

  if (error) {
    console.error('Error fetching attendance:', error)
    return []
  }
  return data
}

export async function saveAttendance(records: { sessionId: string; studentId: string; status: string }[]) {
  if (!supabase || records.length === 0) return

  const sessionId = records[0].sessionId

  // First, delete existing attendance for this session so we can upsert cleanly
  const { error: deleteError } = await supabase
    .from('attendance')
    .delete()
    .eq('session_id', sessionId)

  if (deleteError) {
    console.error('Error clearing old attendance:', deleteError)
    throw new Error('Failed to save attendance')
  }

  // Insert new attendance records
  const insertData = records.map(r => ({
    session_id: r.sessionId,
    student_id: r.studentId,
    status: r.status
  }))

  const { error: insertError } = await supabase
    .from('attendance')
    .insert(insertData)

  if (insertError) {
    console.error('Error saving attendance:', insertError)
    throw new Error('Failed to save attendance')
  }
}
