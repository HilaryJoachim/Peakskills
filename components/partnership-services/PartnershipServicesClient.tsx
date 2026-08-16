'use client'

import { useState } from 'react'
import PartnershipServiceCard, { PartnershipService } from '@/components/cards/PartnershipServiceCard'

export default function PartnershipServicesClient({ initialServices }: { initialServices: PartnershipService[] }) {
  const [visibleCount, setVisibleCount] = useState(4)

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4)
  }

  const visibleServices = initialServices.slice(0, visibleCount)
  const hasMore = visibleCount < initialServices.length

  return (
    <div style={{ background: '#F4F7FA', minHeight: '100vh', paddingTop: '72px' }}>
      {/* Page header */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '400px', backgroundColor: '#1D2430' }}>
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1200&q=80&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-24 pb-24" style={{ minHeight: '400px' }}>
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</a>
              <span style={{ margin: '0 8px' }}>/</span>
              <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Partnership Services</span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ 
                background: '#0FAFAF', 
                color: '#FFFFFF', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                POS Solutions
              </span>
            </div>

            <h1 
              style={{ 
                fontFamily: 'Arial, Helvetica, sans-serif',
                color: '#FFFFFF',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}
            >
              Supermarket POS &amp; Partnership Services
            </h1>

            <p 
              style={{ 
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '18px',
                lineHeight: 1.7,
                maxWidth: '560px'
              }}
            >
              Discover our comprehensive Point of Sale solutions tailored for supermarkets. Connect directly with our specialists via WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '24px',
        }}>
          {visibleServices.map(service => (
            <PartnershipServiceCard key={service.id} service={service} />
          ))}
        </div>

        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={handleLoadMore}
              style={{
                padding: '12px 32px',
                background: '#1D2430',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2a3441' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1D2430' }}
            >
              Load More Services
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
