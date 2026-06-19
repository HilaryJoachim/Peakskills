'use client'

export default function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '680px', backgroundColor: '#1D2430' }}>
      {/* Background Image / Composition */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/services/training.png)',
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-32 pb-24" style={{ minHeight: '680px' }}>
        <div className="max-w-2xl">
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
            Solutions That Help <span style={{ color: '#4DD0E1' }}>Organizations</span> and People <span style={{ color: '#FFB300' }}>Perform Better</span>
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
              marginBottom: '40px',
              maxWidth: '600px'
            }}
          >
            PeakSkills partners with businesses, government institutions, NGOs, educational organizations, and professionals to strengthen leadership, workforce capability, business performance, and organizational effectiveness through practical training, mentorship, consulting, and branding services.
          </p>
        </div>
      </div>
    </section>
  )
}
