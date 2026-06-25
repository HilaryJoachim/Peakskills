'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

// Inline SVGs for social brand icons (lucide-react removed brand icons)
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const footerLinks = {
  Programs: [
    { label: 'Leadership Development', href: '/programs?category=leadership-development' },
    { label: 'Banking Programs', href: '/programs?category=banking-programs' },
    { label: 'Government Capacity Building', href: '/programs?category=government-capacity-building' },
    { label: 'Customer Service Excellence', href: '/programs?category=customer-service-excellence' },
    { label: 'Project Management', href: '/programs?category=project-management' },
    { label: 'All Programs', href: '/programs' },
  ],
  Services: [
    { label: 'Business Growth Strategy', href: '/services' },
    { label: 'Professional Communication', href: '/services' },
    { label: 'Youth Leadership Programs', href: '/services' },
    { label: 'Brand Strategy', href: '/services' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#1D2430', color: '#A9B4C2', fontFamily: 'Source Sans 3, sans-serif' }}>
      {/* Main footer */}
      <div className="footer-grid" style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 36px', display: 'grid', gap: '40px' }}>
        {/* Brand column */}
        <div>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
            <img 
              src="/logo.png" 
              alt="PeakSkills Logo" 
              style={{ height: '64px', width: 'auto', objectFit: 'contain' }} 
            />
          </Link>
          <p style={{ fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', color: '#A9B4C2', maxWidth: '220px' }}>
            Corporate training, consulting, mentorship and coaching for banks, government institutions, NGOs, and growing organizations across Tanzania and East Africa.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
              { icon: <XIcon />, href: '#', label: 'X (formerly Twitter)' },
              { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
            ].map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} style={{
                width: '36px', height: '36px', borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.12)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#A9B4C2',
                transition: 'color 0.15s, border-color 0.15s', textDecoration: 'none',
              }}>{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }}>
              {heading}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} style={{ color: '#A9B4C2', textDecoration: 'none', fontSize: '14px', lineHeight: 1.4 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#A9B4C2' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }}>
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: <MapPin size={16} />, text: 'Dar es Salaam, Tanzania' },
              { icon: <Phone size={16} />, text: '+255 754 232 863 / 0718 710 361' },
              { icon: <Mail size={16} />, text: 'info@peakskills.co.tz' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#A9B4C2' }}>
                <span style={{ flexShrink: 0, marginTop: '2px', color: '#4DD0E1' }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#A9B4C2', margin: 0 }}>
            © {year} PeakSkills. All rights reserved.
          </p>

        </div>
      </div>
      <style>{`
        .footer-grid {
          grid-template-columns: 2fr 1fr 1fr 1fr;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  )
}
