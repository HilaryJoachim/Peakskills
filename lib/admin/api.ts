// PeakSkills Admin Portal Mock Data & API Service

export type LearningMode = 'Online' | 'Physical'

export interface AdminProgram {
  id: string
  name: string
  category: string
  duration: string
  price: string
  status: 'Active' | 'Draft' | 'Archived'
}

export interface AdminCohort {
  id: string
  programId: string
  name: string
  startDate: string
  status: 'Upcoming' | 'Active' | 'Completed'
}

export interface AdminSession {
  id: string
  cohortId: string
  title: string
  date: string
  time: string
  trainer: string
  meetingLink: string
  venue: string
  status: 'Scheduled' | 'Completed'
}

export interface AttendanceRecord {
  id: string
  sessionId: string
  studentId: string
  status: 'Present' | 'Absent' | 'Late'
}

// ==========================================
// MOCK DATABASE (In-Memory)
// ==========================================

let mockPrograms: AdminProgram[] = [
  { id: 'p1', name: 'Leadership Excellence Program', category: 'Leadership', duration: '12 Weeks', price: '$2,500', status: 'Active' },
  { id: 'p2', name: 'Advanced Data Analytics', category: 'Data & Tech', duration: '16 Weeks', price: '$3,200', status: 'Active' },
]

let mockCohorts: AdminCohort[] = [
  { id: 'c1', programId: 'p1', name: 'October 2026 Cohort', startDate: '2026-10-06', status: 'Active' },
]

let mockSessions: AdminSession[] = [
  { id: 's1', cohortId: 'c1', title: 'Strategic Communication', date: '2026-10-27', time: '19:00', trainer: 'Sarah Johnson', meetingLink: 'meet.google.com/abc-defg-hij', venue: 'Virtual', status: 'Scheduled' },
  { id: 's2', cohortId: 'c1', title: 'Team Dynamics', date: '2026-11-03', time: '19:00', trainer: 'Dr. Alan Smith', meetingLink: 'meet.google.com/xyz-1234-abc', venue: 'Virtual', status: 'Scheduled' },
]

let mockAttendance: AttendanceRecord[] = [
  { id: 'a1', sessionId: 's1', studentId: 'PS-MENT-3218', status: 'Present' },
]

// ==========================================
// MOCK API SERVICES
// Replace these implementations with Supabase queries later.
// ==========================================

// --- Programs ---
export async function getPrograms() {
  return [...mockPrograms]
}

export async function getProgramById(id: string) {
  return mockPrograms.find(p => p.id === id) || null
}

// --- Sessions & Cohorts ---
export async function getCohorts() {
  return [...mockCohorts]
}

export async function getSessions() {
  return [...mockSessions]
}

export async function getSessionsByCohort(cohortId: string) {
  return mockSessions.filter(s => s.cohortId === cohortId)
}

// --- Attendance ---
export async function getAttendanceForSession(sessionId: string) {
  return mockAttendance.filter(a => a.sessionId === sessionId)
}

export async function saveAttendance(records: Omit<AttendanceRecord, 'id'>[]) {
  // Clear old records for this session for simplicity, then insert new
  const sessionIds = [...new Set(records.map(r => r.sessionId))]
  mockAttendance = mockAttendance.filter(a => !sessionIds.includes(a.sessionId))
  
  records.forEach((r, i) => {
    mockAttendance.push({ ...r, id: `att-${Date.now()}-${i}` })
  })
}
