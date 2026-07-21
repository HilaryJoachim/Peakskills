'use client'

import { useEffect, useState } from 'react'
import { getDashboardStats, getRecentApplications, getTodaysSessions } from './actions'
import { Users, FileText, Calendar, CheckCircle, Award, ChevronRight, Video, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const [st, apps, sess] = await Promise.all([
        getDashboardStats(),
        getRecentApplications(),
        getTodaysSessions(),
      ])
      setStats(st)
      setApplications(apps)
      setSessions(sess)
    }
    loadData()
  }, [])

  if (!stats) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#5C6B7A' }}>Loading dashboard...</div>
  }

  const statCards = [
    { label: 'Pending Apps', value: stats.pendingApplications, icon: FileText, color: '#3B82F6', bg: '#EFF6FF' },
    { label: 'Active Students', value: stats.activeStudents, icon: Users, color: '#10B981', bg: '#ECFDF5' },
    { label: "Today's Sessions", value: stats.todaysSessions, icon: Calendar, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Attendance Pending', value: stats.attendancePending, icon: CheckCircle, color: '#EF4444', bg: '#FEF2F2' },
    { label: 'Certificates Ready', value: stats.certificatesReady, icon: Award, color: '#8B5CF6', bg: '#F5F3FF' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '24px', color: '#F8FAFC', margin: 0 }}>
                  {stat.value}
                </h3>
              </div>
              <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#94A3B8', margin: 0, fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
        
        {/* Recent Applications */}
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px', color: '#F8FAFC', margin: 0 }}>
              Recent Applications
            </h3>
            <Link href="/admin/applications" style={{ fontSize: '13px', color: '#FCD34D', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '12px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Student</th>
                <th style={{ padding: '12px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Program</th>
                <th style={{ padding: '12px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#F8FAFC' }}>{app.full_name}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>{new Date(app.submitted_at).toLocaleDateString()}</p>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#F8FAFC' }}>{app.program?.title}</td>
                  <td style={{ padding: '16px 24px' }}>
                    {(() => {
                      const studentStatus = Array.isArray(app.student) ? app.student[0]?.status : app.student?.status
                      const finalStatus = studentStatus || app.status
                      let bg = '#FEF2F2', color = '#DC2626'
                      if (finalStatus === 'Application Submitted' || finalStatus === 'Under Review') { bg = '#FFFBEB'; color = '#D97706' }
                      else if (finalStatus === 'Approved' || finalStatus === 'Approved - Awaiting Payment') { bg = '#ECFDF5'; color = '#059669' }
                      else if (finalStatus === 'Active Student') { bg = '#EFF6FF'; color = '#2563EB' }
                      return (
                        <span style={{ 
                          padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                          background: bg, color: color
                        }}>
                          {finalStatus}
                        </span>
                      )
                    })()}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <Link href="/admin/applications" style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', fontWeight: 600, color: '#F8FAFC', textDecoration: 'none' }}>
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#94A3B8', fontSize: '14px' }}>
                    No recent applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Today's Sessions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px', color: '#F8FAFC', margin: 0 }}>
            Today&rsquo;s Sessions
          </h3>
          {sessions.map(session => (
            <div key={session.id} style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#F8FAFC', lineHeight: 1.4 }}>{session.title}</h4>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '12px' }}>
                  {session.time}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', fontSize: '13px', color: '#94A3B8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {session.venue === 'Virtual' ? <Video size={14} /> : <MapPin size={14} />}
                  {session.venue}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={14} />
                  {session.trainer}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {session.venue === 'Virtual' && (
                  <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                    <Video size={14} /> Open Meeting
                  </button>
                )}
                <Link href="/admin/attendance" style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#F8FAFC', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: '13px', textDecoration: 'none', textAlign: 'center' }}>
                  Mark Attendance
                </Link>
              </div>
            </div>
          ))}
          {sessions.length === 0 && (
            <div style={{ background: 'rgba(255, 255, 255, 0.015)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)', padding: '32px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
              No sessions scheduled for today.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
