'use client'

import { BookOpen, ClipboardList, Presentation, FileText, Video } from 'lucide-react'

const resources = [
  { title: 'Course Materials', desc: 'Syllabus & handouts', icon: BookOpen, color: '#0077B6', bg: '#EFF6FF' },
  { title: 'Assignments', desc: 'Tasks & submissions', icon: ClipboardList, color: '#6d28d9', bg: '#F3E8FF' },
  { title: 'Presentations', desc: 'Slides & decks', icon: Presentation, color: '#b45309', bg: '#FEF3C7' },
  { title: 'Reading Notes', desc: 'Articles & guides', icon: FileText, color: '#15803d', bg: '#DCFCE7' },
  { title: 'Recorded Sessions', desc: 'Watch past classes', icon: Video, color: '#dc2626', bg: '#FEE2E2' },
]

export default function LearningResources() {
  return (
    <>
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #EEF1F5', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: '0 0 20px' }}>
          Learning Resources
        </h3>

        <div className="resources-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {resources.map(res => {
            const Icon = res.icon
            return (
              <button
                key={res.title}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #F1F5F9',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = res.bg; e.currentTarget.style.borderColor = res.color + '30' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#F1F5F9' }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: res.bg,
                    color: res.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430', margin: '0 0 2px' }}>
                    {res.title}
                  </h4>
                  <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#5C6B7A', margin: 0 }}>
                    {res.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .resources-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .resources-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
