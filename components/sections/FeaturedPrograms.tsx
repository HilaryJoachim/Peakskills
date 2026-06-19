'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProgramCard from '@/components/cards/ProgramCard'
import { Program } from '@/lib/supabase'

interface FeaturedProgramsProps {
  programs: Program[]
}

export default function FeaturedPrograms({ programs }: FeaturedProgramsProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <section style={{ background: '#ffffff', padding: '36px 24px 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── Header row ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          {/* Left: eyebrow + title + subtitle */}
          <div>
            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              color: '#0FAFAF',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              margin: '0 0 10px',
            }}>
              Training Courses
            </p>
            <h2 style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              lineHeight: 1.15,
              color: '#1D2430',
              margin: '0 0 12px',
            }}>
              Browse Our Course Catalogue
            </h2>
            <p style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '15px',
              color: '#5C6B7A',
              margin: 0,
              lineHeight: 1.6,
            }}>
              All courses include materials, assessments, and a certificate of completion.
            </p>
          </div>

          {/* Right: Grid / List toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1.5px solid #DDE4EC',
            borderRadius: '8px',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <button
              onClick={() => setView('grid')}
              aria-label="Grid view"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                border: 'none',
                borderRight: '1.5px solid #DDE4EC',
                cursor: 'pointer',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                background: view === 'grid' ? '#F4F7FA' : '#ffffff',
                color: view === 'grid' ? '#1D2430' : '#5C6B7A',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {/* Grid icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              Grid
            </button>
            <button
              onClick={() => setView('list')}
              aria-label="List view"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                background: view === 'list' ? '#F4F7FA' : '#ffffff',
                color: view === 'list' ? '#1D2430' : '#5C6B7A',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {/* List icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              List
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        {programs.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: view === 'grid'
              ? 'repeat(auto-fill, minmax(320px, 1fr))'
              : '1fr',
            gap: '24px',
          }}>
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                variant="featured"
                listView={view === 'list'}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: '#5C6B7A' }}>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px' }}>
              Programs are being updated. Please check back shortly or{' '}
              <Link href="/contact" style={{ color: '#0077B6' }}>contact us</Link>.
            </p>
          </div>
        )}

        {/* ── View all link ── */}
        {programs.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/programs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: '#0077B6',
                textDecoration: 'none',
                padding: '10px 24px',
                border: '1.5px solid #0077B6',
                borderRadius: '6px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EBF5FF' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              View All Programs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
