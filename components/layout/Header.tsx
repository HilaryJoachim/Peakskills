'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Leadership Development', href: '/programs?category=leadership-development' },
      { label: 'Banking Programs', href: '/programs?category=banking-programs' },
      { label: 'Government Capacity Building', href: '/programs?category=government-capacity-building' },
      { label: 'Customer Service Excellence', href: '/programs?category=customer-service-excellence' },
      { label: 'Project Management', href: '/programs?category=project-management' },
      { label: 'Human Resources', href: '/programs?category=human-resources' },
      { label: 'Community Outreach', href: '/programs?category=community-outreach-programs' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Mentorship', href: '/mentorship-coaching' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#1D2430',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="header-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 1, minWidth: 0 }}
          aria-label="PeakSkills — Home"
        >
          <img 
            src="/logo.png" 
            alt="PeakSkills Logo" 
            style={{ height: 'auto', maxHeight: '56px', width: 'auto', maxWidth: '100%', objectFit: 'contain' }} 
          />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <div key={link.href} style={{ position: 'relative' }}
              onMouseEnter={() => link.children && setOpenDropdown(link.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '6px 12px', borderRadius: '6px',
                  fontFamily: 'Source Sans 3, sans-serif', fontWeight: 500, fontSize: '14px',
                  color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                  transition: 'color 0.15s, background 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
                onMouseLeave={e => { if (openDropdown !== link.href) { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'; (e.currentTarget as HTMLElement).style.background = 'transparent' } }}
              >
                {link.label}
                {link.children && <ChevronDown size={14} style={{ opacity: 0.6 }} />}
              </Link>
              {link.children && openDropdown === link.href && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: '#fff', borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(29,36,48,0.15)',
                  border: '1px solid #DDE4EC',
                  minWidth: '220px', padding: '8px',
                  marginTop: '4px', zIndex: 200,
                }}>
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href} style={{
                      display: 'block', padding: '8px 12px', borderRadius: '6px',
                      fontFamily: 'Source Sans 3, sans-serif', fontWeight: 400, fontSize: '14px',
                      color: '#1D2430', textDecoration: 'none',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F4F7FA'; (e.currentTarget as HTMLElement).style.color = '#0077B6' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1D2430' }}
                    >{child.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>



        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            color: '#fff', padding: '8px', borderRadius: '6px',
            minWidth: '44px', minHeight: '44px', flexShrink: 0,
            alignItems: 'center', justifyContent: 'center'
          }}
          className="hamburger-btn"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Navigation menu"
          style={{
            position: 'fixed', inset: 0, top: '72px',
            background: '#1D2430', zIndex: 99,
            overflowY: 'auto', padding: '24px',
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}
        >
          {navLinks.map((link) => (
            <div key={link.href}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', padding: '14px 16px', borderRadius: '8px',
                    fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '17px',
                    color: '#fff', textDecoration: 'none', flex: 1,
                  }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.href ? null : link.href)}
                    style={{
                      background: 'none', border: 'none', color: '#fff', padding: '14px 16px',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    aria-label={`Toggle ${link.label} menu`}
                  >
                    <ChevronDown
                      size={20}
                      style={{
                        transform: mobileExpanded === link.href ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </button>
                )}
              </div>
              {link.children && mobileExpanded === link.href && (
                <div style={{ paddingLeft: '16px' }}>
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)} style={{
                      display: 'block', padding: '10px 16px',
                      fontFamily: 'Source Sans 3, sans-serif', fontWeight: 400, fontSize: '15px',
                      color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                    }}>{child.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>
      )}

      <style>{`
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .header-container { padding: 0 16px !important; }
        }
      `}</style>
    </header>
  )
}
