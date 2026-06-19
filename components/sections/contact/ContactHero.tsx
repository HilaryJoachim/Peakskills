'use client'

import Link from 'next/link'

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '520px', backgroundColor: '#1D2430' }}>
      {/* Background Image / Composition */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/contact_hero_2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradient overlay to ensure text readability on the left */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(29,36,48,1) 0%, rgba(29,36,48,0.92) 45%, rgba(29,36,48,0.2) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-32 pb-24" style={{ minHeight: '520px' }}>
        <div className="max-w-2xl">
          
          {/* Breadcrumb */}
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Enquiry</span>
          </div>

          <h1 
            style={{ 
              fontFamily: 'Arial, Helvetica, sans-serif',
              color: '#FFFFFF',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}
          >
            Reach Out Today.<br />
            Let&apos;s <span style={{ color: '#4DD0E1' }}>Discuss</span> Your<br />
            <span style={{ color: '#FFB300' }}>Business Needs</span>
          </h1>

          {/* Divider Line */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0', opacity: 0.8 }}>
            <div style={{ width: '120px', height: '2px', background: '#FFFFFF' }}></div>
            <div style={{ 
              width: '16px', height: '16px', borderRadius: '50%', 
              border: '2px solid #FFFFFF', background: 'transparent', 
              margin: '0 16px' 
            }}></div>
            <div style={{ width: '120px', height: '2px', background: '#FFFFFF' }}></div>
          </div>

          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '18px',
              lineHeight: 1.7,
              maxWidth: '560px'
            }}
          >
            Tell us about your requirements and our experts will provide you with the best solution tailored for your organization.
          </p>
        </div>
      </div>
    </section>
  )
}
