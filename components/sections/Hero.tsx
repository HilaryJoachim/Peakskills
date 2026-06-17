import Link from 'next/link'
import StatCard from '@/components/cards/StatCard'

export default function Hero() {
  return (
    <section
      id="main-content"
      style={{
        background: '#1D2430',
        paddingTop: '144px', // 72px nav + 72px breathing room
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'radial-gradient(circle at 25% 40%, #1E88E5 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '64px',
          alignItems: 'center',
        }} className="hero-grid">
          {/* Left column — copy */}
          <div>
            {/* Eyebrow */}
            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              color: '#4DD0E1',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '0 0 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '2px', background: '#4DD0E1', borderRadius: '1px', flexShrink: 0 }} />
              Corporate Training &amp; Consulting · Tanzania &amp; East Africa
            </p>

            {/* H1 */}
            <h1 style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 4vw, 54px)',
              lineHeight: 1.12,
              color: '#fff',
              margin: '0 0 24px',
              letterSpacing: '-0.5px',
            }}>
              Practical training and consulting for organizations that need results.
            </h1>

            {/* Body */}
            <p style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.75)',
              margin: '0 0 36px',
              maxWidth: '520px',
            }}>
              We work with banks, government institutions, NGOs, and growing companies across East Africa — designing and delivering training programs that build the specific skills your teams need in their actual roles.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/programs"
                style={{
                  background: '#1E88E5', color: '#fff',
                  padding: '13px 28px', borderRadius: '6px',
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '15px',
                  textDecoration: 'none', display: 'inline-block',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1565C0' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1E88E5' }}
              >
                View Programs
              </Link>
              <Link
                href="/request-training"
                style={{
                  background: 'transparent', color: '#fff',
                  padding: '13px 28px', borderRadius: '6px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '15px',
                  textDecoration: 'none', display: 'inline-block',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#fff'; el.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.3)'; el.style.background = 'transparent' }}
              >
                Request Training
              </Link>
            </div>

            {/* Stats strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              marginTop: '56px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              <StatCard value={80} suffix="+" label="Organizations Trained" />
              <StatCard value={5000} suffix="+" label="Professionals Trained" />
              <StatCard value={12} suffix="+" label="Years Operating" />
            </div>
          </div>

          {/* Right column — image */}
          <div style={{ position: 'relative' }} className="hero-image-col">
            <div style={{
              borderRadius: '10px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
              position: 'relative',
            }}>
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=780&q=85&auto=format&fit=crop"
                alt="Corporate training session in progress — PeakSkills facilitator with a group of banking professionals"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                priority-fetch="high"
              />
              {/* Overlay badge */}
              <div style={{
                position: 'absolute', bottom: '20px', left: '20px',
                background: 'rgba(29,36,48,0.92)', backdropFilter: 'blur(8px)',
                borderRadius: '8px', padding: '12px 16px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', color: '#fff' }}>
                  Trusted by leading institutions
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Source Sans 3, sans-serif' }}>
                  Banks · Government · NGOs · Corporates
                </p>
              </div>
            </div>

            {/* Accent decoration */}
            <div style={{
              position: 'absolute',
              width: '120px', height: '120px',
              borderRadius: '50%',
              background: '#1E88E5',
              opacity: 0.08,
              bottom: '-24px',
              right: '-24px',
              zIndex: -1,
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 639px) {
          .hero-image-col {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
