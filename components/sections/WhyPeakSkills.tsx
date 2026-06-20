'use client'

import Link from 'next/link'

export default function WhyPeakSkills() {
  return (
    <section style={{ background: '#ffffff', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="why-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>

          {/* ── Left: single large image ─────────────────── */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '4 / 5', boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}>
            <img
              src="/about_peak2.jpeg"
              alt="PeakSkills facilitator leading a professional training session"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* ── Right: copy ──────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              color: '#0FAFAF',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 16px',
            }}>
              About PeakSkills
            </p>

            {/* Headline */}
            <h2 style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.15,
              color: '#1D2430',
              margin: '0 0 28px',
            }}>
              Turning training into{' '}
              <span style={{ color: '#0FAFAF' }}>real results.</span>
            </h2>

            {/* Body paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#1D2430',
                margin: 0,
              }}>
                PeakSkills is a corporate training, consulting, and coaching firm built specifically for organizations across Tanzania and East Africa. We partner with banks, government institutions, NGOs, and growing companies to close the gap between what their people know and what their roles actually demand.
              </p>
              <p style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#1D2430',
                margin: 0,
              }}>
                Our facilitators are not academics — they are former banking officers, HR directors, and public-sector leaders who have done the work. Every program is designed around your specific operating context, not adapted from a textbook built for a different country.
              </p>
              <p style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#1D2430',
                margin: 0,
              }}>
                By focusing on measurable behavioral outcomes, we help organizations see the change — in performance reviews, client satisfaction scores, and operational results — not just in post-training feedback forms.
              </p>
            </div>

            {/* CTA */}
            <div style={{ marginTop: '36px' }}>
              <Link
                href="/about"
                className="why-cta"
                style={{
                  display: 'inline-block',
                  background: '#1D2430',
                  color: '#fff',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  padding: '14px 32px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0FAFAF' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1D2430' }}
              >
                Learn more about us
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  )
}
