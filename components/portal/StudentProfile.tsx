'use client'

import { portalDashboard } from '@/lib/mentorshipData'
import { User, Monitor, MapPin, Calendar, Hash } from 'lucide-react'

export default function StudentProfile({ student }: { student: any }) {


  const modeBadge = student.learningMode === 'Online'
    ? { bg: '#EFF6FF', color: '#0077B6', icon: Monitor }
    : { bg: '#FEF3C7', color: '#b45309', icon: MapPin }
  const ModeIcon = modeBadge.icon

  return (
    <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Avatar + Name */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0284C7, #0D9488)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '22px',
            marginBottom: '12px',
          }}
        >
          {student.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <h4 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1D2430', margin: '0 0 4px' }}>
          {student.name}
        </h4>
        <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>
          {student.email}
        </span>
      </div>

      {/* Info rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Hash size={14} style={{ color: '#A9B4C2' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Student ID</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430' }}>
            {student.id}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ModeIcon size={14} style={{ color: '#A9B4C2' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Learning Mode</span>
          </div>
          <span style={{ padding: '2px 10px', borderRadius: '20px', background: modeBadge.bg, color: modeBadge.color, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '11px' }}>
            {student.learningMode}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={14} style={{ color: '#A9B4C2' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Enrolled</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430' }}>
            {new Date(student.enrollmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={14} style={{ color: '#A9B4C2' }} />
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Completion</span>
          </div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430' }}>
            {new Date(student.expectedCompletion).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  )
}
