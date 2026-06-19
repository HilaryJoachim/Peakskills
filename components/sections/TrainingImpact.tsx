'use client'

import { useState, useEffect, useRef } from 'react'
import { Landmark, Building2, GraduationCap, Globe2, Settings, Briefcase } from 'lucide-react'

/* ─── Types ──────────────────────────────────────────────── */
interface Industry {
  id: string
  icon: React.ReactNode
  label: string
  image: string
  imageAlt: string
  challenge: string
  solution: string
  outcome: string
  programs: string[]
}

/* ─── Data ───────────────────────────────────────────────── */
const INDUSTRIES: Industry[] = [
  {
    id: 'banking',
    icon: <Landmark size={15} strokeWidth={2.5} />,
    label: 'Banking & Finance',
    image: '/impact/banking.jpg',
    imageAlt: 'PeakSkills training session for banking professionals in Tanzania',
    challenge:
      'Banks needed to improve customer service consistency and employee professionalism across multiple branches while developing a stronger pipeline of branch-level leaders.',
    solution:
      'PeakSkills delivered tailored Customer Service Excellence and Leadership Development programs for frontline staff and branch managers, built around the specific challenges of retail banking in East Africa.',
    outcome:
      'Improved customer experience scores, measurable leadership growth across branches, and stronger team cohesion that reduced service escalations and staff turnover.',
    programs: ['Customer Service Excellence', 'Leadership Development', 'Branch Management'],
  },
  {
    id: 'government',
    icon: <Building2 size={15} strokeWidth={2.5} />,
    label: 'Government & Public Sector',
    image: '/impact/government.jpg',
    imageAlt: 'PeakSkills leadership workshop for government officials',
    challenge:
      'Government institutions faced challenges in building modern leadership capability, improving inter-departmental communication, and enhancing service delivery performance.',
    solution:
      'PeakSkills designed specialized Public Sector Leadership and Governance workshops focusing on accountability, strategic thinking, and people management for senior and mid-level civil servants.',
    outcome:
      'More effective decision-making at departmental level, improved staff motivation, and structured performance management systems adopted across participating ministries.',
    programs: ['Public Sector Leadership', 'Strategic Governance', 'Performance Management'],
  },
  {
    id: 'education',
    icon: <GraduationCap size={15} strokeWidth={2.5} />,
    label: 'Education & Universities',
    image: '/impact/education.jpg',
    imageAlt: 'Career readiness and professional development program for university students',
    challenge:
      'Universities struggled to prepare graduates with practical professional skills employers demand — communication, workplace ethics, and career readiness were significant gaps.',
    solution:
      'PeakSkills partnered with universities to deliver Career Readiness and Professional Skills programs that bridge the gap between academic learning and real workplace expectations.',
    outcome:
      'Graduates entered the workforce with stronger communication skills, professional conduct, and a clearer understanding of career development, improving graduate employment outcomes.',
    programs: ['Career Readiness', 'Work Ethics & Professionalism', 'Communication Skills'],
  },
  {
    id: 'ngo',
    icon: <Globe2 size={15} strokeWidth={2.5} />,
    label: 'NGOs & Development',
    image: '/impact/ngo.jpg',
    imageAlt: 'NGO capacity building workshop facilitated by PeakSkills',
    challenge:
      'NGOs needed stronger internal capacity — particularly in project management, stakeholder reporting, and organizational leadership to meet donor expectations and deliver programs effectively.',
    solution:
      'PeakSkills delivered NGO-specific Organizational Capacity Building programs covering program management, report writing, financial accountability, and people leadership for the development sector.',
    outcome:
      'Participating NGOs reported better project execution, stronger relationships with donors and partners, and improved internal team coordination and accountability systems.',
    programs: ['Organizational Capacity Building', 'Project Management', 'Report Writing'],
  },
  {
    id: 'manufacturing',
    icon: <Settings size={15} strokeWidth={2.5} />,
    label: 'Manufacturing & Industry',
    image: '/impact/manufacturing.jpg',
    imageAlt: 'Operational excellence and workforce skills training in a manufacturing setting',
    challenge:
      'Manufacturing companies faced productivity gaps, safety compliance issues, and supervisory skill deficits directly impacting operational output and staff performance on the production floor.',
    solution:
      'PeakSkills provided Operational Excellence and Supervisory Skills programs equipping factory supervisors and team leads with the management tools to drive performance at every level.',
    outcome:
      'Measurable improvements in supervisory effectiveness, reduced safety incidents, and improved shift productivity reported by participating companies within 90 days of training.',
    programs: ['Operational Excellence', 'Supervisory Skills', 'Safety & Compliance'],
  },
  {
    id: 'corporate',
    icon: <Briefcase size={15} strokeWidth={2.5} />,
    label: 'Corporate Organizations',
    image: '/impact/corporate.jpg',
    imageAlt: 'Executive leadership training workshop for corporate professionals',
    challenge:
      'Growing companies needed to build internal leadership capability, align teams around strategy, and improve cross-functional communication to sustain their growth trajectory.',
    solution:
      'PeakSkills delivered Executive Leadership and Strategic Alignment programs that helped senior teams think and operate more cohesively — with tools immediately applicable to their business.',
    outcome:
      'Stronger executive team alignment, improved inter-departmental collaboration, and a documented increase in leadership effectiveness scores in post-training assessments.',
    programs: ['Executive Leadership', 'Strategic Alignment', 'Team Effectiveness'],
  },
]


