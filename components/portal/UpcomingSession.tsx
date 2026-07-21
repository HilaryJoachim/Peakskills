'use client'

import { Video, MapPin, Clock, Calendar, User, Download, Monitor } from 'lucide-react'

export default function UpcomingSession({ session }: { session: any }) {
  if (!session) return null

  const isOnline = session.venue === 'Virtual'

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #EEF1F5',
        padding: '28px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
        borderLeft: '4px solid #0077B6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: 0 }}>
          Upcoming Session
        </h3>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 12px',
            borderRadius: '20px',
            background: isOnline ? '#EFF6FF' : '#FEF3C7',
            color: isOnline ? '#0077B6' : '#b45309',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
          }}
        >
          {isOnline ? <Monitor size={12} /> : <MapPin size={12} />}
          {isOnline ? 'Online' : 'Physical'}
        </span>
      </div>

      {/* Session Info */}
      <h4 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1D2430', margin: '0 0 16px', lineHeight: 1.3 }}>
        {session.title}
      </h4>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={15} style={{ color: '#A9B4C2' }} />
          <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>
            {session.trainer}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={15} style={{ color: '#A9B4C2' }} />
          <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>
            {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={15} style={{ color: '#A9B4C2' }} />
          <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>
            {session.time}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            if (session.meeting_link) {
              window.open(session.meeting_link.startsWith('http') ? session.meeting_link : `https://${session.meeting_link}`, '_blank')
            }
          }}
          style={{
            padding: '11px 24px',
            borderRadius: '10px',
            border: 'none',
            background: isOnline ? 'linear-gradient(135deg, #0077B6, #0FAFAF)' : '#1D2430',
            color: '#fff',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,119,182,0.2)',
          }}
        >
          {isOnline ? <Video size={16} /> : <MapPin size={16} />}
          {isOnline ? 'Join Meeting' : 'View Venue'}
        </button>
      </div>
    </div>
  )
}
