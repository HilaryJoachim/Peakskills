'use client'

import { useState } from 'react'
import { BookOpen, FileText, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react'

export default function CurriculumList({ curriculum }: { curriculum: any[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    curriculum.reduce((acc, mod) => ({ ...acc, [mod.id]: true }), {})
  )

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  if (!curriculum || curriculum.length === 0) {
    return (
      <div style={{ background: '#ffffff', border: '1px solid #EEF1F5', borderRadius: '12px', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: '#F4F7FA', color: '#0077B6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <BookOpen size={32} />
        </div>
        <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '18px', color: '#1D2430', margin: '0 0 8px' }}>
          No Active Classes Yet
        </h3>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A', maxWidth: '400px', margin: '0 auto' }}>
          Your mentor is currently setting up your curriculum. Course materials will appear here once the cohort officially begins.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {curriculum.map((module, index) => (
        <div key={module.id} style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(221, 228, 236, 0.6)', overflow: 'hidden', boxShadow: '0 4px 24px rgba(29,36,48,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
          
          {/* Header */}
          <div 
            onClick={() => toggle(module.id)}
            style={{ padding: '24px 32px', background: '#ffffff', borderBottom: expanded[module.id] ? '1px solid rgba(221, 228, 236, 0.6)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', boxShadow: '0 4px 12px rgba(15, 175, 175, 0.2)' }}>
                {index + 1}
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 600, color: '#0F172A', fontFamily: 'IBM Plex Sans, sans-serif' }}>{module.title}</h4>
                {module.description && <p style={{ margin: 0, fontSize: '14px', color: '#64748B', fontFamily: 'Source Sans 3, sans-serif' }}>{module.description}</p>}
              </div>
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s', transform: expanded[module.id] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <ChevronDown size={18} color="#64748B" />
            </div>
          </div>

          {/* Content */}
          {expanded[module.id] && (
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', background: '#FAFAFA' }}>
              
              {/* Materials */}
              <div>
                <h5 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <LinkIcon size={16} color="#0077B6" /> Course Materials
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {module.course_materials?.length === 0 && <span style={{ fontSize: '14px', color: '#94A3B8' }}>No materials available yet.</span>}
                  {module.course_materials?.map((mat: any) => (
                    <a key={mat.id} href={mat.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(221, 228, 236, 0.8)', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#0077B6'; e.currentTarget.style.transform = 'translateX(4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(221, 228, 236, 0.8)'; e.currentTarget.style.transform = 'translateX(0)' }}>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: '#0077B6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileText size={18} color="#0077B6" /> {mat.title}
                      </div>
                      <span style={{ fontSize: '12px', background: '#F1F5F9', color: '#475569', padding: '6px 12px', borderRadius: '20px', fontWeight: 600, letterSpacing: '0.05em' }}>{mat.type}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(221, 228, 236, 0.6)' }} />

              {/* Assignments */}
              <div>
                <h5 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <BookOpen size={16} color="#D97706" /> Assignments & Tasks
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {module.assignments?.length === 0 && <span style={{ fontSize: '14px', color: '#94A3B8' }}>No assignments available yet.</span>}
                  {module.assignments?.map((ass: any) => (
                    <div key={ass.id} style={{ padding: '20px', background: '#FFFBEB', borderRadius: '12px', border: '1px solid #FDE68A', boxShadow: '0 2px 8px rgba(217, 119, 6, 0.05)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#F59E0B' }} />
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#92400E' }}>{ass.title}</div>
                      <div style={{ fontSize: '14px', color: '#B45309', marginTop: '8px', lineHeight: 1.6 }}>{ass.description}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      ))}
    </div>
  )
}
