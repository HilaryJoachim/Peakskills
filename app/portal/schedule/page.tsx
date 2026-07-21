import UpcomingSession from '@/components/portal/UpcomingSession'
import LearningTimeline from '@/components/portal/LearningTimeline'
import { getStudentSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function SchedulePage() {
  const session = await getStudentSession()
  if (!session) redirect('/login')
  if (!supabase) return null


  const { data: student } = await supabase
    .from('students')
    .select('applications(session_id)')
    .eq('id', session.studentId)
    .single()

  const appData = Array.isArray(student?.applications) ? student?.applications[0] : student?.applications
  const cohortId = appData?.session_id

  let sessions: any[] = []
  if (cohortId) {
    const { data } = await supabase
      .from('training_sessions')
      .select('*')
      .eq('cohort_id', cohortId)
      .order('date', { ascending: true })
      
    if (data) sessions = data
  }

  const now = new Date()
  const upcomingSessions = sessions.filter(s => {
    if (s.status !== 'Scheduled') return false
    
    // Parse session date and time (e.g. "2026-07-18" and "13:30:00")
    // We append Z or parse in local time. By default `new Date("YYYY-MM-DDTHH:MM")` uses local time which is perfect.
    const sessionDateStr = `${s.date}T${s.time}`
    const sessionDateTime = new Date(sessionDateStr)
    
    // Assume a session lasts about 2 hours. Keep it as "upcoming/active" until 2 hours after start time.
    const endTime = new Date(sessionDateTime.getTime() + 2 * 60 * 60 * 1000)
    
    return endTime > now
  })
  
  const nextSession = upcomingSessions.length > 0 ? upcomingSessions[0] : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1D2430', margin: '0 0 8px' }}>
          Schedule
        </h2>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#5C6B7A', margin: 0 }}>
          View your upcoming sessions and track your learning timeline.
        </p>
      </div>

      <UpcomingSession session={nextSession} />
      <LearningTimeline sessions={upcomingSessions} />
    </div>
  )
}
