import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { jwtVerify } from 'jose'
import { supabase } from '@/lib/supabase'

import HeroCard from '@/components/portal/HeroCard'
import StudentJourney from '@/components/portal/StudentJourney'
import StatsCards from '@/components/portal/StatsCards'
import AttendanceCard from '@/components/portal/AttendanceCard'
import StudentProfile from '@/components/portal/StudentProfile'

export default async function PortalDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('peakskills_student_session')?.value

  if (!token) {
    redirect('/login')
  }

  let payload;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev')
    const verified = await jwtVerify(token, secret)
    payload = verified.payload
  } catch (error) {
    redirect('/login')
  }

  // Fetch real data from Supabase
  const { data: studentRecord, error } = await supabase!
    .from('students')
    .select(`
      id,
      status,
      application:applications(
        full_name,
        email,
        phone_number,
        learning_mode,
        session_id,
        program_id,
        program:programs(title),
        session:cohorts(start_date, end_date, location)
      )
    `)
    .eq('id', payload.studentId)
    .single()

  if (error || !studentRecord || !studentRecord.application) {
    redirect('/login')
  }

  // Handle Supabase joining format where one-to-one is returned as object or array depending on schema
  const app: any = Array.isArray(studentRecord.application) ? studentRecord.application[0] : studentRecord.application;
  const programTitle = app.program ? (Array.isArray(app.program) ? app.program[0]?.title : app.program?.title) : 'Unknown Program';
  const cohortData = app.session ? (Array.isArray(app.session) ? app.session[0] : app.session) : null;

  // Map to the interface expected by our components
  const studentData = {
    id: studentRecord.id,
    name: app.full_name,
    email: app.email,
    phone: app.phone_number,
    photo: '', // Not implemented in DB yet
    program: programTitle,
    cohort: cohortData?.location ? `Cohort: ${cohortData.location}` : 'General Cohort',
    mentor: { name: 'PeakSkills Instructor', role: 'Lead Facilitator', photo: '' },
    learningMode: app.learning_mode || 'Online',
    enrollmentDate: cohortData?.start_date || new Date().toISOString(),
    expectedCompletion: cohortData?.end_date || new Date().toISOString(),
    status: studentRecord.status
  }

  // Fetch real sessions for the cohort to get the next session
  let nextSession = null;
  let remainingSessions = 0;
  let completionPct = 0;
  let totalSessions = 0;
  let attendedSessions = 0;
  let absentSessions = 0;
  let lateSessions = 0;

  if (app.session_id) {
    const { data: sessions } = await supabase!
      .from('training_sessions')
      .select('*')
      .eq('cohort_id', app.session_id)
      .order('date', { ascending: true })
      
    if (sessions) {
      totalSessions = sessions.length
      const now = new Date()
      const upcoming = sessions.filter((s: any) => {
        if (s.status !== 'Scheduled') return false
        const endTime = new Date(`${s.date}T${s.time}`)
        endTime.setTime(endTime.getTime() + 2 * 60 * 60 * 1000)
        return endTime > now
      })
      
      nextSession = upcoming.length > 0 ? {
        title: upcoming[0].title,
        date: upcoming[0].date,
        time: upcoming[0].time,
        meetingLink: upcoming[0].meeting_link || '',
        venue: upcoming[0].venue || ''
      } : null

      remainingSessions = upcoming.length
      const completed = totalSessions - remainingSessions
      completionPct = totalSessions > 0 ? Math.round((completed / totalSessions) * 100) : 0
    }

    const { data: attendanceData } = await supabase!
      .from('attendance')
      .select('status')
      .eq('student_id', payload.studentId)
      
    if (attendanceData) {
      attendedSessions = attendanceData.filter(a => a.status === 'Present').length
      absentSessions = attendanceData.filter(a => a.status === 'Absent').length
      lateSessions = attendanceData.filter(a => a.status === 'Late').length
    }
  }

  const totalRecorded = attendedSessions + absentSessions + lateSessions;
  const attendanceRateDetailed = totalRecorded > 0 ? Math.round(((attendedSessions + lateSessions) / totalRecorded) * 100) : 0;
  
  const attendanceStatsObj = {
    present: attendedSessions,
    absent: absentSessions,
    late: lateSessions,
    rate: attendanceRateDetailed,
    total: totalSessions
  }

  let journeyModules: any[] = []
  if (app.program_id) {
    const { data: modulesData } = await supabase!
      .from('modules')
      .select('title')
      .eq('program_id', app.program_id)
      .order('order_index', { ascending: true })
    if (modulesData) journeyModules = modulesData.map(m => m.title)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* 1. Hero Section */}
        <HeroCard 
          student={studentData} 
          nextSession={nextSession}
          remainingSessions={remainingSessions}
          completionPct={completionPct}
        />

        {/* 2. Student Journey */}
        <StudentJourney 
          modules={journeyModules} 
          completionPct={completionPct} 
        />

        {/* 3. Stats Cards */}
        <StatsCards 
          student={studentData} 
          completionPct={completionPct}
          remainingSessions={remainingSessions}
          totalSessions={totalSessions}
          attendedSessions={attendedSessions}
        />

        {/* 4. Main Content — Two Columns */}
        <div className="dashboard-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'stretch' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Attendance */}
            <AttendanceCard stats={attendanceStatsObj} />
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile */}
            <StudentProfile student={studentData} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-columns { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
