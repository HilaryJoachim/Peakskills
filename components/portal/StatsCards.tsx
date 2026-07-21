'use client'

import { BookOpen, CalendarCheck, TrendingUp, User, MessageSquare, Monitor, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function StatsCards({ 
  student,
  completionPct,
  remainingSessions,
  totalSessions,
  attendedSessions
}: { 
  student: any;
  completionPct: number;
  remainingSessions: number;
  totalSessions: number;
  attendedSessions: number;
}) {
  const [required, setRequired] = useState(80)

  useEffect(() => {
    const handleSettingsUpdate = () => {
      const saved = localStorage.getItem('attendance_threshold')
      if (saved) {
        setRequired(parseInt(saved, 10))
      }
    }

    handleSettingsUpdate()
    window.addEventListener('settingsUpdated', handleSettingsUpdate)
    window.addEventListener('storage', handleSettingsUpdate)

    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate)
      window.removeEventListener('storage', handleSettingsUpdate)
    }
  }, [])

  const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0

  const modeBadge = student.learningMode === 'Online'
    ? { bg: '#EFF6FF', color: '#0077B6' }
    : student.learningMode === 'Physical'
      ? { bg: '#FEF3C7', color: '#b45309' }
      : { bg: '#F0FDF4', color: '#15803d' }

  return (
    <>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

        {/* My Program */}
        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', color: '#0077B6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} />
            </div>
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              My Program
            </span>
          </div>
          <h4 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1D2430', margin: '0 0 6px', lineHeight: 1.3 }}>
            {student.program}
          </h4>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: '0 0 10px' }}>
            {student.cohort}
          </p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '20px', background: modeBadge.bg, color: modeBadge.color, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '11px' }}>
            {student.learningMode === 'Online' ? <Monitor size={11} /> : <MapPin size={11} />}
            {student.learningMode}
          </span>
        </div>

        {/* Attendance */}
        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#DCFCE7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarCheck size={20} />
            </div>
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Attendance
            </span>
          </div>
          <h4 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', color: attendanceRate >= required ? '#15803d' : '#b45309', margin: '0 0 8px' }}>
            {attendanceRate}%
          </h4>
          <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
            <div style={{ height: '100%', width: `${attendanceRate}%`, background: attendanceRate >= required ? 'linear-gradient(90deg, #15803d, #22c55e)' : 'linear-gradient(90deg, #b45309, #f59e0b)', borderRadius: '3px', transition: 'width 1s ease' }} />
          </div>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: 0 }}>
            {attendedSessions} present of {totalSessions} sessions
          </p>
        </div>

        {/* Completion */}
        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={20} />
            </div>
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Completion
            </span>
          </div>
          <h4 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', color: '#b45309', margin: '0 0 8px' }}>
            {completionPct}%
          </h4>
          <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
            <div style={{ height: '100%', width: `${completionPct}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', borderRadius: '3px', transition: 'width 1s ease' }} />
          </div>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: 0 }}>
            {remainingSessions} sessions remaining
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
