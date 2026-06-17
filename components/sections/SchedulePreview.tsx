import Link from 'next/link'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

interface ScheduleRow {
  id: string
  start_date: string
  end_date: string
  location: string | null
  status: string
  seats_available: number
  program: {
    title: string
    slug: string
    format: string
  } | null
}

interface SchedulePreviewProps {
  cohorts: ScheduleRow[]
}

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  'open': { bg: 'rgba(46,204,64,0.15)', color: '#2ECC40', label: 'Open' },
  'filling-fast': { bg: 'rgba(255,193,7,0.15)', color: '#b45309', label: 'Filling Fast' },
  'full': { bg: 'rgba(220,38,38,0.12)', color: '#dc2626', label: 'Full' },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-TZ', { day: 'numeric', month: 'short' })
}
function formatYear(d: string) {
  return new Date(d).getFullYear()
}

export default function SchedulePreview({ cohorts }: SchedulePreviewProps) {
  return (
    <section style={{ background: '#1D2430', padding: '88px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: '12px', color: '#4DD0E1', textTransform: 'uppercase',
              letterSpacing: '0.08em', margin: '0 0 10px',
            }}>
              Upcoming Schedule
            </p>
            <h2 style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.2, color: '#fff', margin: 0,
            }}>
              Programs starting soon
            </h2>
          </div>
          <Link
            href="/schedule"
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px',
              color: '#4DD0E1', textDecoration: 'none',
              padding: '10px 20px', border: '1.5px solid rgba(77,208,225,0.4)', borderRadius: '6px',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              transition: 'border-color 0.15s, background 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#4DD0E1'; el.style.background = 'rgba(77,208,225,0.06)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(77,208,225,0.4)'; el.style.background = 'transparent' }}
          >
            View Full Schedule <ArrowRight size={14} />
          </Link>
        </div>

        {/* Table */}
        {cohorts.length > 0 ? (
          <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Source Sans 3, sans-serif' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Program', 'Dates', 'Location', 'Status', ''].map((h) => (
                    <th key={h} style={{
                      padding: '14px 20px', textAlign: 'left',
                      fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
                      fontSize: '12px', color: '#A9B4C2', textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map((cohort, i) => {
                  const status = STATUS_STYLES[cohort.status] ?? STATUS_STYLES.open
                  return (
                    <tr
                      key={cohort.id}
                      style={{
                        borderBottom: i < cohorts.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                    >
                      <td style={{ padding: '16px 20px' }}>
                        <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', color: '#fff' }}>
                          {cohort.program?.title ?? 'Program'}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#A9B4C2' }}>
                          {cohort.program?.format ? cohort.program.format.charAt(0).toUpperCase() + cohort.program.format.slice(1) : ''}
                        </p>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#A9B4C2' }}>
                          <Calendar size={14} strokeWidth={2} />
                          {formatDate(cohort.start_date)} – {formatDate(cohort.end_date)}, {formatYear(cohort.start_date)}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        {cohort.location && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#A9B4C2' }}>
                            <MapPin size={14} strokeWidth={2} />
                            {cohort.location.split('—')[0].trim()}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          background: status.bg, color: status.color,
                          fontSize: '12px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
                          padding: '4px 12px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}>
                          {status.label}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        {cohort.program?.slug && (
                          <Link
                            href={`/programs/${cohort.program.slug}#register`}
                            style={{
                              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
                              fontSize: '13px', color: '#1E88E5', textDecoration: 'none',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Register →
                          </Link>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px', color: '#A9B4C2', border: '1px dashed rgba(255,255,255,0.12)', borderRadius: '8px' }}>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px' }}>
              The upcoming schedule will be posted here. <Link href="/contact" style={{ color: '#4DD0E1' }}>Contact us</Link> to be notified.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
