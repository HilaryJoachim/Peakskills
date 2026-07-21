'use client'

import { dashboardMock } from '@/lib/mentorshipData'
import {
  LayoutDashboard, BookOpen, ClipboardList, CalendarCheck,
  Award, MessageSquare, User, TrendingUp, Clock,
  Video, Bell, ChevronRight, Download, ShieldCheck,
} from 'lucide-react'

const sidebarItems = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
  { icon: <BookOpen size={18} />, label: 'My Classes', active: false },
  { icon: <ClipboardList size={18} />, label: 'Assignments', active: false },
  { icon: <CalendarCheck size={18} />, label: 'Attendance', active: false },
  { icon: <Award size={18} />, label: 'Certificates', active: false },
  { icon: <MessageSquare size={18} />, label: 'Messages', active: false },
  { icon: <User size={18} />, label: 'Profile', active: false },
]

export default function DashboardPreview() {
  const d = dashboardMock

  return (
    <>
      <section style={{ background: '#F4F7FA', padding: '96px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '12px', color: '#0FAFAF', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>
              Student Experience
            </p>
            <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1.15, color: '#1D2430', margin: '0 0 14px' }}>
              Your Student Dashboard
            </h2>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px', color: '#5C6B7A', margin: 0, maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              After approval, you&rsquo;ll get access to a personalized dashboard to track your progress, attend classes, and earn certificates.
            </p>
          </div>

          {/* Browser chrome mock */}
          <div style={{
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(29,36,48,0.18)',
            border: '1px solid #DDE4EC',
          }}>
            {/* Browser bar */}
            <div style={{
              background: '#1D2430', padding: '12px 20px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28CA41' }} />
              <div style={{
                flex: 1, marginLeft: '12px', background: 'rgba(255,255,255,0.08)',
                borderRadius: '6px', padding: '6px 14px',
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#A9B4C2',
              }}>
                app.peakskills.co.tz/dashboard
              </div>
            </div>

            {/* Dashboard body */}
            <div className="dash-layout" style={{ display: 'flex', background: '#fff', minHeight: '540px' }}>
              {/* Sidebar */}
              <aside className="dash-sidebar" style={{
                width: '220px', background: '#1D2430', padding: '24px 0',
                flexShrink: 0, display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', margin: '0 0 2px' }}>
                    PeakSkills
                  </p>
                  <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#A9B4C2', margin: 0 }}>
                    Student Portal
                  </p>
                </div>
                <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {sidebarItems.map(item => (
                    <div
                      key={item.label}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px', borderRadius: '8px',
                        background: item.active ? 'rgba(0,119,182,0.2)' : 'transparent',
                        color: item.active ? '#4DD0E1' : '#A9B4C2',
                        fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: item.active ? 600 : 400,
                        fontSize: '14px', cursor: 'default',
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </nav>
              </aside>

              {/* Main content */}
              <main style={{ flex: 1, padding: '28px 32px', overflow: 'auto' }}>
                {/* Welcome */}
                <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '22px', color: '#1D2430', margin: '0 0 4px' }}>
                  Welcome back, {d.studentName} 👋
                </h2>
                <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A', margin: '0 0 28px' }}>
                  Here&rsquo;s an overview of your learning progress.
                </p>

                {/* Stats row */}
                <div className="dash-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
                  {/* Completion */}
                  <StatCard icon={<TrendingUp size={20} />} label="Overall Completion" value={`${d.completionPct}%`} accent="#0077B6" pct={d.completionPct} />
                  {/* Attendance */}
                  <StatCard icon={<CalendarCheck size={20} />} label="Attendance" value={`${d.attendancePct}%`} accent="#2ECC40" pct={d.attendancePct} />
                  {/* Next session */}
                  <div style={{
                    background: '#F4F7FA', borderRadius: '10px', padding: '18px',
                    display: 'flex', flexDirection: 'column', gap: '8px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0FAFAF' }}>
                      <Clock size={20} />
                      <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Next Session
                      </span>
                    </div>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1D2430', margin: 0 }}>
                      {d.nextSession.day}
                    </p>
                    <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: 0 }}>
                      {d.nextSession.time}
                    </p>
                  </div>
                  {/* Mentor */}
                  <div style={{
                    background: '#F4F7FA', borderRadius: '10px', padding: '18px',
                    display: 'flex', flexDirection: 'column', gap: '8px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0FAFAF' }}>
                      <User size={20} />
                      <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Mentor
                      </span>
                    </div>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: 0 }}>
                      {d.mentor.name}
                    </p>
                    <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: 0 }}>
                      {d.learningMode} Classes
                    </p>
                  </div>
                </div>

                {/* Upcoming class */}
                <div style={{
                  background: 'linear-gradient(135deg, #0077B6, #4DD0E1)',
                  borderRadius: '12px', padding: '20px 24px', marginBottom: '24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: '16px',
                }}>
                  <div>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>
                      Upcoming Class
                    </p>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', margin: '0 0 4px' }}>
                      {d.upcomingClass.title}
                    </p>
                    <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Video size={14} /> {d.upcomingClass.platform}
                    </p>
                  </div>
                  <button style={{
                    background: '#fff', color: '#0077B6', padding: '10px 24px',
                    borderRadius: '8px', border: 'none', fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    Join Meeting <ChevronRight size={16} />
                  </button>
                </div>

                {/* Bottom grid: progress + certificates + attendance */}
                <div className="dash-bottom" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  {/* Completed lessons */}
                  <div style={{ background: '#F4F7FA', borderRadius: '10px', padding: '18px' }}>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#5C6B7A', margin: '0 0 10px' }}>
                      Completed Lessons
                    </p>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '22px', color: '#1D2430', margin: '0 0 8px' }}>
                      {d.completedLessons} / {d.totalLessons}
                    </p>
                    <div style={{ height: '6px', background: '#DDE4EC', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${(d.completedLessons / d.totalLessons) * 100}%`,
                        background: 'linear-gradient(to right, #0077B6, #4DD0E1)', borderRadius: '3px',
                      }} />
                    </div>
                  </div>

                  {/* Certificate */}
                  <div style={{ background: '#F4F7FA', borderRadius: '10px', padding: '18px' }}>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#5C6B7A', margin: '0 0 10px' }}>
                      Certificates Earned
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'linear-gradient(135deg, #2ECC40, #4DD0E1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Award size={22} />
                      </div>
                      <div>
                        <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1D2430', margin: 0 }}>
                          {d.certificatesEarned} Certificate{d.certificatesEarned !== 1 ? 's' : ''}
                        </p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                          <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#0077B6', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            <Download size={12} /> Download PDF
                          </span>
                          <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#0FAFAF', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            <ShieldCheck size={12} /> Verify
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Announcements + Messages */}
                <div className="dash-bottom" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* Announcements */}
                  <div style={{ background: '#F4F7FA', borderRadius: '10px', padding: '18px' }}>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#5C6B7A', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Bell size={14} /> Announcements
                    </p>
                    {d.announcements.map((a, i) => (
                      <div key={i} style={{ padding: '8px 0', borderBottom: i < d.announcements.length - 1 ? '1px solid #E5E9EF' : 'none' }}>
                        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#1D2430', margin: '0 0 2px', lineHeight: 1.4 }}>
                          {a.title}
                        </p>
                        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '11px', color: '#A9B4C2', margin: 0 }}>
                          {a.date}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Messages */}
                  <div style={{ background: '#F4F7FA', borderRadius: '10px', padding: '18px' }}>
                    <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#5C6B7A', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={14} /> Recent Messages
                    </p>
                    {d.messages.map((m, i) => (
                      <div key={i} style={{ padding: '8px 0', borderBottom: i < d.messages.length - 1 ? '1px solid #E5E9EF' : 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430', margin: 0 }}>
                            {m.from}
                          </p>
                          <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '11px', color: '#A9B4C2' }}>
                            {m.time}
                          </span>
                        </div>
                        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#5C6B7A', margin: 0, lineHeight: 1.4 }}>
                          {m.preview}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1023px) {
          .dash-sidebar { display: none !important; }
          .dash-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .dash-stats { grid-template-columns: 1fr !important; }
          .dash-bottom { grid-template-columns: 1fr !important; }
          .dash-layout main { padding: 20px 16px !important; }
        }
      `}</style>
    </>
  )
}

/* ─── Stat card sub-component ─────────────────────────────────── */
function StatCard({ icon, label, value, accent, pct }: {
  icon: React.ReactNode; label: string; value: string; accent: string; pct: number
}) {
  return (
    <div style={{
      background: '#F4F7FA', borderRadius: '10px', padding: '18px',
      display: 'flex', flexDirection: 'column', gap: '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: accent }}>
        {icon}
        <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </span>
      </div>
      <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1D2430', margin: 0 }}>
        {value}
      </p>
      <div style={{ height: '5px', background: '#DDE4EC', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: accent, borderRadius: '3px',
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  )
}
