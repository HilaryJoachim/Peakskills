'use client'

import { useState } from 'react'

export interface PartnershipService {
  id: string
  title: string
  description: string
  image_url: string
  contact_name: string
  whatsapp_number: string
  category?: string | null
  key_features?: string[] | null
}

interface PartnershipServiceCardProps {
  service: PartnershipService
}

export default function PartnershipServiceCard({ service }: PartnershipServiceCardProps) {
  const [hovered, setHovered] = useState(false)

  // WhatsApp link format: https://wa.me/<number>
  // Ensure the number has country code but no + or spaces
  const whatsappLink = `https://wa.me/${service.whatsapp_number ? service.whatsapp_number.replace(/[^0-9]/g, '') : ''}`

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: '1px solid #DDE4EC',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered
          ? '0 8px 32px rgba(29,36,48,0.12)'
          : '0 1px 4px rgba(29,36,48,0.07)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        height: '100%',
      }}
    >
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: '180px',
        width: '100%',
        flexShrink: 0,
      }}>
        <img
          src={service.image_url}
          alt={service.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '16px',
        gap: '12px',
      }}>
        {service.category && (
          <div style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            background: 'rgba(245, 158, 11, 0.1)',
            color: '#D97706',
            padding: '4px 10px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '-4px'
          }}>
            {service.category}
          </div>
        )}

        <h3 style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: 1.3,
          color: '#1D2430',
          margin: 0,
        }}>
          {service.title}
        </h3>

        <p style={{
          fontFamily: 'Source Sans 3, sans-serif',
          fontSize: '14px',
          color: '#5C6B7A',
          lineHeight: 1.5,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {service.description}
        </p>

        {service.key_features && service.key_features.length > 0 && (
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flex: 1
          }}>
            {service.key_features.map((feature, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '13px',
                color: '#475569',
                fontFamily: 'Source Sans 3, sans-serif'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div style={{
          borderTop: '1px solid #EEF1F5',
          paddingTop: '12px',
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <span style={{ display: 'block', fontSize: '11px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>{service.contact_name}</span>
          </div>
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#25D366',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1da851' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#25D366' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}
