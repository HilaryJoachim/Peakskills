'use client'

import Link from 'next/link'

const categories = [
  { label: 'Leadership Development',       href: '/programs?category=leadership-development' },
  { label: 'Work Ethics & Professionalism',href: '/programs?category=workplace-ethics' },
  { label: 'Human Resource Management',    href: '/programs?category=human-resources' },
  { label: 'Customer Service Excellence',  href: '/programs?category=customer-service-excellence' },
  { label: 'Project Management',           href: '/programs?category=project-management' },
  { label: 'Executive Coaching',           href: '/mentorship-coaching' },
  { label: 'Financial Management',         href: '/programs?category=banking-programs' },
  { label: 'Communication Skills',         href: '/programs?category=communication-skills' },
  { label: 'Sales & Marketing',            href: '/programs?category=sales-marketing' },
  { label: 'Team Building',                href: '/programs?category=leadership-development' },
  { label: 'Banking Programs',             href: '/programs?category=banking-programs' },
  { label: 'Government Capacity Building', href: '/programs?category=government-capacity-building' },
]

// Duplicate the list so the second copy seamlessly continues the first
const track = [...categories, ...categories]

export default function CategoriesRibbon() {
  return (
    <section
      aria-label="Training categories"
      style={{
        background: '#0FAFAF',
        padding: '0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      {/* Outer wrapper — masks overflow and applies fade edges */}
      <div
        className="ribbon-outer"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Left + right fade masks */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0,
          width: '80px', height: '100%', zIndex: 2,
          background: 'linear-gradient(to right, #0FAFAF, transparent)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, right: 0,
          width: '80px', height: '100%', zIndex: 2,
          background: 'linear-gradient(to left, #0FAFAF, transparent)',
          pointerEvents: 'none',
        }} />

        {/* Scrolling track — pauses on hover via CSS class */}
        <div className="ribbon-track" style={{ display: 'flex', width: 'max-content' }}>
          {track.map((cat, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
              <Link
                href={cat.href}
                className="ribbon-item"
                style={{
                  display: 'inline-block',
                  padding: '18px 28px',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  letterSpacing: '0.01em',
                  color: '#ffffff',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                  outline: 'none',
                }}
                tabIndex={i >= categories.length ? -1 : 0}
                aria-hidden={i >= categories.length}
              >
                {cat.label}
              </Link>
              {/* Circular divider */}
              <span aria-hidden="true" style={{
                display: 'inline-block',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.45)',
                flexShrink: 0,
              }} />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Animation ─────────────────────────────────── */
        @keyframes ribbon-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .ribbon-track {
          animation: ribbon-scroll 40s linear infinite;
          will-change: transform;
        }

        /* Pause on hover of outer wrapper */
        .ribbon-outer:hover .ribbon-track {
          animation-play-state: paused;
        }

        /* Item hover highlight */
        .ribbon-item:hover {
          color: #ffffff !important;
        }

        /* Respect reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .ribbon-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
