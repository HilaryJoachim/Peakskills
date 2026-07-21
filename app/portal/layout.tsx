import Sidebar from '@/components/portal/Sidebar'
import PaymentBanner from '@/components/portal/PaymentBanner'
import { AlertTriangle } from 'lucide-react'
import NotificationBell, { NotificationItem } from '@/components/portal/NotificationBell'
import { getStudentSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import IdleTimeout from '@/components/layout/IdleTimeout'

export const metadata = {
  title: 'Student Portal | PeakSkills',
  description: 'Manage your classes, attendance, and mentorship progress.',
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getStudentSession()

  // In local dev without DB or session, we just render children to not break the UI
  if (!session || !supabase) {
    return renderNormalLayout(children)
  }

  // Fetch student status
  const { data: student } = await supabase
    .from('students')
    .select('*, applications(full_name, program:programs(title))')
    .eq('id', session.studentId)
    .single()

  if (!student) {
    return renderNormalLayout(children)
  }

  const now = new Date()
  const deadline = student.payment_deadline ? new Date(student.payment_deadline) : null
  
  let currentStatus = student.status

  // Auto-suspend if deadline passed and unpaid
  if (currentStatus === 'Approved - Awaiting Payment' && deadline && now > deadline) {
    // Update DB (fire and forget)
    supabase.from('students').update({ status: 'Suspended' }).eq('id', student.id).then()
    currentStatus = 'Suspended'
  }

  if (currentStatus === 'Suspended') {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F7FA', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', maxWidth: '480px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <AlertTriangle size={48} color="#DC2626" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1D2430', margin: '0 0 16px' }}>
            Account Suspended
          </h2>
          <p style={{ color: '#5C6B7A', lineHeight: 1.6, marginBottom: '32px' }}>
            Your account has been temporarily suspended because the course fee has not yet been confirmed. Please contact PeakSkills Admissions or complete payment to restore access.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/contact" style={{ padding: '12px 24px', background: '#1D2430', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 600 }}>
              Contact Admissions
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isAwaitingPayment = currentStatus === 'Approved - Awaiting Payment'
  let daysRemaining = 0
  if (isAwaitingPayment && deadline) {
    daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24))
  }

  const appData = Array.isArray(student.applications) ? student.applications[0] : student.applications
  const studentName = appData?.full_name || 'Student'
  const studentId = student.id

  const dummyNotifications: NotificationItem[] = [
    {
      id: '1',
      title: 'New Session Scheduled',
      message: 'A new Live Session has been scheduled for tomorrow.',
      href: '/portal/schedule',
      isRead: false,
      date: '2 hours ago'
    },
    {
      id: '2',
      title: 'Course Material Added',
      message: 'Admin uploaded new course material. Click to view.',
      href: '/portal/classes',
      isRead: false,
      date: '1 day ago'
    },
    {
      id: '3',
      title: 'New Assignment',
      message: 'A new assignment has been added to your program.',
      href: '/portal/classes',
      isRead: false,
      date: '2 days ago'
    }
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F7FA' }}>
      <IdleTimeout />
      <Sidebar studentName={studentName} studentId={studentId} fullStudentId={session.studentId} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        
        {isAwaitingPayment && (
          <PaymentBanner daysRemaining={daysRemaining} />
        )}

        <header style={{ height: '72px', background: '#ffffff', borderBottom: '1px solid #EEF1F5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: '18px', color: '#1D2430' }}>
            {student?.applications?.program?.title || 'Student Portal'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <NotificationBell initialNotifications={dummyNotifications} />
          </div>
        </header>

        <main style={{ flex: 1, padding: '32px' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function renderNormalLayout(children: React.ReactNode) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F7FA' }}>
      <IdleTimeout />
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <header style={{ height: '72px', background: '#ffffff', borderBottom: '1px solid #EEF1F5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: '18px', color: '#1D2430' }}>
            Student Portal
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <NotificationBell initialNotifications={[]} />
          </div>
        </header>
        <main style={{ flex: 1, padding: '32px' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
