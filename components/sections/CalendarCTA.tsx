'use client'

import Link from 'next/link'
import { FileText } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function CalendarCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#ffffff',
        padding: '20px 24px 60px',
        display: 'flex',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <div style={{
        maxWidth: '700px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <p style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          color: '#0FAFAF',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          margin: '0 0 16px',
        }}>
          Training Calendar
        </p>

        <h2 style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 40px)',
          lineHeight: 1.2,
          color: '#1D2430',
          margin: '0 0 24px',
        }}>
          Download the 2026 <span style={{ color: '#0077B6' }}>Training Calendar</span>
        </h2>

        <p style={{
          fontFamily: 'Source Sans 3, sans-serif',
          fontSize: '17px',
          lineHeight: 1.6,
          color: '#5C6B7A',
          margin: '0 0 40px',
        }}>
          View upcoming public training programs, locations, dates, and professional development opportunities across Tanzania.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <a
            href="/training-calendar-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              color: '#ffffff',
              background: '#0077B6',
              padding: '14px 28px',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background 0.2s',
              boxShadow: '0 4px 12px rgba(0, 119, 182, 0.2)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#005f92' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0077B6' }}
          >
            <FileText size={18} />
            Download Training Calendar PDF
          </a>
        </div>
      </div>
    </section>
  )
}
