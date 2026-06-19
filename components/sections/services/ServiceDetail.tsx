'use client'

import Link from 'next/link'

interface ServiceDetailProps {
  headline: string
  description: string
  services: string[]
  industries?: string[]
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
}

export default function ServiceDetail({
  headline,
  description,
  services,
  industries,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
}: ServiceDetailProps) {
  const isLeft = imagePosition === 'left'

  return (
    <section className="py-10 md:py-12" style={{ backgroundColor: '#F4F7FA' }}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Premium Compact Card Container */}
        <div 
          className={`flex flex-col lg:flex-row items-center bg-white rounded-[24px] p-6 md:p-8 lg:p-10 gap-8 lg:gap-12 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
          style={{
            boxShadow: '0 8px 30px rgba(29,36,48,0.04)',
            border: '1px solid rgba(221,228,236,0.8)'
          }}
        >
          
          {/* Embedded Image Side - Max 460px height, rounded 20px */}
          <div className="w-full lg:w-[45%] h-[300px] md:h-[400px] lg:h-[460px] relative overflow-hidden rounded-[20px]" style={{ flexShrink: 0 }}>
            <img 
              src={imageSrc} 
              alt={imageAlt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>

          {/* Content Side - Tighter spacing */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            <h2 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 2.5vw, 30px)',
                fontWeight: 700,
                color: '#1D2430',
                lineHeight: 1.25,
                marginBottom: '12px',
                maxWidth: '700px'
              }}
            >
              {headline}
            </h2>
            <p 
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: '#5C6B7A',
                lineHeight: 1.6,
                marginBottom: '22px'
              }}
            >
              {description}
            </p>

            <div style={{ marginBottom: '22px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 600, color: '#1D2430', marginBottom: '10px' }}>
                Services Included:
              </h3>
              {/* Strictly 2-column list, tighter gap */}
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px 16px', padding: 0, margin: 0, listStyle: 'none' }}>
                {services.map(s => (
                  <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ 
                      marginTop: '7px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#0077B6',
                      flexShrink: 0
                    }}></div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1D2430', fontWeight: 500 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {industries && industries.length > 0 && (
              <div style={{ marginBottom: '26px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 600, color: '#1D2430', marginBottom: '8px' }}>
                  Industries Served:
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {industries.map(ind => (
                    <span 
                      key={ind}
                      style={{
                        background: '#F8FAFC',
                        color: '#5C6B7A',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 500,
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Link href={ctaHref}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: '#0077B6', color: '#FFFFFF',
                  padding: '10px 22px', borderRadius: '6px',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14.5px',
                  textDecoration: 'none', transition: 'background 0.2s',
                  boxShadow: '0 4px 12px rgba(30,136,229,0.15)'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#005F8E')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0077B6')}
              >
                {ctaLabel}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
