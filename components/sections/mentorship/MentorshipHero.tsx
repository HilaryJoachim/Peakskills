'use client'

import Link from 'next/link'
import { heroStats } from '@/lib/mentorshipData'
import {
  Users, Award, BookOpen, Target, BadgeCheck,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users size={22} />,
  Award: <Award size={22} />,
  BookOpen: <BookOpen size={22} />,
  Target: <Target size={22} />,
  BadgeCheck: <BadgeCheck size={22} />,
}

export default function MentorshipHero() {
  return (
    <>
      <section
        id="main-content"
        className="mentorship-hero"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          minHeight: '92vh',
          backgroundColor: '#1D2430',
        }}
      >
        {/* Background image */}
        <div
          className="mentorship-hero-bg"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: 'url(/mentorship/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(29,36,48,1) 0%, rgba(29,36,48,0.95) 45%, rgba(29,36,48,0.3) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div
          className="mentorship-hero-content"
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            minHeight: '92vh',
          }}
        >
          <div style={{ maxWidth: '680px', paddingTop: '100px', paddingBottom: '60px' }}>
            {/* Eyebrow */}
            <p
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                color: '#4DD0E1',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                margin: '0 0 20px',
              }}
            >
              Mentorship & Career Guidance
            </p>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                color: '#FFFFFF',
                fontSize: 'clamp(34px, 4.5vw, 58px)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '28px',
                letterSpacing: '-0.03em',
              }}
            >
              Build Your Career With{' '}
              <span style={{ color: '#4DD0E1' }}>Expert Mentorship</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '18px',
                lineHeight: 1.65,
                maxWidth: '600px',
                marginBottom: '40px',
              }}
            >
              Whether you&rsquo;re preparing for your first job, planning your career path,
              improving workplace skills, or seeking professional guidance — PeakSkills mentors
              are here to help you grow with confidence.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href="#apply"
                style={{
                  background: '#0077B6',
                  color: '#fff',
                  padding: '16px 36px',
                  borderRadius: '40px',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#005F8E'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#0077B6'
                }}
              >
                Join a Mentorship Program
              </Link>
              <Link
                href="#learning-paths"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  padding: '16px 36px',
                  borderRadius: '40px',
                  border: '2px solid rgba(255,255,255,0.5)',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#fff'
                  el.style.background = 'rgba(255,255,255,0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.5)'
                  el.style.background = 'transparent'
                }}
              >
                Browse Available Classes ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            background: 'rgba(29,36,48,0.85)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="mentorship-stats-grid"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '28px 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '20px',
            }}
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(77,208,225,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4DD0E1',
                    flexShrink: 0,
                  }}
                >
                  {ICON_MAP[stat.icon]}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'IBM Plex Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '20px',
                      color: '#fff',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '13px',
                      color: '#A9B4C2',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1023px) {
          .mentorship-stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 639px) {
          .mentorship-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .mentorship-hero-content {
            min-height: 80vh !important;
          }
        }
      `}</style>
    </>
  )
}
