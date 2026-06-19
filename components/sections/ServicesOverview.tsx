'use client'

import Link from 'next/link'
import { BookOpen, Building2, BarChart3, UserCheck, Award, Monitor } from 'lucide-react'

const services = [
  {
    icon: <BookOpen size={24} strokeWidth={1.5} />,
    title: 'Public Training Courses',
    description: 'Open-enrollment programs across 11 professional categories, scheduled throughout the year. Individuals and small teams enroll and join cohorts alongside peers from other organizations.',
    href: '/programs',
    cta: 'View Programs',
  },
  {
    icon: <Building2 size={24} strokeWidth={1.5} />,
    title: 'In-House Training',
    description: 'Programs designed and delivered exclusively for your organization, at your premises or ours. Content, cases, and scenarios are adapted to your sector, team level, and specific development priorities.',
    href: '/request-training',
    cta: 'Request Training',
  },
  {
    icon: <BarChart3 size={24} strokeWidth={1.5} />,
    title: 'Consulting Services',
    description: 'Organizational development, HR strategy, and performance consulting for institutions navigating structural change, growth, or regulatory evolution.',
    href: '/consulting',
    cta: 'Learn More',
  },
  {
    icon: <UserCheck size={24} strokeWidth={1.5} />,
    title: 'Mentorship & Coaching',
    description: 'One-to-one executive coaching and structured mentorship programs for senior leaders and high-potential managers. Engagements run for three to six months with measurable milestone checkpoints.',
    href: '/mentorship-coaching',
    cta: 'Learn More',
  },
  {
    icon: <Award size={24} strokeWidth={1.5} />,
    title: 'Certified Programs',
    description: 'Selected programs carry formal certification upon completion. Certificates are issued by PeakSkills and, where applicable, recognized by relevant professional bodies and regulatory agencies.',
    href: '/programs',
    cta: 'View Certified Programs',
  },
  {
    icon: <Monitor size={24} strokeWidth={1.5} />,
    title: 'Online & Hybrid Learning',
    description: 'Flexible delivery options for organizations with geographically distributed teams. Online and hybrid formats maintain the same instructional quality and interaction standards as in-person delivery.',
    href: '/programs',
    cta: 'View Online Programs',
  },
]

export default function ServicesOverview() {
  return (
    <section style={{ background: '#fff', padding: '88px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 56px' }}>
          <p style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
            fontSize: '12px', color: '#0077B6', textTransform: 'uppercase',
            letterSpacing: '0.08em', margin: '0 0 12px',
          }}>
            What We Do
          </p>
          <h2 style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
            fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.2, color: '#1D2430',
            margin: '0 0 16px',
          }}>
            A full range of human-capital development services
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', lineHeight: 1.65, color: '#5C6B7A', margin: 0 }}>
            Whether you need to fill seats in a scheduled course or commission a fully custom in-house program for your entire division, we have a delivery model that fits.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {services.map((service, i) => (
            <div
              key={i}
              style={{
                background: '#F4F7FA',
                border: '1px solid #DDE4EC',
                borderRadius: '8px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#0077B6'; el.style.boxShadow = '0 4px 16px rgba(30,136,229,0.08)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#DDE4EC'; el.style.boxShadow = 'none' }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '10px',
                background: '#1D2430', color: '#4DD0E1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
                fontSize: '17px', lineHeight: 1.3, color: '#1D2430', margin: 0,
              }}>
                {service.title}
              </h3>
              <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', lineHeight: 1.65, color: '#5C6B7A', margin: 0, flex: 1 }}>
                {service.description}
              </p>
              <Link
                href={service.href}
                style={{
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
                  fontSize: '14px', color: '#0077B6', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none' }}
              >
                {service.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
