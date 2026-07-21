'use client'

import { useState, useEffect } from 'react'
import { portalDashboard, getAttendanceStats } from '@/lib/mentorshipData'

export default function AttendanceCard({ 
  stats 
}: { 
  stats: { rate: number, present: number, absent: number, late: number, total: number } 
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
    
    // Also listen for storage event to sync across tabs
    window.addEventListener('storage', handleSettingsUpdate)

    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate)
      window.removeEventListener('storage', handleSettingsUpdate)
    }
  }, [])

  const isNew = (stats.present + stats.absent + stats.late) === 0

  const statusLabel = isNew ? 'On Track' : stats.rate >= (required + 10) ? 'Excellent' : stats.rate >= required ? 'On Track' : 'At Risk'
  const statusColor = isNew ? '#15803d' : stats.rate >= (required + 10) ? '#15803d' : stats.rate >= required ? '#b45309' : '#dc2626'
  const statusBg = isNew ? '#DCFCE7' : stats.rate >= (required + 10) ? '#DCFCE7' : stats.rate >= required ? '#FEF3C7' : '#FEE2E2'
  const barGradient = isNew ? 'linear-gradient(90deg, #DDE4EC, #DDE4EC)' : stats.rate >= required ? 'linear-gradient(90deg, #15803d, #22c55e)' : 'linear-gradient(90deg, #dc2626, #f87171)'

  return (
    <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: 0 }}>
          Attendance
        </h3>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: '20px',
            background: statusBg,
            color: statusColor,
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1D2430' }}>
            {stats.rate}%
          </span>
          <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#A9B4C2', alignSelf: 'flex-end' }}>
            Required: {required}%
          </span>
        </div>
        <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
          {/* Required threshold marker */}
          <div style={{ position: 'absolute', left: `${required}%`, top: 0, bottom: 0, width: '2px', background: '#A9B4C2', zIndex: 2 }} />
          <div style={{ height: '100%', width: isNew ? '0%' : `${stats.rate}%`, background: barGradient, borderRadius: '4px', transition: 'width 1s ease' }} />
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#15803d' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>Present</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '14px', color: '#1D2430' }}>{stats.present}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>Absent</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '14px', color: '#1D2430' }}>{stats.absent}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>Late</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '14px', color: '#1D2430' }}>{stats.late}</span>
        </div>
      </div>
    </div>
  )
}
