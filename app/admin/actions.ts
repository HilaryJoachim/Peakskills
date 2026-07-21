'use server'

import { supabase } from '@/lib/supabase'

export async function getDashboardStats() {
  if (!supabase) return { pendingApplications: 0, activeStudents: 0, todaysSessions: 0, attendancePending: 0, certificatesReady: 0 }

  const [{ count: pendingApps }, { count: activeStudents }] = await Promise.all([
    supabase.from('applications').select('*', { count: 'exact', head: true }).in('status', ['Application Submitted', 'Under Review']),
    supabase.from('students').select('*', { count: 'exact', head: true }).eq('status', 'Active Student')
  ])

  return {
    pendingApplications: pendingApps || 0,
    activeStudents: activeStudents || 0,
    todaysSessions: 0, // Mock
    attendancePending: 0, // Mock
    certificatesReady: 0, // Mock
  }
}

export async function getRecentApplications() {
  if (!supabase) return []

  const { data } = await supabase
    .from('applications')
    .select('*, program:programs(title), student:students(status)')
    .order('submitted_at', { ascending: false })
    .limit(5)

  return data || []
}

export async function getTodaysSessions() {
  // Mock implementation as sessions are not yet migrated
  return []
}