/* ─── Card wrapper with hover lift ──────────────────────── */
function Card({
  children,
  bg,
  border,
  glowColor,
  style,
}: {
  children: React.ReactNode
  bg: string
  border: string
  glowColor?: string
  style?: React.CSSProperties
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        border: `1.5px solid ${border}`,
        borderRadius: '20px',
        padding: '22px 24px',
        boxShadow: hovered
          ? glowColor
            ? `0 0 0 3px ${glowColor}33, 0 12px 32px rgba(0,0,0,0.14)`
            : '0 8px 24px rgba(0,0,0,0.10)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Card label row ─────────────────────────────────────── */
function CardLabel({ icon, label, iconBg, iconColor, labelColor }: {
  icon: React.ReactNode
  label: string
  iconBg: string
  iconColor: string
  labelColor: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px',
        background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke={iconColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      <span style={{
        fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800,
        fontSize: '11px', color: labelColor,
        textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>{label}</span>
    </div>
  )
}

/* ─── Main Section ───────────────────────────────────────── */
export default function TrainingImpact() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const [imgHovered, setImgHovered] = useState(false)
  const industry = INDUSTRIES[active]

  const switchTo = (idx: number) => {
    if (idx === active) return
    setFading(true)
    setTimeout(() => { setActive(idx); setFading(false) }, 320)
  }

  return (
    <section
      id="training-impact"
      aria-labelledby="impact-heading"
      style={{ background: '#0F172A', padding: '88px 24px' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <p style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700,
            fontSize: '12px', color: '#0077B6', textTransform: 'uppercase',
            letterSpacing: '0.13em', margin: '0 0 12px',
          }}>Proven Results</p>
          <h2 id="impact-heading" style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15,
            color: '#FFFFFF', margin: '0 0 14px',
          }}>
            Training That Creates{' '}
            <span style={{ color: '#0077B6' }}>Measurable Change</span>
          </h2>
          <p style={{
            fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px',
            color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.65,
          }}>
            Discover how PeakSkills helps organizations improve leadership, customer service,
            workforce performance, communication, and operational effectiveness.
          </p>
        </div>

        {/* ── Industry Tab Bar ── */}
        <div
          role="tablist"
          aria-label="Select an industry to view case study"
          style={{
            display: 'flex', gap: '6px', marginBottom: '36px',
            flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px',
          }}
        >
          {INDUSTRIES.map((ind, idx) => {
            const isActive = idx === active
            return (
              <button
                key={ind.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${ind.id}`}
                id={`tab-${ind.id}`}
                onClick={() => switchTo(idx)}
                style={{
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '8px',
                  border: isActive ? '1.5px solid #0077B6' : '1.5px solid rgba(255,255,255,0.15)',
                  background: isActive ? '#0077B6' : 'rgba(255,255,255,0.05)',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '12px',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 14px rgba(30,136,229,0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { if (!isActive) { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.3)'; el.style.color = '#ffffff' } }}
                onMouseLeave={e => { if (!isActive) { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.color = 'rgba(255,255,255,0.7)' } }}
              >
                <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{ind.icon}</span>
                {ind.label}
              </button>
            )
          })}
        </div>

        {/* ── 3-Column Content ── */}
        <div
          id={`panel-${industry.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${industry.id}`}
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity 0.32s ease, transform 0.32s ease',
          }}
        >
          <div className="impact-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            alignItems: 'stretch',
          }}>

            {/* ── LEFT: Challenge + Solution ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* CHALLENGE */}
              <div
                style={{
                  background: '#7C2D12',
                  borderRadius: '20px',
                  padding: '22px 24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.16)'; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(251,146,60,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: '11px', color: '#FB923C', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Challenge</span>
                </div>
                <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14.5px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.68, margin: 0 }}>
                  {industry.challenge}
                </p>
              </div>

              {/* SOLUTION */}
              <div
                style={{
                  background: '#1E3A8A',
                  borderRadius: '20px',
                  padding: '22px 24px',
                  flex: 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.16)'; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(96,165,250,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: '11px', color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Solution</span>
                </div>
                <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14.5px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.68, margin: '0 0 14px' }}>
                  {industry.solution}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {industry.programs.map(p => (
                    <span key={p} style={{
                      background: 'rgba(96,165,250,0.18)', color: '#93C5FD',
                      fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
                      fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
                    }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CENTER: Image ── */}
            <div
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
                /* no fixed aspect ratio — stretch to match siblings */
                minHeight: '420px',
              }}
            >
              <img
                src={industry.image}
                alt={industry.imageAlt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: imgHovered ? 'scale(1.03)' : 'scale(1)',
                  opacity: fading ? 0 : 1,
                  transition: 'transform 0.45s ease, opacity 0.32s ease',
                  position: 'absolute',
                  inset: 0,
                }}
              />

            </div>

            {/* ── RIGHT: Outcome + Training Impact ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* OUTCOME */}
              <div
                className="outcome-card"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '22px 24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 8px 24px rgba(34,211,238,0.15)'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: 'rgba(2,132,199,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800,
                    fontSize: '11px', color: '#0284C7',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                  }}>Outcome</span>
                </div>
                <p style={{
                  fontFamily: 'Source Sans 3, sans-serif', fontSize: '14.5px',
                  color: '#334155', lineHeight: 1.68, margin: 0,
                }}>
                  {industry.outcome}
                </p>
              </div>

              {/* WHY PEAKSKILLS */}
              <div
                style={{
                  background: '#14532D',
                  borderRadius: '20px',
                  padding: '22px 24px',
                  flex: 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.16)'; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(74,222,128,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: '11px', color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Why Organizations Choose PeakSkills</span>
                </div>
                <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14.5px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.68, margin: '0 0 16px' }}>
                  Every PeakSkills program is designed around real operational contexts — not
                  templates built for different markets. Our facilitators have worked inside the
                  industries they train.
                </p>
                <a
                  href="/about"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '13px', color: '#4ADE80', textDecoration: 'none' }}
                >
                  Learn about our approach
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>


      </div>

      <style>{`
        @media (max-width: 1023px) {
          .impact-grid { grid-template-columns: 1fr !important; }
        }

        [role="tablist"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
