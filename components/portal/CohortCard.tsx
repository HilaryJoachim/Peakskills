'use client'

import { portalDashboard } from '@/lib/mentorshipData'
import { Users, Calendar } from 'lucide-react'

export default function CohortCard() {
  const { cohort } = portalDashboard

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #EEF1F5', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
      <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: '0 0 16px' }}>
        My Cohort
      </h3>

      <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', color: '#0077B6', margin: '0 0 16px' }}>
        {cohort.name}
      </p>

      {/* Avatar row */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: ['#0077B6', '#0FAFAF', '#6d28d9', '#15803d', '#b45309'][i],
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '11px',
              marginLeft: i === 0 ? 0 : '-8px',
              border: '2px solid #ffffff',
              zIndex: 5 - i,
            }}
          >
            {['JK', 'AM', 'GK', 'FM', 'LN'][i]}
          </div>
        ))}
        <span style={{ marginLeft: '10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>
          +{cohort.totalStudents - 5} more
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={14} style={{ color: '#A9B4C2' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Students</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430' }}>
            {cohort.activeStudents} active / {cohort.totalStudents}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={14} style={{ color: '#A9B4C2' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Start</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430' }}>
            {new Date(cohort.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={14} style={{ color: '#A9B4C2' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Graduation</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430' }}>
            {new Date(cohort.expectedGraduation).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  )
}
