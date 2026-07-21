'use client'

import { portalDashboard } from '@/lib/mentorshipData'
import { Bell } from 'lucide-react'

export default function Announcements() {
  const { announcements } = portalDashboard

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #EEF1F5', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FEF3C7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={16} />
        </div>
        <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: 0 }}>
          Announcements
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {announcements.map((item, i) => (
          <div
            key={item.id}
            style={{
              padding: '14px 0',
              borderBottom: i < announcements.length - 1 ? '1px solid #F1F5F9' : 'none',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            {/* Unread dot */}
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: item.unread ? '#0FAFAF' : 'transparent',
                marginTop: '7px',
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#1D2430', margin: '0 0 4px', lineHeight: 1.5 }}>
                {item.message}
              </p>
              <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#A9B4C2' }}>
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
