import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getProgramBySlug, getAllProgramSlugs, getPrograms } from '@/lib/supabase'
import { Calendar, Clock, MapPin, Users, CheckCircle, Award, Monitor, Building2 } from 'lucide-react'
import ProgramCard from '@/components/cards/ProgramCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) return { title: 'Program Not Found' }

  return {
    title: `${program.title} — ${program.duration_days}-Day ${program.format === 'online' ? 'Online' : 'Corporate Training'}`,
    description: program.short_description ?? undefined,
  }
}

export const revalidate = 3600

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  'open': { bg: '#ECFDF5', color: '#16a34a', label: 'Open' },
  'filling-fast': { bg: '#FEF3C7', color: '#b45309', label: 'Filling Fast' },
  'full': { bg: '#FEE2E2', color: '#dc2626', label: 'Full' },
  'completed': { bg: '#F3F4F6', color: '#6b7280', label: 'Completed' },
}

function formatDateFull(d: string) {
  return new Date(d).toLocaleDateString('en-TZ', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params
  const [program, allPrograms] = await Promise.all([
    getProgramBySlug(slug),
    getPrograms({ limit: 20 }),
  ])

  if (!program) notFound()

  const upcomingCohorts = (program.cohorts ?? [])
    .filter(c => c.status !== 'completed')
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

  const nextCohort = upcomingCohorts[0]

  const relatedPrograms = allPrograms
    .filter(p => p.id !== program.id && p.category_id === program.category_id)
    .slice(0, 3)

  const imageUrl = program.hero_image_url ||
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=85&auto=format&fit=crop'

  const FORMAT_LABELS: Record<string, string> = {
    'in-person': 'In-Person',
    'online': 'Online',
    'hybrid': 'Online & In-Person',
  }

  const sessionDateString = nextCohort ? `${formatDateFull(nextCohort.start_date)} – ${formatDateFull(nextCohort.end_date)}` : '';
  const locationString = nextCohort?.location ? nextCohort.location.split('—')[0].trim() : '';
  const registerUrl = `/register?program=${encodeURIComponent(program.title)}&session=${encodeURIComponent(sessionDateString)}&location=${encodeURIComponent(locationString)}`;

  return (
    <>
      <Header />
      <main style={{ paddingTop: '72px' }}>
        {/* ── HERO ─────────────────────────────────────────── */}
        <div style={{ background: '#1D2430' }}>
          {/* Breadcrumb */}
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px' }}>
            <nav aria-label="Breadcrumb">
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/programs" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Programs</Link></li>
                {program.category && (
                  <>
                    <li aria-hidden>/</li>
                    <li>
                      <Link href={`/programs/category/${program.category.slug}`} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                        {program.category.name}
                      </Link>
                    </li>
                  </>
                )}
                <li aria-hidden>/</li>
                <li aria-current="page" style={{ color: '#fff' }}>{program.title}</li>
              </ol>
            </nav>
          </div>

          {/* Hero content */}
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 56px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,3fr) minmax(0,2fr)', gap: '56px', alignItems: 'start' }} className="detail-hero-grid">
              {/* Left */}
              <div>
                {program.category && (
                  <span style={{
                    background: 'rgba(77,208,225,0.15)', color: '#4DD0E1',
                    fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '11px',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    padding: '4px 12px', borderRadius: '4px', display: 'inline-block', marginBottom: '20px',
                  }}>
                    {program.category.name}
                  </span>
                )}

                <h1 style={{
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700,
                  fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15,
                  color: '#fff', margin: '0 0 20px', letterSpacing: '-0.3px',
                }}>
                  {program.title}
                </h1>

                <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', margin: '0 0 32px', maxWidth: '540px' }}>
                  {program.short_description}
                </p>

                {/* Quick meta */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Source Sans 3, sans-serif' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={15} strokeWidth={2} style={{ color: '#4DD0E1' }} />
                    {program.duration_days} {program.duration_days === 1 ? 'Day' : 'Days'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Monitor size={15} strokeWidth={2} style={{ color: '#4DD0E1' }} />
                    {FORMAT_LABELS[program.format]}
                  </span>
                  {nextCohort && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={15} strokeWidth={2} style={{ color: '#4DD0E1' }} />
                      Next: {formatDateFull(nextCohort.start_date)}
                    </span>
                  )}
                  {nextCohort?.location && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={15} strokeWidth={2} style={{ color: '#4DD0E1' }} />
                      {nextCohort.location.split('—')[0].trim()}
                    </span>
                  )}
                </div>

                {/* Primary CTAs — visible without scrolling */}
                <div style={{ display: 'flex', gap: '20px', marginTop: '36px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: '240px', maxWidth: '300px' }}>
                    <Link
                      href={registerUrl}
                      style={{
                        background: '#0077B6', color: '#fff',
                        padding: '13px 28px', borderRadius: '6px', textAlign: 'center',
                        fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '15px',
                        textDecoration: 'none', display: 'inline-block',
                      }}
                    >
                      Register For This Session
                    </Link>
                  </div>

                </div>
              </div>

              {/* Right — Hero image */}
              <div style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
                <img
                  src={imageUrl}
                  alt={`${program.title} — training session`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '64px', alignItems: 'start' }} className="detail-content-grid">

            {/* Left: Program content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

              {/* Overview */}
              <section aria-labelledby="overview-heading">
                <h2 id="overview-heading" style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '22px', color: '#1D2430', margin: '0 0 20px', paddingBottom: '12px', borderBottom: '2px solid #DDE4EC' }}>
                  Program Overview
                </h2>
                <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px', lineHeight: 1.75, color: '#1D2430', margin: 0 }}>
                  {program.overview}
                </p>
              </section>

              {/* Learning Outcomes */}
              {program.learning_outcomes && program.learning_outcomes.length > 0 && (
                <section aria-labelledby="outcomes-heading">
                  <h2 id="outcomes-heading" style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '22px', color: '#1D2430', margin: '0 0 20px', paddingBottom: '12px', borderBottom: '2px solid #DDE4EC' }}>
                    What You Will Learn
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {program.learning_outcomes.map((outcome, i) => (
                      <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <CheckCircle size={18} style={{ color: '#0077B6', flexShrink: 0, marginTop: '3px' }} strokeWidth={2} />
                        <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px', lineHeight: 1.6, color: '#1D2430' }}>
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Target Audience */}
              {program.target_audience && (
                <section aria-labelledby="audience-heading">
                  <h2 id="audience-heading" style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '22px', color: '#1D2430', margin: '0 0 20px', paddingBottom: '12px', borderBottom: '2px solid #DDE4EC' }}>
                    Who This Program Is For
                  </h2>
                  <div style={{ 
                    position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, #0A1628 0%, #1D2430 45%, #0D2137 100%)', 
                    borderRadius: '8px', padding: '24px',
                    boxShadow: '0 8px 24px rgba(29,36,48,0.1)'
                  }}>
                    {/* Decorative dot-grid overlay */}
                    <div
                      style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 0, opacity: 0.06,
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <Users size={22} style={{ color: '#4DD0E1', flexShrink: 0, marginTop: '2px' }} strokeWidth={2} />
                      <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                        {program.target_audience}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Delivery Methods */}
              <section aria-labelledby="delivery-heading">
                <h2 id="delivery-heading" style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '22px', color: '#1D2430', margin: '0 0 20px', paddingBottom: '12px', borderBottom: '2px solid #DDE4EC' }}>
                  Delivery & Format
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                  {[
                    { icon: <Clock size={20} strokeWidth={2} />, label: 'Duration', value: `${program.duration_days} ${program.duration_days === 1 ? 'Day' : 'Days'}` },
                    { icon: <Monitor size={20} strokeWidth={2} />, label: 'Format', value: FORMAT_LABELS[program.format] },
                    { icon: <Building2 size={20} strokeWidth={2} />, label: 'Delivery Options', value: 'Public & In-House' },
                  ].map((item, i) => (
                    <div key={i} style={{ border: '1px solid #DDE4EC', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ color: '#0077B6' }}>{item.icon}</div>
                      <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {item.label}
                      </p>
                      <p style={{ margin: 0, fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', fontWeight: 500, color: '#1D2430' }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certification */}
              {program.certification_info && (
                <section aria-labelledby="cert-heading">
                  <h2 id="cert-heading" style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '22px', color: '#1D2430', margin: '0 0 20px', paddingBottom: '12px', borderBottom: '2px solid #DDE4EC' }}>
                    Certification
                  </h2>
                  <div style={{ 
                    position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, #0A1628 0%, #1D2430 45%, #0D2137 100%)', 
                    borderRadius: '8px', padding: '24px',
                    boxShadow: '0 8px 24px rgba(29,36,48,0.1)'
                  }}>
                    {/* Decorative dot-grid overlay */}
                    <div
                      style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 0, opacity: 0.06,
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <Award size={22} style={{ color: '#FFB300', flexShrink: 0, marginTop: '2px' }} strokeWidth={2} />
                      <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                        {program.certification_info}
                      </p>
                    </div>
                  </div>
                </section>
              )}


            </div>

            {/* Right: Sidebar */}
            <aside style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Pricing card */}
              <div style={{ border: '2px solid #DDE4EC', borderRadius: '10px', padding: '28px', background: '#fff', boxShadow: '0 4px 16px rgba(29,36,48,0.08)' }}>
                {program.price_type === 'free' ? (
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '36px', color: '#2ECC40' }}>Free</span>
                    <p style={{ margin: '4px 0 0', fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>No enrollment fee for this program</p>
                  </div>
                ) : (
                  <div style={{ marginBottom: '20px' }}>
                    {program.price_per_person && (
                      <>
                        <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '32px', color: '#1D2430' }}>
                          {new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(program.price_per_person)}
                        </span>
                        <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}> / per person</span>
                      </>
                    )}
                    <p style={{ margin: '8px 0 0', fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>
                      Group and in-house pricing available — contact us for a quote.
                    </p>
                  </div>
                )}

                {/* Registration Info */}
                <div style={{ marginTop: '16px' }}>
                  <p style={{ margin: 0, fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A', lineHeight: 1.5 }}>
                    Available seats can be reserved through the{' '}
                    <Link href={registerUrl} style={{ color: '#0077B6', textDecoration: 'underline', fontWeight: 600 }}>
                      registration form
                    </Link>.
                  </p>
                </div>


                {/* Quick facts */}
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #DDE4EC', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Duration', value: `${program.duration_days} ${program.duration_days === 1 ? 'Day' : 'Days'}` },
                    { label: 'Format', value: FORMAT_LABELS[program.format] },
                    { label: 'Language', value: 'English (Kiswahili available)' },
                    ...(nextCohort?.location ? [{ label: 'Location', value: nextCohort.location.split('—')[0].trim() }] : []),
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>{item.label}</span>
                      <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1D2430', textAlign: 'right' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corporate inquiry card */}
              <div style={{ 
                position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(135deg, #0A1628 0%, #1D2430 45%, #0D2137 100%)', 
                borderRadius: '10px', padding: '28px',
                boxShadow: '0 8px 24px rgba(29,36,48,0.1)'
              }}>
                {/* Decorative dot-grid overlay */}
                <div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 0, opacity: 0.06,
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px', color: '#fff', margin: '0 0 10px' }}>
                    Training your whole team?
                  </h3>
                  <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', lineHeight: 1.65, color: 'rgba(255,255,255,0.85)', margin: '0 0 20px' }}>
                    We can deliver this program exclusively for your organization — customized for your sector, at your premises, on your schedule.
                  </p>
                  <Link
                    href={`/request-training?program=${encodeURIComponent(program.title)}`}
                    style={{
                      background: '#4DD0E1', color: '#0A1628',
                      padding: '11px 20px', borderRadius: '6px', textAlign: 'center',
                      fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '14px',
                      textDecoration: 'none', display: 'block',
                    }}
                  >
                    Request In-House Delivery
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── RELATED PROGRAMS ─────────────────────────────── */}
        {relatedPrograms.length > 0 && (
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
            <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '24px', color: '#1D2430', margin: '0 0 32px' }}>
              Related Programs
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {relatedPrograms.map(p => (
                <ProgramCard key={p.id} program={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      <style>{`
        @media (max-width: 1023px) {
          .detail-hero-grid { grid-template-columns: 1fr !important; }
          .detail-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
