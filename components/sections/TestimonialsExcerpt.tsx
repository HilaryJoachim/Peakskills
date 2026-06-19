'use client'

import Link from 'next/link'
import TestimonialCard from '@/components/cards/TestimonialCard'
import { Testimonial } from '@/lib/supabase'

interface TestimonialsExcerptProps {
  testimonials: Testimonial[]
}

export default function TestimonialsExcerpt({ testimonials }: TestimonialsExcerptProps) {
  return (
    <section style={{ background: '#F4F7FA', padding: '88px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
          <p style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
            fontSize: '12px', color: '#0077B6', textTransform: 'uppercase',
            letterSpacing: '0.08em', margin: '0 0 12px',
          }}>
            Client Feedback
          </p>
          <h2 style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
            fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.2, color: '#1D2430', margin: '0 0 16px',
          }}>
            What our clients say
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', lineHeight: 1.65, color: '#5C6B7A', margin: 0 }}>
            Organizations across banking, government, and the development sector on what the training delivered and what changed afterward.
          </p>
        </div>

        {/* Cards */}
        {testimonials.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#5C6B7A' }}>
            <p>Testimonials are being updated. Please check back shortly.</p>
          </div>
        )}

        {/* Link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/testimonials"
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px',
              color: '#0077B6', textDecoration: 'none',
              padding: '10px 24px', border: '1.5px solid #0077B6', borderRadius: '6px',
              display: 'inline-block', transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EBF5FF' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            Read More Testimonials →
          </Link>
        </div>
      </div>
    </section>
  )
}
