import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

const footerLinks = {
  Programs: [
    { label: 'Leadership Development', href: '/programs/category/leadership-development' },
    { label: 'Banking Programs', href: '/programs/category/banking-programs' },
    { label: 'Government Capacity Building', href: '/programs/category/government-capacity-building' },
    { label: 'Customer Service Excellence', href: '/programs/category/customer-service-excellence' },
    { label: 'Project Management', href: '/programs/category/project-management' },
    { label: 'All Programs', href: '/programs' },
  ],
  Services: [
    { label: 'In-House Training', href: '/request-training' },
    { label: 'Consulting Services', href: '/consulting' },
    { label: 'Mentorship & Coaching', href: '/mentorship-coaching' },
    { label: 'Community Programs', href: '/programs/category/community-outreach-programs' },
  ],
  Company: [
    { label: 'About PeakSkills', href: '/about' },
    { label: 'Our Team', href: '/team' },
    { label: 'Our Clients', href: '/clients' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
  ],
  Resources: [
    { label: 'Training Schedule', href: '/schedule' },
    { label: 'Resource Library', href: '/resources' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Verify Certificate', href: '/verify-certificate' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#1D2430', color: '#A9B4C2', fontFamily: 'Source Sans 3, sans-serif' }}>
      {/* CTA band above footer */}
      <div style={{ background: '#1E88E5', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>
            Ready to invest in your team?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', margin: '0 0 28px', lineHeight: 1.6 }}>
            Speak with our training consultants about a program designed around your organization&apos;s specific needs and goals.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-training" style={{
              background: '#fff', color: '#1E88E5',
              padding: '12px 28px', borderRadius: '6px',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '15px',
              textDecoration: 'none', display: 'inline-block',
            }}>
              Request Training
            </Link>
            <Link href="/programs" style={{
              background: 'transparent', color: '#fff',
              padding: '12px 28px', borderRadius: '6px', border: '2px solid rgba(255,255,255,0.5)',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '15px',
              textDecoration: 'none', display: 'inline-block',
            }}>
              View Programs
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        {/* Brand column */}
        <div style={{ gridColumn: 'span 1' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '7px',
              background: 'linear-gradient(135deg, #1E88E5 0%, #4DD0E1 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, color: '#fff', fontSize: '17px',
            }}>P</div>
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff' }}>
              Peak<span style={{ color: '#4DD0E1' }}>Skills</span>
            </span>
          </Link>
          <p style={{ fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', color: '#A9B4C2', maxWidth: '220px' }}>
            Corporate training, consulting, mentorship and coaching for banks, government institutions, NGOs, and growing organizations across Tanzania and East Africa.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
              { icon: <Twitter size={18} />, href: '#', label: 'Twitter / X' },
              { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
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
                <li key={link.href}>
                  <Link href={link.href} style={{ color: '#A9B4C2', textDecoration: 'none', fontSize: '14px', lineHeight: 1.4 }}
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
              { icon: <Phone size={16} />, text: '+255 700 000 000' },
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
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Verify Certificate', href: '/verify-certificate' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: '13px', color: '#A9B4C2', textDecoration: 'none' }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
