// ── Mentorship & Career Guidance — Placeholder Data ──────────────
// Designed for easy migration to Supabase tables later.
// Every array/type here maps 1-to-1 with a future database table.

// ── Types ─────────────────────────────────────────────────────────

export type LearningMode = 'Online' | 'Physical' | 'Hybrid'
export type PathLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type CohortStatus = 'Open' | 'Almost Full' | 'Closed'
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'
export type CareerStatus = 'Student' | 'Graduate' | 'Employed' | 'Business Owner'

export interface LearningPath {
  id: string
  title: string
  slug: string
  description: string
  image: string
  duration: string
  format: LearningMode
  mentor: string
  level: PathLevel
  category: string
}

export interface LearningCohort {
  id: string
  name: string
  learningPathId: string
  seatsTotal: number
  seatsAvailable: number
  startDate: string
  endDate: string
  schedule: string
  mentor: string
  mode: LearningMode
  status: CohortStatus
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface HowItWorksStep {
  step: number
  title: string
  description: string
  icon: string // lucide icon name reference
}

export interface PortalSession {
  id: string
  title: string
  trainer: string
  date: string        // ISO date
  time: string        // e.g. "7:00 PM"
  meetingLink?: string
  venue?: string
  materialsUrl?: string
  status: 'completed' | 'upcoming'
  type: 'class' | 'workshop' | 'assignment'
}

export interface PortalAttendance {
  sessionId: string
  status: 'present' | 'absent' | 'late'
}

export interface JourneyStep {
  label: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface PortalAnnouncement {
  id: string
  message: string
  date: string
  unread: boolean
}

export interface PortalBadge {
  id: string
  label: string
  icon: string   // lucide icon name
  earned: boolean
}

export interface PortalStudent {
  id: string
  name: string
  email: string
  phone: string
  photo: string
  program: string
  cohort: string
  mentor: { name: string; role: string; photo: string }
  learningMode: LearningMode
  enrollmentDate: string
  expectedCompletion: string
  status: 'active' | 'graduated' | 'suspended'
}

export interface PortalCohort {
  name: string
  totalStudents: number
  activeStudents: number
  startDate: string
  expectedGraduation: string
}

export interface PortalDashboardData {
  student: PortalStudent
  sessions: PortalSession[]
  attendance: PortalAttendance[]
  journey: JourneyStep[]
  announcements: PortalAnnouncement[]
  badges: PortalBadge[]
  cohort: PortalCohort
}

// ── Computed helpers (no DB storage needed) ──────────────────────

export function getCompletionPct(data: PortalDashboardData): number {
  const total = data.sessions.length
  const completed = data.sessions.filter(s => s.status === 'completed').length
  return total === 0 ? 0 : Math.round((completed / total) * 100)
}

export function getAttendanceStats(data: PortalDashboardData) {
  const present = data.attendance.filter(a => a.status === 'present').length
  const absent = data.attendance.filter(a => a.status === 'absent').length
  const late = data.attendance.filter(a => a.status === 'late').length
  const total = data.attendance.length
  const rate = total === 0 ? 0 : Math.round((present / total) * 100)
  return { present, absent, late, total, rate }
}

export function getCertificateEligibility(data: PortalDashboardData) {
  const stats = getAttendanceStats(data)
  const allCompleted = data.sessions.every(s => s.status === 'completed')
  const eligible = stats.rate >= 80 && allCompleted
  const sessionsRemaining = data.sessions.filter(s => s.status === 'upcoming').length
  return { eligible, sessionsRemaining, attendanceMet: stats.rate >= 80 }
}

export function getNextSession(data: PortalDashboardData): PortalSession | null {
  return data.sessions.find(s => s.status === 'upcoming') || null
}

export function getSessionsRemaining(data: PortalDashboardData): number {
  return data.sessions.filter(s => s.status === 'upcoming').length
}

// ── Portal Dashboard Mock Data ───────────────────────────────────

export const portalDashboard: PortalDashboardData = {
  student: {
    id: 'PS-MENT-3218',
    name: 'John Kimaro',
    email: 'john.kimaro@example.com',
    phone: '+255 712 345 678',
    photo: '',
    program: 'Leadership Excellence Program',
    cohort: 'October 2026 Cohort',
    mentor: { name: 'Sarah Johnson', role: 'Career Development Coach', photo: '' },
    learningMode: 'Online',
    enrollmentDate: '2026-10-06',
    expectedCompletion: '2026-11-28',
    status: 'active',
  },

  sessions: [
    { id: 's01', title: 'Orientation & Introduction', trainer: 'Sarah Johnson', date: '2026-10-06', time: '7:00 PM', meetingLink: 'https://meet.google.com/abc', materialsUrl: '#', status: 'completed', type: 'class' },
    { id: 's02', title: 'Communication Skills 101', trainer: 'Sarah Johnson', date: '2026-10-08', time: '7:00 PM', meetingLink: 'https://meet.google.com/abc', materialsUrl: '#', status: 'completed', type: 'class' },
    { id: 's03', title: 'Goal Setting Workshop', trainer: 'James Mwangi', date: '2026-10-13', time: '7:00 PM', meetingLink: 'https://meet.google.com/abc', materialsUrl: '#', status: 'completed', type: 'workshop' },
    { id: 's04', title: 'Resume Building Masterclass', trainer: 'Sarah Johnson', date: '2026-10-15', time: '7:00 PM', meetingLink: 'https://meet.google.com/abc', materialsUrl: '#', status: 'completed', type: 'class' },
    { id: 's05', title: 'Personal Branding', trainer: 'Grace Kimaro', date: '2026-10-20', time: '7:00 PM', meetingLink: 'https://meet.google.com/abc', materialsUrl: '#', status: 'completed', type: 'class' },
    { id: 's06', title: 'Leadership Foundations', trainer: 'James Mwangi', date: '2026-10-22', time: '7:00 PM', meetingLink: 'https://meet.google.com/abc', materialsUrl: '#', status: 'completed', type: 'class' },
    { id: 's07', title: 'Professional Communication', trainer: 'Sarah Johnson', date: '2026-10-27', time: '7:00 PM', meetingLink: 'https://meet.google.com/abc', materialsUrl: '#', status: 'upcoming', type: 'class' },
    { id: 's08', title: 'Leadership Skills Workshop', trainer: 'James Mwangi', date: '2026-10-28', time: '10:00 AM', venue: 'PeakSkills Hub, Dar es Salaam', materialsUrl: '#', status: 'upcoming', type: 'workshop' },
    { id: 's09', title: 'Mid-Term Assignment', trainer: 'Sarah Johnson', date: '2026-10-31', time: '11:59 PM', materialsUrl: '#', status: 'upcoming', type: 'assignment' },
    { id: 's10', title: 'Final Presentation', trainer: 'Sarah Johnson', date: '2026-11-03', time: '7:00 PM', meetingLink: 'https://meet.google.com/abc', materialsUrl: '#', status: 'upcoming', type: 'class' },
  ],

  attendance: [
    { sessionId: 's01', status: 'present' },
    { sessionId: 's02', status: 'present' },
    { sessionId: 's03', status: 'present' },
    { sessionId: 's04', status: 'late' },
    { sessionId: 's05', status: 'present' },
    { sessionId: 's06', status: 'absent' },
  ],

  journey: [
    { label: 'Registration', status: 'completed' },
    { label: 'Orientation', status: 'completed' },
    { label: 'Module 1', status: 'completed' },
    { label: 'Module 2', status: 'completed' },
    { label: 'Module 3', status: 'current' },
    { label: 'Module 4', status: 'upcoming' },
    { label: 'Certificate', status: 'upcoming' },
  ],

  announcements: [
    { id: 'a1', message: 'New learning materials uploaded for Professional Communication.', date: '2026-10-26', unread: true },
    { id: 'a2', message: 'Meeting time changed: Leadership Skills Workshop moved to 10 AM.', date: '2026-10-25', unread: true },
    { id: 'a3', message: 'Mid-Term assignment deadline extended to October 31.', date: '2026-10-24', unread: false },
    { id: 'a4', message: 'Congratulations! You completed Module 2 successfully.', date: '2026-10-22', unread: false },
  ],

  badges: [
    { id: 'b1', label: 'Perfect Attendance', icon: 'CalendarCheck', earned: false },
    { id: 'b2', label: 'First Module', icon: 'BookOpen', earned: true },
    { id: 'b3', label: 'Leadership Star', icon: 'Star', earned: true },
    { id: 'b4', label: 'Course Champion', icon: 'Trophy', earned: false },
    { id: 'b5', label: 'Certificate Ready', icon: 'Award', earned: false },
  ],

  cohort: {
    name: 'October 2026 Leadership Cohort',
    totalStudents: 25,
    activeStudents: 18,
    startDate: '2026-10-06',
    expectedGraduation: '2026-11-28',
  },
}

// Keep backward compatibility
export const dashboardMock = {
  studentName: portalDashboard.student.name,
  completionPct: getCompletionPct(portalDashboard),
  attendancePct: getAttendanceStats(portalDashboard).rate,
  nextSession: { day: 'Tuesday', time: '7:00 PM' },
  mentor: { name: portalDashboard.student.mentor.name, avatar: '' },
  learningMode: portalDashboard.student.learningMode,
  upcomingClass: {
    title: getNextSession(portalDashboard)?.title || '',
    platform: 'Google Meet',
    link: '#',
  },
  completedLessons: portalDashboard.sessions.filter(s => s.status === 'completed').length,
  totalLessons: portalDashboard.sessions.length,
  certificatesEarned: 0,
  announcements: portalDashboard.announcements.map(a => ({ title: a.message, date: a.date })),
  messages: [
    { from: 'Sarah Johnson', preview: 'Great work on your last assignment! I have some feedback...', time: '2h ago' },
    { from: 'PeakSkills Admin', preview: 'Your certificate for CV Writing is ready for download.', time: '1d ago' },
  ],
}

// ── How It Works Steps ────────────────────────────────────────────

export const howItWorksSteps: HowItWorksStep[] = [
  { step: 1, title: 'Create Account', description: 'Sign up with your email to get started on the PeakSkills platform.', icon: 'UserPlus' },
  { step: 2, title: 'Complete Student Profile', description: 'Fill in your education, career goals, and learning preferences.', icon: 'ClipboardList' },
  { step: 3, title: 'Choose Learning Path', description: 'Browse our mentorship programs and select the one that fits your goals.', icon: 'Compass' },
  { step: 4, title: 'Select Online or Physical Class', description: 'Pick your preferred learning mode and choose a cohort that matches your schedule.', icon: 'Monitor' },
  { step: 5, title: 'Administrator Reviews Registration', description: 'Our team reviews your application to ensure the best fit for your development.', icon: 'ShieldCheck' },
  { step: 6, title: 'Receive Approval Email', description: 'Get notified of your acceptance with instructions on next steps.', icon: 'MailCheck' },
  { step: 7, title: 'Access Student Dashboard', description: 'Log into your personalized dashboard to view classes and track your progress.', icon: 'LayoutDashboard' },
  { step: 8, title: 'Attend Classes & Track Progress', description: 'Join sessions, complete assignments, and earn your certificate of completion.', icon: 'GraduationCap' },
]

// ── Learning Paths ────────────────────────────────────────────────

export const learningPaths: LearningPath[] = [
  {
    id: 'lp-01',
    title: 'Career Readiness',
    slug: 'career-readiness',
    description: 'Build foundational skills for entering the professional world with confidence. Learn workplace etiquette, time management, and professional behavior.',
    image: '/mentorship/career_readiness.jpg',
    duration: '6 Weeks',
    format: 'Hybrid',
    mentor: 'Sarah Johnson',
    level: 'Beginner',
    category: 'Career Development',
  },
  {
    id: 'lp-02',
    title: 'Interview Preparation',
    slug: 'interview-preparation',
    description: 'Master the art of job interviews with mock sessions, body language coaching, and strategies for answering tough questions.',
    image: '/mentorship/interview_prep.jpg',
    duration: '4 Weeks',
    format: 'Online',
    mentor: 'James Mwangi',
    level: 'Beginner',
    category: 'Career Development',
  },
  {
    id: 'lp-03',
    title: 'CV & Resume Writing',
    slug: 'cv-resume-writing',
    description: 'Create compelling resumes and cover letters that get noticed. Learn ATS optimization and professional formatting.',
    image: '/mentorship/cv_writing.jpg',
    duration: '3 Weeks',
    format: 'Online',
    mentor: 'Amina Rashid',
    level: 'Beginner',
    category: 'Career Development',
  },
  {
    id: 'lp-04',
    title: 'Professional Communication',
    slug: 'professional-communication',
    description: 'Develop clear, confident communication skills for presentations, meetings, emails, and professional networking.',
    image: '/mentorship/professional_comm.jpg',
    duration: '5 Weeks',
    format: 'Hybrid',
    mentor: 'David Ochieng',
    level: 'Intermediate',
    category: 'Soft Skills',
  },
  {
    id: 'lp-05',
    title: 'Leadership for Young Professionals',
    slug: 'leadership-young-professionals',
    description: 'Develop essential leadership qualities early in your career. Learn team management, decision-making, and strategic thinking.',
    image: '/mentorship/leadership_yp.jpg',
    duration: '8 Weeks',
    format: 'Physical',
    mentor: 'Grace Kimaro',
    level: 'Intermediate',
    category: 'Leadership',
  },
  {
    id: 'lp-06',
    title: 'Entrepreneurship',
    slug: 'entrepreneurship',
    description: 'Turn your business ideas into reality. Learn business planning, funding strategies, market research, and startup fundamentals.',
    image: '/mentorship/entrepreneurship.jpg',
    duration: '10 Weeks',
    format: 'Hybrid',
    mentor: 'Michael Banda',
    level: 'Intermediate',
    category: 'Business',
  },
  {
    id: 'lp-07',
    title: 'Digital Skills',
    slug: 'digital-skills',
    description: 'Master essential digital tools and platforms. From productivity software to data analysis and digital marketing fundamentals.',
    image: '/mentorship/digital_skills.jpg',
    duration: '6 Weeks',
    format: 'Online',
    mentor: 'Fatima Hassan',
    level: 'Beginner',
    category: 'Technology',
  },
  {
    id: 'lp-08',
    title: 'Personal Branding',
    slug: 'personal-branding',
    description: 'Build a powerful personal brand. Learn to leverage LinkedIn, create your professional story, and stand out in your industry.',
    image: '/mentorship/personal_branding.jpg',
    duration: '4 Weeks',
    format: 'Online',
    mentor: 'Rose Makundi',
    level: 'Beginner',
    category: 'Career Development',
  },
]

// ── Learning Cohorts ──────────────────────────────────────────────

export const learningCohorts: LearningCohort[] = [
  {
    id: 'co-01',
    name: 'July 2026 Intake',
    learningPathId: 'lp-01',
    seatsTotal: 25,
    seatsAvailable: 8,
    startDate: '2026-07-14',
    endDate: '2026-08-22',
    schedule: 'Weekdays',
    mentor: 'Sarah Johnson',
    mode: 'Hybrid',
    status: 'Almost Full',
  },
  {
    id: 'co-02',
    name: 'August 2026 Weekend Batch',
    learningPathId: 'lp-01',
    seatsTotal: 18,
    seatsAvailable: 18,
    startDate: '2026-08-01',
    endDate: '2026-09-13',
    schedule: 'Weekends',
    mentor: 'Sarah Johnson',
    mode: 'Physical',
    status: 'Open',
  },
  {
    id: 'co-03',
    name: 'September Evening Online Batch',
    learningPathId: 'lp-02',
    seatsTotal: 40,
    seatsAvailable: 32,
    startDate: '2026-09-01',
    endDate: '2026-09-28',
    schedule: 'Evenings',
    mentor: 'James Mwangi',
    mode: 'Online',
    status: 'Open',
  },
  {
    id: 'co-04',
    name: 'October 2026 Leadership Cohort',
    learningPathId: 'lp-05',
    seatsTotal: 20,
    seatsAvailable: 3,
    startDate: '2026-10-06',
    endDate: '2026-11-28',
    schedule: 'Weekdays',
    mentor: 'Grace Kimaro',
    mode: 'Physical',
    status: 'Almost Full',
  },
  {
    id: 'co-05',
    name: 'November Digital Skills Fast-Track',
    learningPathId: 'lp-07',
    seatsTotal: 50,
    seatsAvailable: 45,
    startDate: '2026-11-02',
    endDate: '2026-12-14',
    schedule: 'Evenings',
    mentor: 'Fatima Hassan',
    mode: 'Online',
    status: 'Open',
  },
  {
    id: 'co-06',
    name: 'December Entrepreneurship Bootcamp',
    learningPathId: 'lp-06',
    seatsTotal: 15,
    seatsAvailable: 0,
    startDate: '2026-12-01',
    endDate: '2027-02-07',
    schedule: 'Weekends',
    mentor: 'Michael Banda',
    mode: 'Hybrid',
    status: 'Closed',
  },
]

// ── FAQ ───────────────────────────────────────────────────────────

export const faqItems: FAQItem[] = [
  {
    id: 'faq-01',
    question: 'How do I register for a mentorship program?',
    answer: 'Click the "Apply Now" button on this page and fill out the Student Application Form. Once submitted, our team will review your application and send you an approval email within 2-3 business days.',
  },
  {
    id: 'faq-02',
    question: 'Can I study online?',
    answer: 'Yes! Many of our programs are available in online, physical, or hybrid formats. When applying, you can choose your preferred learning mode. Online classes are conducted via Google Meet or Zoom with live instructor sessions.',
  },
  {
    id: 'faq-03',
    question: 'How are online classes conducted?',
    answer: 'Online classes are conducted through live video sessions on Google Meet or Zoom. Each session is interactive with Q&A, group discussions, and breakout rooms. Recordings are available for 48 hours after each session for review.',
  },
  {
    id: 'faq-04',
    question: 'Will I receive a certificate?',
    answer: 'Yes. Upon completing the required attendance percentage and finishing all assignments, you will receive a PeakSkills Certificate of Completion with a unique verification code and digital badge.',
  },
  {
    id: 'faq-05',
    question: 'Can I switch from online to physical classes?',
    answer: 'Yes, you can request a mode switch by contacting your program coordinator. Availability depends on seat capacity in the physical cohort. Switches are processed within 5 business days.',
  },
  {
    id: 'faq-06',
    question: 'What are the requirements to earn a certificate?',
    answer: 'You must maintain at least 80% attendance, complete all required assignments, and participate in the final project or assessment. Your mentor will track your progress through the student dashboard.',
  },
  {
    id: 'faq-07',
    question: 'Are there any prerequisites for the programs?',
    answer: 'Most beginner-level programs have no prerequisites. Intermediate programs may require basic knowledge in the subject area. Check individual program descriptions for specific requirements.',
  },
  {
    id: 'faq-08',
    question: 'How much do the programs cost?',
    answer: 'Program fees vary by duration and format. Pricing details are shared after your application is approved. PeakSkills occasionally offers scholarships and early-bird discounts for qualifying students.',
  },
  {
    id: 'faq-09',
    question: 'Can I join multiple programs at the same time?',
    answer: 'We recommend focusing on one program at a time for the best learning experience. However, if schedules allow, you may enroll in up to two non-overlapping programs with coordinator approval.',
  },
]


// ── Registration Flow Steps ───────────────────────────────────────

export const registrationFlowSteps = [
  { step: 1, title: 'Student Submits Application', description: 'Student fills out the application form with personal, education, and career details.', icon: 'FileText' },
  { step: 2, title: 'Email Verification', description: 'Student verifies their email address through a confirmation link.', icon: 'MailCheck' },
  { step: 3, title: 'Admin Receives Notification', description: 'PeakSkills admin team is notified of the new application.', icon: 'Bell' },
  { step: 4, title: 'Admin Reviews Application', description: 'Admin reviews student qualifications and program fit.', icon: 'ClipboardCheck' },
  { step: 5, title: 'Admin Approves or Rejects', description: 'Decision is made based on eligibility and seat availability.', icon: 'CheckCircle' },
  { step: 6, title: 'Student Receives Email', description: 'Approval or feedback email is sent to the student.', icon: 'Mail' },
  { step: 7, title: 'Student Can Login', description: 'Approved students gain access to the PeakSkills platform.', icon: 'LogIn' },
  { step: 8, title: 'Student Dashboard Available', description: 'Full dashboard with classes, progress tracking, and resources becomes accessible.', icon: 'LayoutDashboard' },
]

// ── Hero Stats ────────────────────────────────────────────────────

export const heroStats = [
  { label: 'Students Mentored', value: '500+', icon: 'Users' },
  { label: 'Industry Experts', value: '20+', icon: 'Award' },
  { label: 'Online & Physical Classes', value: '50+', icon: 'BookOpen' },
  { label: 'Career Guidance', value: '1-on-1', icon: 'Target' },
  { label: 'Certificate of Completion', value: '✓', icon: 'BadgeCheck' },
]
