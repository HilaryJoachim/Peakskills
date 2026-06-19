'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section 
      id="main-content"
      className="relative w-full overflow-hidden" 
      style={{ minHeight: '90vh', backgroundColor: '#333333' }}
    >
      {/* Background Image / Composition */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/home_hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark gradient overlay to fade left side into dark grey */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(51,51,51,1) 0%, rgba(51,51,51,0.95) 45%, rgba(51,51,51,0.2) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-32 pb-24" style={{ minHeight: '90vh' }}>
        <div className="max-w-3xl">
          
          <h1 
            style={{ 
              fontFamily: 'Arial, Helvetica, sans-serif',
              color: '#FFFFFF',
              fontSize: 'clamp(38px, 5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '32px',
              letterSpacing: '-0.03em'
            }}
          >
            Develop People.<br />
            Elevate <span style={{ color: '#4DD0E1' }}>Organizations.</span><br />
            Drive <span style={{ backgroundColor: '#FFB300', color: '#1D2430', padding: '0 16px', display: 'inline-block', lineHeight: 1.15 }}>Results.</span>
          </h1>

          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '20px',
              lineHeight: 1.6,
              maxWidth: '640px',
              marginBottom: '40px'
            }}
          >
            We work with banks, government institutions, NGOs, and growing companies across East Africa — designing and delivering training programs that build the specific skills your teams need in their actual roles.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/request-training"
              style={{
                background: '#0077B6', 
                color: '#fff',
                padding: '16px 36px', 
                borderRadius: '40px', // Pill shape
                fontFamily: 'Arial, Helvetica, sans-serif', 
                fontWeight: 700, 
                fontSize: '16px',
                textDecoration: 'none', 
                display: 'inline-block',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#005F8E' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0077B6' }}
            >
              Request Training
            </Link>
            <Link
              href="/programs"
              style={{
                background: 'transparent', 
                color: '#fff',
                padding: '16px 36px', 
                borderRadius: '40px', // Pill shape
                border: '2px solid rgba(255,255,255,0.5)',
                fontFamily: 'Arial, Helvetica, sans-serif', 
                fontWeight: 700, 
                fontSize: '16px',
                textDecoration: 'none', 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#fff'; el.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.5)'; el.style.background = 'transparent' }}
            >
              Explore Programs ↗
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
