import Link from 'next/link'
import ProgramCard from '@/components/cards/ProgramCard'
import { Program } from '@/lib/supabase'

interface FeaturedProgramsProps {
  programs: Program[]
}

export default function FeaturedPrograms({ programs }: FeaturedProgramsProps) {
  return (
    <section style={{ background: '#F4F7FA', padding: '88px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ maxWidth: '480px' }}>
            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: '12px', color: '#1E88E5', textTransform: 'uppercase',
              letterSpacing: '0.08em', margin: '0 0 12px',
            }}>
              Upcoming Programs
            </p>
            <h2 style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.2, color: '#1D2430', margin: 0,
            }}>
              Open courses available now
            </h2>
          </div>
          <Link
            href="/programs"
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px',
              color: '#1E88E5', textDecoration: 'none', whiteSpace: 'nowrap',
              padding: '10px 20px', border: '1.5px solid #1E88E5', borderRadius: '6px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#EBF5FF' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent' }}
          >
            View All Programs →
          </Link>
        </div>

        {/* Grid */}
        {programs.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} variant="featured" />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: '#5C6B7A' }}>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px' }}>
              Programs are being updated. Please check back shortly or{' '}
              <Link href="/contact" style={{ color: '#1E88E5' }}>contact us</Link>.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
