'use client'

import { useState } from 'react'
import Link from 'next/link'
import { learningCohorts, learningPaths } from '@/lib/mentorshipData'
import { Calendar, MapPin, Clock, Users, User } from 'lucide-react'

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  Open: { bg: '#DCFCE7', color: '#15803d' },
  'Almost Full': { bg: '#FEF3C7', color: '#b45309' },
  Closed: { bg: '#FEE2E2', color: '#dc2626' },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-TZ', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function LearningCohorts() {
  return (
    <>
      <section id="cohorts" style={{ background: '#000000', padding: '40px 24px 96px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                color: '#0FAFAF',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                margin: '0 0 12px',
              }}
            >
              Upcoming Intakes
            </p>
            <h2
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                lineHeight: 1.15,
                color: '#FFFFFF',
                margin: '0 0 14px',
              }}
            >
              Available Learning Cohorts
            </h2>
            <p
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '16px',
                color: '#A9B4C2',
                margin: '0 auto',
                maxWidth: '560px',
                lineHeight: 1.6,
              }}
            >
              Join a structured cohort with a fixed schedule, dedicated mentor, and limited seats
              for a focused learning experience.
            </p>
          </div>

          {/* Cohort cards */}
          <div
            className="cohorts-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
              gap: '24px',
            }}
          >
            {learningCohorts.map((cohort) => (
              <CohortCard key={cohort.id} cohort={cohort} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function CohortCard({ cohort }: { cohort: typeof learningCohorts[number] }) {
  const [hovered, setHovered] = useState(false)
  const status = STATUS_CONFIG[cohort.status]
  const linkedPath = learningPaths.find((p) => p.id === cohort.learningPathId)
  const seatsPct = ((cohort.seatsTotal - cohort.seatsAvailable) / cohort.seatsTotal) * 100
  const isClosed = cohort.status === 'Closed'

  const modeBadge =
    cohort.mode === 'Online'
      ? { bg: '#EFF6FF', color: '#0077B6' }
      : cohort.mode === 'Physical'
        ? { bg: '#FEF3C7', color: '#b45309' }
        : { bg: '#F0FDF4', color: '#15803d' }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: '1px solid #DDE4EC',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: hovered
          ? '0 8px 32px rgba(29,36,48,0.10)'
          : '0 1px 4px rgba(29,36,48,0.06)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        opacity: isClosed ? 0.6 : 1,
      }}
    >
      {/* Top row: Name + Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: '17px',
              color: '#1D2430',
              margin: '0 0 4px',
              lineHeight: 1.3,
            }}
          >
            {cohort.name}
          </h3>
          {linkedPath && (
            <span
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                color: '#0FAFAF',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {linkedPath.title}
            </span>
          )}
        </div>
        <span
          style={{
            background: status.bg,
            color: status.color,
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            padding: '4px 12px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {cohort.status}
        </span>
      </div>

      {/* Seats progress */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '13px',
              color: '#5C6B7A',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Users size={13} />
            {cohort.seatsAvailable} of {cohort.seatsTotal} seats available
          </span>
        </div>
        <div
          style={{
            height: '6px',
            background: '#EEF1F5',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${seatsPct}%`,
              background:
                seatsPct === 100
                  ? 'linear-gradient(to right, #f59e0b, #dc2626)'
                  : seatsPct >= 50
                  ? 'linear-gradient(to right, #0077B6, #4DD0E1)'
                  : 'linear-gradient(to right, #10b981, #34d399)',
              borderRadius: '3px',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>

      {/* Date boxes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            flex: 1,
            background: '#F4F7FA',
            borderRadius: '8px',
            padding: '8px 12px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: '0 0 2px',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '9px',
              color: '#5C6B7A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Start
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: '#1D2430',
            }}
          >
            {formatDate(cohort.startDate)}
          </p>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A9B4C2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
        <div
          style={{
            flex: 1,
            background: '#F4F7FA',
            borderRadius: '8px',
            padding: '8px 12px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: '0 0 2px',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '9px',
              color: '#5C6B7A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            End
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: '#1D2430',
            }}
          >
            {formatDate(cohort.endDate)}
          </p>
        </div>
      </div>

      {/* Meta details */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '13px',
          color: '#5C6B7A',
          fontFamily: 'Source Sans 3, sans-serif',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Calendar size={13} /> {cohort.schedule}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <User size={13} /> {cohort.mentor}
        </span>
        <span
          style={{
            background: modeBadge.bg,
            color: modeBadge.color,
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '20px',
          }}
        >
          {cohort.mode}
        </span>
      </div>

      {/* Apply button */}
      <Link
        href={isClosed ? '#' : `?cohort=${encodeURIComponent(cohort.name)}&program=${encodeURIComponent(linkedPath?.title || '')}#apply`}
        aria-disabled={isClosed}
        style={{
          textAlign: 'center',
          padding: '10px 16px',
          borderRadius: '8px',
          background: isClosed ? '#A9B4C2' : '#0077B6',
          color: '#ffffff',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          textDecoration: 'none',
          transition: 'background 0.15s',
          display: 'block',
          cursor: isClosed ? 'not-allowed' : 'pointer',
          pointerEvents: isClosed ? 'none' : 'auto',
        }}
        onMouseEnter={(e) => {
          if (!isClosed) (e.currentTarget as HTMLElement).style.background = '#005F8E'
        }}
        onMouseLeave={(e) => {
          if (!isClosed) (e.currentTarget as HTMLElement).style.background = '#0077B6'
        }}
      >
        {isClosed ? 'Cohort Closed' : 'Apply for This Cohort'}
      </Link>
    </article>
  )
}
