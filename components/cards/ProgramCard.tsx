import Link from 'next/link'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { Program, Cohort } from '@/lib/supabase'

interface ProgramCardProps {
  program: Program & { cohorts?: Cohort[] }
  variant?: 'default' | 'featured'
}

const FORMAT_LABELS: Record<string, string> = {
  'in-person': 'In-Person',
  'online': 'Online',
  'hybrid': 'Hybrid',
}

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  'open': { bg: '#ECFDF5', color: '#16a34a', label: 'Open' },
  'filling-fast': { bg: '#FEF3C7', color: '#b45309', label: 'Filling Fast' },
  'full': { bg: '#FEE2E2', color: '#dc2626', label: 'Full' },
  'completed': { bg: '#F3F4F6', color: '#6b7280', label: 'Completed' },
  'free': { bg: '#EFF6FF', color: '#1E88E5', label: 'Free' },
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-TZ', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatPrice(price: number | null) {
  if (!price) return 'Contact for pricing'
  return new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(price)
}

export default function ProgramCard({ program, variant = 'default' }: ProgramCardProps) {
  const nextCohort = program.cohorts
    ?.filter(c => c.status !== 'completed')
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0]

  const statusKey = program.price_type === 'free'
    ? 'free'
    : (nextCohort?.status ?? 'open')

  const statusStyle = STATUS_STYLES[statusKey]

  const imageUrl = program.card_image_url || program.hero_image_url ||
    `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=480&q=80&auto=format`

  return (
    <article
      style={{
        background: '#fff',
        border: '1px solid #DDE4EC',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 1px 4px rgba(29,36,48,0.06)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        height: '100%',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 4px 12px rgba(29,36,48,0.12), 0 12px 32px rgba(29,36,48,0.08)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 1px 4px rgba(29,36,48,0.06)'
        el.style.transform = 'none'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: variant === 'featured' ? '200px' : '180px', flexShrink: 0 }}>
        <img
          src={imageUrl}
          alt={`${program.title} — training program`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none' }}
          loading="lazy"
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {program.category && (
            <span style={{
              background: '#1D2430', color: '#fff',
              fontSize: '11px', fontWeight: 600, fontFamily: 'IBM Plex Sans, sans-serif',
              padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>{program.category.name}</span>
          )}
          <span style={{
            background: statusStyle.bg, color: statusStyle.color,
            fontSize: '11px', fontWeight: 600, fontFamily: 'IBM Plex Sans, sans-serif',
            padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>{statusStyle.label}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <h3 style={{
          fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
          fontSize: '17px', lineHeight: 1.3, color: '#1D2430', margin: 0,
        }}>
          {program.title}
        </h3>

        {program.short_description && (
          <p style={{ fontSize: '14px', color: '#5C6B7A', lineHeight: 1.6, margin: 0 }}>
            {program.short_description}
          </p>
        )}

        {/* Meta row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#5C6B7A' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} strokeWidth={2} />
            {program.duration_days} {program.duration_days === 1 ? 'Day' : 'Days'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={13} strokeWidth={2} />
            {FORMAT_LABELS[program.format]}
          </span>
          {nextCohort?.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} strokeWidth={2} />
              {nextCohort.location.split('—')[0].trim()}
            </span>
          )}
        </div>

        {/* Date */}
        {nextCohort && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1E88E5', fontWeight: 500 }}>
            <Calendar size={13} strokeWidth={2} />
            {formatDate(nextCohort.start_date)} – {formatDate(nextCohort.end_date)}
          </div>
        )}

        {/* Price */}
        <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
          {program.price_type === 'free' ? (
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#2ECC40' }}>Free</span>
          ) : (
            <div>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1D2430' }}>
                {formatPrice(program.price_per_person)}
              </span>
              <span style={{ fontSize: '13px', color: '#5C6B7A', marginLeft: '4px' }}>/ person</span>
            </div>
          )}
          {program.price_type === 'paid' && (
            <p style={{ fontSize: '12px', color: '#5C6B7A', margin: '2px 0 0' }}>Contact for group pricing</p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <Link
            href={`/programs/${program.slug}`}
            style={{
              flex: 1, textAlign: 'center', padding: '10px 16px', borderRadius: '6px',
              background: '#1E88E5', color: '#fff',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px',
              textDecoration: 'none', transition: 'background 0.15s',
              display: 'block',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1565C0' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1E88E5' }}
            aria-label={`View details for ${program.title}`}
          >
            View Details
          </Link>
          <Link
            href={`/programs/${program.slug}#register`}
            style={{
              flex: 1, textAlign: 'center', padding: '10px 16px', borderRadius: '6px',
              background: 'transparent', color: '#1D2430',
              border: '1.5px solid #DDE4EC',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px',
              textDecoration: 'none', transition: 'background 0.15s, border-color 0.15s',
              display: 'block',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F4F7FA'; el.style.borderColor = '#1E88E5' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = '#DDE4EC' }}
            aria-label={`Register for ${program.title}`}
          >
            Register
          </Link>
        </div>
      </div>
    </article>
  )
}
