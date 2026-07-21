'use client'

import { BookOpen } from 'lucide-react'

export default function LearningTimeline({ sessions }: { sessions: any[] }) {
  if (!sessions || sessions.length === 0) return null

  // Create display labels like "Today", "Tomorrow", date for others
  const getLabel = (dateStr: string) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Tomorrow'
    return d.toLocaleDateString('en-US', { weekday: 'long' })
  }

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #EEF1F5', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
      <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: '0 0 24px' }}>
        Learning Timeline
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
        {/* Vertical connecting line */}
        <div style={{ position: 'absolute', left: '19px', top: '20px', bottom: '20px', width: '2px', background: '#F1F5F9' }} />

        {sessions.map((session, i) => {
          const Icon = BookOpen
          const label = getLabel(session.date)
          const isFirst = i === 0

          return (
            <div key={session.id} style={{ display: 'flex', gap: '16px', padding: '14px 0', position: 'relative' }}>
              {/* Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#EFF6FF',
                  color: '#0077B6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                  border: isFirst ? `2px solid #0077B6` : '2px solid transparent',
                }}
              >
                <Icon size={18} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h4 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', color: '#1D2430', margin: 0 }}>
                    {session.title}
                  </h4>
                  <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: isFirst ? '#0077B6' : '#A9B4C2' }}>
                    {label}
                  </span>
                </div>
                <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: 0 }}>
                  {session.time} • {session.trainer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
