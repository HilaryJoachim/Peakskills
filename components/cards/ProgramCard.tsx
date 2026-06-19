'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Program, Cohort } from '@/lib/supabase'

interface ProgramCardProps {
  program: Program & { cohorts?: Cohort[] }
  variant?: 'default' | 'featured'
  listView?: boolean
}

/* ─── Status pill config ─────────────────────────────────── */
const STATUS_CONFIG: Record<string, { bg: string; color: string; label: string }> = {
  'open':         { bg: '#DCFCE7', color: '#15803d', label: 'Open' },
  'filling-fast': { bg: '#FEF3C7', color: '#b45309', label: 'Filling Fast' },
  'full':         { bg: '#FEE2E2', color: '#dc2626', label: 'Full' },
  'completed':    { bg: '#F3F4F6', color: '#6b7280', label: 'Completed' },
  'free':         { bg: '#EFF6FF', color: '#0077B6', label: 'Free' },
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-TZ', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatPrice(price: number | null) {
  if (!price) return 'Contact for pricing'
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    maximumFractionDigits: 0,
  }).format(price)
}

/* ─── Icon helpers ─────────────────────────────────────────── */
function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C6B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C6B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
function SeatsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C6B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  )
}

/* ─── Card ───────────────────────────────────────────────── */
export default function ProgramCard({ program, listView = false }: ProgramCardProps) {
  const [hovered, setHovered] = useState(false)

  const nextCohort = program.cohorts
    ?.filter(c => c.status !== 'completed')
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0]

  const statusKey = program.price_type === 'free'
    ? 'free'
    : (nextCohort?.status ?? 'open')

  const status = STATUS_CONFIG[statusKey]

  const imageUrl =
    program.card_image_url ||
    program.hero_image_url ||
    `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=640&q=80&auto=format&fit=crop`

  const formatLabel =
    program.format === 'in-person' ? 'In-Person'
    : program.format === 'hybrid' ? 'Hybrid'
    : 'Online'

  /* ─── Shared card shell ── */
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: '1px solid #DDE4EC',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: listView ? 'row' : 'column',
        boxShadow: hovered
          ? '0 8px 32px rgba(29,36,48,0.12)'
          : '0 1px 4px rgba(29,36,48,0.07)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        height: '100%',
      }}
    >
      {/* ── Image ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: listView ? '100%' : '160px',
        width: listView ? '220px' : '100%',
        flexShrink: 0,
      }}>
        <img
          src={imageUrl}
          alt={`${program.title} training program`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>

      {/* ── Body ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '14px 16px 16px',
        gap: '0',
      }}>

        {/* ── Tag row: Category (left) + Status/Duration (right) ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          gap: '6px',
          flexWrap: 'wrap',
        }}>
          {/* Category tag — teal, uppercase */}
          {program.category && (
            <span style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              color: '#0FAFAF',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              {program.category.name}
            </span>
          )}

          {/* Status pill only — "Open" green, "Filling Fast" amber, etc. */}
          <span style={{
            background: status.bg,
            color: status.color,
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '20px',
            marginLeft: 'auto',
          }}>
            {status.label}
          </span>
        </div>

        {/* ── Title ── */}
        <h3 style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 700,
          fontSize: '15px',
          lineHeight: 1.3,
          color: '#1D2430',
          margin: '0 0 10px',
        }}>
          {program.title}
        </h3>

        {/* ── Meta: location / duration / seats ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
          {nextCohort?.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#5C6B7A', fontFamily: 'Source Sans 3, sans-serif' }}>
              <PinIcon />
              {nextCohort.location}
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#5C6B7A', fontFamily: 'Source Sans 3, sans-serif' }}>
            <ClockIcon />
            {program.duration_days} {program.duration_days === 1 ? 'Day' : 'Days'} · {formatLabel}
          </span>
          {nextCohort?.seats_available != null && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#5C6B7A', fontFamily: 'Source Sans 3, sans-serif' }}>
              <SeatsIcon />
              {nextCohort.seats_available} seats available
            </span>
          )}
        </div>

        {/* ── Start → End date boxes ── */}
        {nextCohort && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <div style={{
              flex: 1,
              background: '#F4F7FA',
              borderRadius: '8px',
              padding: '7px 10px',
              textAlign: 'center',
            }}>
              <p style={{ margin: '0 0 1px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '9px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Start</p>
              <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '12px', color: '#1D2430' }}>
                {formatDateShort(nextCohort.start_date)}
              </p>
            </div>
            {/* Arrow */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A9B4C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
            <div style={{
              flex: 1,
              background: '#F4F7FA',
              borderRadius: '8px',
              padding: '7px 10px',
              textAlign: 'center',
            }}>
              <p style={{ margin: '0 0 1px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '9px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>End</p>
              <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '12px', color: '#1D2430' }}>
                {formatDateShort(nextCohort.end_date)}
              </p>
            </div>
          </div>
        )}

        {/* ── Spacer ── */}
        <div style={{ flex: 1 }} />

        {/* ── Price row ── */}
        <div style={{
          borderTop: '1px solid #EEF1F5',
          paddingTop: '10px',
          marginBottom: '10px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Per person</span>
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1D2430' }}>
              {program.price_type === 'free' ? 'Free' : formatPrice(program.price_per_person)}
            </span>
          </div>
          {program.price_type === 'paid' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>Corporate group rate</span>
              <Link
                href={`/contact?program=${program.slug}`}
                style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#0FAFAF',
                  textDecoration: 'none',
                }}
              >
                Contact us →
              </Link>
            </div>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            href={`/programs/${program.slug}`}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1.5px solid #DDE4EC',
              background: 'transparent',
              color: '#1D2430',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'border-color 0.15s, background 0.15s',
              display: 'block',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#1D2430'
              el.style.background = '#F4F7FA'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#DDE4EC'
              el.style.background = 'transparent'
            }}
            aria-label={`Overview of ${program.title}`}
          >
            Overview
          </Link>
          <Link
            href={`/programs/${program.slug}#register`}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '9px 12px',
              borderRadius: '8px',
              background: '#0FAFAF',
              color: '#ffffff',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'background 0.15s',
              display: 'block',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0d9898' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0FAFAF' }}
            aria-label={`Register for ${program.title}`}
          >
            Register
          </Link>
        </div>

      </div>
    </article>
  )
}
