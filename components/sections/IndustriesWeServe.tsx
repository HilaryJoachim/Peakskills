'use client'

import { useState } from 'react'
import {
  Landmark,        // Banking
  Scale,           // Government
  BookOpen,        // Education
  Heart,           // NGO
  Cog,             // Manufacturing
  Briefcase,       // Corporate
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Industry {
  id: string
  title: string
  Icon: LucideIcon
  angle: number
  description: string
}

const industries: Industry[] = [
  {
    id: 'banking',
    title: 'Banking & Financial Institutions',
    Icon: Landmark,
    angle: -90,
    description:
      'We help banks and financial institutions strengthen customer service, leadership capability, compliance awareness, and operational excellence through programs aligned to Bank of Tanzania regulatory standards.',
  },
  {
    id: 'government',
    title: 'Government & Public Sector',
    Icon: Scale,
    angle: -30,
    description:
      'We support government ministries, departments, and agencies with capacity building programs that improve public service delivery, governance, policy implementation, and leadership at all levels.',
  },
  {
    id: 'education',
    title: 'Education & Universities',
    Icon: BookOpen,
    angle: 30,
    description:
      'We partner with educational institutions to build institutional leadership, improve staff performance, and prepare students and graduates for the professional workplace through career readiness programs.',
  },
  {
    id: 'ngo',
    title: 'NGOs & Development Organizations',
    Icon: Heart,
    angle: 90,
    description:
      'Development organizations face unique challenges: diverse teams, ethics and accountability demands, and results under resource pressure. We design training for the specific governance needs of the development sector.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Industry',
    Icon: Cog,
    angle: 150,
    description:
      'We help manufacturing companies build supervisory leadership capacity, strengthen safety and compliance culture, and develop frontline management skills for high-performance industrial operations.',
  },
  {
    id: 'corporate',
    title: 'Corporate Organizations',
    Icon: Briefcase,
    angle: 210,
    description:
      'For private-sector organizations of all sizes, PeakSkills delivers customized programs that build the people skills, management practices, and organizational culture that drive sustainable business results.',
  },
]

// ── Wheel geometry ─────────────────────────────────────────────
const W = 480
const CX = W / 2         // 240
const CY = W / 2         // 240
const ORBIT_R = 185
const ICON_D = 82        // larger icon button diameter

function pos(angle: number) {
  const r = (angle * Math.PI) / 180
  return { x: CX + ORBIT_R * Math.cos(r), y: CY + ORBIT_R * Math.sin(r) }
}

// ── Component ──────────────────────────────────────────────────
export default function IndustriesWeServe() {
  const [active, setActive] = useState(0)
  const ind = industries[active]

  const col1 = industries.slice(0, 3)
  const col2 = industries.slice(3)

  return (
    <section style={{ background: 'linear-gradient(135deg, #0F1C2E 0%, #1A2B3C 100%)', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1220px', margin: '0 auto' }}>

        <div className="ind-outer" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 480px',
          gap: '64px',
          alignItems: 'center',
        }}>

          {/* ════════════════════════════════════════
              LEFT — heading + list (no button)
          ════════════════════════════════════════ */}
          <div>
            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: '12px', color: '#4DD0E1', textTransform: 'uppercase',
              letterSpacing: '0.1em', margin: '0 0 14px',
            }}>
              Industries We Serve
            </p>

            <h2 style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700,
              fontSize: 'clamp(24px, 2.8vw, 36px)', lineHeight: 1.2,
              color: '#ffffff', margin: '0 0 20px',
            }}>
              Training solutions for every sector across East Africa
            </h2>

            <p style={{
              fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px',
              lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', margin: '0 0 36px', maxWidth: '520px',
            }}>
              Our programs are built around the specific operating environments of each sector we serve — not generic frameworks adapted from a different context. Hover any industry to learn how we support it.
            </p>

            {/* 2-column list */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '16px',
              rowGap: '4px',
            }}>
              {[col1, col2].map((col, colIdx) => (
                <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {col.map((item, rowIdx) => {
                    const i = colIdx * 3 + rowIdx
                    const isActive = i === active
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => setActive(i)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 12px', borderRadius: '6px',
                          border: 'none', background: 'transparent',
                          cursor: 'pointer', textAlign: 'left',
                          outline: 'none', width: '100%',
                        }}
                      >
                        <item.Icon
                          size={16}
                          color={isActive ? '#4DD0E1' : 'rgba(255,255,255,0.4)'}
                          strokeWidth={1.8}
                          style={{ flexShrink: 0, transition: 'color 0.25s' }}
                        />
                        <span style={{
                          fontFamily: 'IBM Plex Sans, sans-serif',
                          fontWeight: isActive ? 700 : 400,
                          fontSize: '14px',
                          color: isActive ? '#4DD0E1' : 'rgba(255,255,255,0.75)',
                          transition: 'all 0.25s ease',
                          textDecoration: isActive ? 'underline' : 'none',
                          textDecorationColor: '#4DD0E1',
                          textUnderlineOffset: '3px',
                        }}>
                          {item.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════
              RIGHT — wheel (no connector lines)
          ════════════════════════════════════════ */}
          <div className="ind-wheel" style={{
            position: 'relative',
            width: `${W}px`,
            height: `${W}px`,
            flexShrink: 0,
          }}>

            {/* SVG — only the dashed orbit ring, no lines */}
            <svg
              width={W} height={W}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            >
              <circle
                cx={CX} cy={CY} r={ORBIT_R}
                fill="none" stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5" strokeDasharray="6 5"
              />
            </svg>

            {/* Center — description text only */}
            <div style={{
              position: 'absolute',
              left: `${CX - 110}px`,
              top: `${CY - 110}px`,
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 1,
            }}>
              <p style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '12.5px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.82)',
                margin: 0,
                fontStyle: 'italic',
              }}>
                {ind.description}
              </p>
            </div>

            {/* Orbit icon buttons — larger with more inner padding */}
            {industries.map((item, i) => {
              const p = pos(item.angle)
              const isActive = i === active
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  title={item.title}
                  style={{
                    position: 'absolute',
                    left: `${p.x - ICON_D / 2}px`,
                    top: `${p.y - ICON_D / 2}px`,
                    width: `${ICON_D}px`,
                    height: `${ICON_D}px`,
                    borderRadius: '50%',
                    border: `2px solid ${isActive ? '#0FAFAF' : 'rgba(255,255,255,0.18)'}`,
                    background: isActive ? '#0FAFAF' : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transform: isActive ? 'scale(1.18)' : 'scale(1)',
                    boxShadow: isActive
                      ? '0 6px 24px rgba(15,175,175,0.4)'
                      : '0 2px 8px rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    zIndex: 3,
                    padding: '0',
                  }}
                >
                  <item.Icon
                    size={28}
                    color={isActive ? '#fff' : 'rgba(255,255,255,0.5)'}
                    strokeWidth={1.6}
                  />
                </button>
              )
            })}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .ind-outer {
            grid-template-columns: 1fr !important;
          }
          .ind-wheel {
            display: none !important;
          }
        }
        @media (max-width: 520px) {
          .ind-outer > div:first-child > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
