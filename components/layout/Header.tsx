'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Leadership Development', href: '/programs/category/leadership-development' },
      { label: 'Banking Programs', href: '/programs/category/banking-programs' },
      { label: 'Government Capacity Building', href: '/programs/category/government-capacity-building' },
      { label: 'Customer Service Excellence', href: '/programs/category/customer-service-excellence' },
      { label: 'Project Management', href: '/programs/category/project-management' },
      { label: 'Human Resources', href: '/programs/category/human-resources' },
      { label: 'Community Outreach', href: '/programs/category/community-outreach-programs' },
    ],
  },
  { label: 'Consulting', href: '/consulting' },
  { label: 'Mentorship & Coaching', href: '/mentorship-coaching' },
  { label: 'Schedule', href: '/schedule' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About PeakSkills', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Our Clients', href: '/clients' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          aria-label="PeakSkills — Home"
        >
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #1E88E5 0%, #4DD0E1 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, color: '#fff', fontSize: '18px',
          }}>P</div>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', letterSpacing: '-0.3px' }}>
            Peak<span style={{ color: '#4DD0E1' }}>Skills</span>
          </span>
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
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F4F7FA'; (e.currentTarget as HTMLElement).style.color = '#1E88E5' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1D2430' }}
                    >{child.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/request-training"
          style={{
            background: '#1E88E5', color: '#fff',
            padding: '9px 20px', borderRadius: '6px',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px',
            textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'background 0.15s',
          }}
          className="cta-btn"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1565C0' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1E88E5' }}
        >
          Request Training
        </Link>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            color: '#fff', padding: '8px', borderRadius: '6px',
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
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '14px 16px', borderRadius: '8px',
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '17px',
                  color: '#fff', textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {link.label}
              </Link>
              {link.children && (
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
          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <Link
              href="/request-training"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', textAlign: 'center',
                background: '#1E88E5', color: '#fff',
                padding: '14px 24px', borderRadius: '8px',
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px',
                textDecoration: 'none',
              }}
            >
              Request Training
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .cta-btn { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
