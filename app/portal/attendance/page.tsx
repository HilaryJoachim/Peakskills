import { CalendarCheck, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { getStudentSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AttendancePage() {
  const payload = await getStudentSession()
  if (!payload || payload.role !== 'student') {
    redirect('/login')
  }

  // 1. Fetch student info to get session_id
  const { data: studentRecord } = await supabase!
    .from('students')
    .select(`
      id,
      application:applications(session_id)
    `)
    .eq('id', payload.studentId)
    .single()

  const appData: any = Array.isArray(studentRecord?.application) ? studentRecord?.application[0] : studentRecord?.application;
  const cohortId = appData?.session_id;

  let rawSessions: any[] = []
  let attendanceMap: Record<string, string> = {}

  if (cohortId) {
    // 2. Fetch all sessions for this cohort
    const { data: sessionsData } = await supabase!
      .from('training_sessions')
      .select('id, title, date')
      .eq('cohort_id', cohortId)
      .order('date', { ascending: true })
      
    if (sessionsData) rawSessions = sessionsData

    // 3. Fetch attendance records for this student
    const { data: attData } = await supabase!
      .from('attendance')
      .select('session_id, status')
      .eq('student_id', payload.studentId)
      
    if (attData) {
      attData.forEach(a => {
        attendanceMap[a.session_id] = a.status
      })
    }
  }

  const now = new Date()

  const attendanceData = rawSessions.map(session => {
    // check if it's past
    const sessionDate = new Date(session.date)
    let status = attendanceMap[session.id]
    
    // If no attendance recorded
    if (!status) {
      status = sessionDate > now ? 'Upcoming' : 'Absent' // or pending/unrecorded
    }

    return {
      id: session.id,
      date: new Date(session.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      topic: session.title,
      status: status
    }
  })
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Present': return { bg: '#DCFCE7', color: '#15803d', icon: CheckCircle2 }
      case 'Absent': return { bg: '#FEE2E2', color: '#dc2626', icon: XCircle }
      case 'Excused': return { bg: '#FEF3C7', color: '#b45309', icon: AlertCircle }
      default: return { bg: '#F4F7FA', color: '#5C6B7A', icon: CalendarCheck }
    }
  }

  const presentCount = attendanceData.filter(d => d.status === 'Present').length
  const totalCompleted = attendanceData.filter(d => d.status !== 'Upcoming').length
  const rate = Math.round((presentCount / totalCompleted) * 100) || 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0077B6 0%, #0FAFAF 100%)', 
        borderRadius: '16px', 
        padding: '32px', 
        color: '#ffffff',
        boxShadow: '0 10px 30px rgba(0, 119, 182, 0.15)'
      }}>
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', margin: '0 0 12px' }}>
          Attendance Record
        </h2>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
          Track your presence across all cohort sessions. A minimum of 80% is required to earn the certificate.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div style={{ background: '#ffffff', border: '1px solid rgba(221, 228, 236, 0.5)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(29,36,48,0.03)' }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#5C6B7A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attendance Rate</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <h3 style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '36px', color: rate >= 80 ? '#10B981' : '#F59E0B' }}>
              {rate}%
            </h3>
            <span style={{ fontSize: '13px', color: '#A9B4C2', fontWeight: 500, background: '#F4F7FA', padding: '4px 8px', borderRadius: '12px' }}>Target: 80%</span>
          </div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid rgba(221, 228, 236, 0.5)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(29,36,48,0.03)' }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#5C6B7A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sessions Attended</p>
          <h3 style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '36px', color: '#1D2430' }}>
            {presentCount} <span style={{ fontSize: '18px', color: '#A9B4C2', fontWeight: 500 }}>/ {attendanceData.length}</span>
          </h3>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid rgba(221, 228, 236, 0.5)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(29,36,48,0.03)' }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#5C6B7A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Missed Sessions</p>
          <h3 style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '36px', color: '#EF4444' }}>
            {attendanceData.filter(d => d.status === 'Absent' || d.status === 'Excused').length}
          </h3>
        </div>
      </div>

      {/* Record Table */}
      <div style={{ background: '#ffffff', border: '1px solid rgba(221, 228, 236, 0.5)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(29,36,48,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
            <tr>
              <th style={{ padding: '18px 24px', textAlign: 'left', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
              <th style={{ padding: '18px 24px', textAlign: 'left', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Session Topic</th>
              <th style={{ padding: '18px 24px', textAlign: 'left', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((session, i) => {
              const style = getStatusStyle(session.status)
              const Icon = style.icon
              return (
                <tr key={session.id} style={{ borderBottom: i === attendanceData.length - 1 ? 'none' : '1px solid #F1F5F9' }}>
                  <td style={{ padding: '20px 24px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#334155', fontWeight: 500 }}>
                    {session.date}
                  </td>
                  <td style={{ padding: '20px 24px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '15px', color: '#0F172A' }}>
                    {session.topic}
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: style.bg, color: style.color, padding: '6px 14px', borderRadius: '24px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px' }}>
                      <Icon size={16} strokeWidth={2.5} />
                      {session.status}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
