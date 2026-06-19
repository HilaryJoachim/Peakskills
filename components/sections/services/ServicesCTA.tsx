'use client'

import Link from 'next/link'

export default function ServicesCTA() {
  return (
    <section style={{ backgroundColor: '#1D2430', padding: '100px 24px', textAlign: 'center' }}>
      <div className="max-w-3xl mx-auto">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            color: '#FFFFFF',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '24px'
          }}
        >
          Let&apos;s Build Stronger Teams, Better Leaders, and More Successful Organizations
        </h2>
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '18px',
            lineHeight: 1.7,
            marginBottom: '40px'
          }}
        >
          Whether you&apos;re developing employees, mentoring future leaders, improving business performance, or strengthening your organization&apos;s brand, PeakSkills is ready to help.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/request-training"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#0077B6', color: '#FFFFFF',
              padding: '14px 36px', borderRadius: '4px',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              textDecoration: 'none', transition: 'background 0.2s'
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#005F8E')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0077B6')}
          >
            Request Consultation
          </Link>
          <Link href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', color: '#FFFFFF',
              padding: '14px 36px', borderRadius: '4px',
              border: '2px solid rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              textDecoration: 'none', transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#FFFFFF'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
