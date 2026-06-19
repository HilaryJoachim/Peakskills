import { Star } from 'lucide-react'
import { Testimonial } from '@/lib/supabase'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ')
  const initials = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : name.slice(0, 2)
  return initials.toUpperCase()
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article style={{
      background: '#fff',
      border: '1px solid #DDE4EC',
      borderRadius: '8px',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 1px 4px rgba(29,36,48,0.06)',
      height: '100%',
    }}>
      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < testimonial.rating ? '#0077B6' : 'none'}
            stroke={i < testimonial.rating ? '#0077B6' : '#DDE4EC'}
            strokeWidth={1.5}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote style={{
        margin: 0,
        fontSize: '15px',
        lineHeight: 1.7,
        color: '#1D2430',
        fontStyle: 'italic',
        flex: 1,
        fontFamily: 'Source Sans 3, sans-serif',
      }}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #DDE4EC', paddingTop: '16px' }}>
        {testimonial.avatar_url ? (
          <img
            src={testimonial.avatar_url}
            alt={testimonial.author_name}
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: '#1D2430', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '15px',
            flexShrink: 0,
          }}>
            <Initials name={testimonial.author_name} />
          </div>
        )}
        <div>
          <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', color: '#1D2430' }}>
            {testimonial.author_name}
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#5C6B7A', lineHeight: 1.4 }}>
            {testimonial.role && `${testimonial.role}, `}{testimonial.organization}
          </p>
        </div>
      </div>
    </article>
  )
}
