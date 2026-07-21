'use client'

import Link from 'next/link'

export default function MentorshipCTA() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #1D2430 0%, #263040 100%)',
        padding: '96px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient circles */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,119,182,0.15) 0%, transparent 70%)',
          top: '-100px',
          right: '-100px',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,208,225,0.1) 0%, transparent 70%)',
          bottom: '-80px',
          left: '-80px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 44px)',
            lineHeight: 1.15,
            color: '#fff',
            margin: '0 0 20px',
          }}
        >
          Ready to Start Your{' '}
          <span style={{ color: '#4DD0E1' }}>Career Journey?</span>
        </h2>
        <p
          style={{
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '18px',
            color: '#A9B4C2',
            margin: '0 0 40px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.65,
          }}
        >
          Join hundreds of students and young professionals building successful careers
          through PeakSkills Mentorship. Your future starts with one step.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="#apply"
            style={{
              background: '#0077B6',
              color: '#fff',
              padding: '16px 40px',
              borderRadius: '40px',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#005F8E'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#0077B6'
              el.style.transform = 'translateY(0)'
            }}
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            style={{
              background: 'transparent',
              color: '#fff',
              padding: '16px 40px',
              borderRadius: '40px',
              border: '2px solid rgba(255,255,255,0.3)',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#fff'
              el.style.background = 'rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.3)'
              el.style.background = 'transparent'
            }}
          >
            Talk to a Mentor
          </Link>
        </div>
      </div>
    </section>
  )
}
