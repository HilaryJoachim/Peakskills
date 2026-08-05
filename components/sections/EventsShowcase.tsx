'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
// Link & AnimatedCounter removed — CTA and stats strip no longer displayed

/* ─── Data ──────────────────────────────────────────────── */
// Replaced hardcoded events with dynamic ones via props

/* ─── Card ───────────────────────────────────────────────── */
function EventCard({ event }: { event: any }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="ec-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: '320px',
        height: '280px',
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,0.22)'
          : '0 4px 16px rgba(0,0,0,0.10)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        userSelect: 'none',
      }}
    >
      {/* Image */}
      <img
        src={event.image}
        alt={event.alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Tag badge */}
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        background: 'rgba(30,136,229,0.92)',
        backdropFilter: 'blur(6px)',
        borderRadius: '20px',
        padding: '4px 12px',
        fontSize: '11px',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontWeight: 600,
        color: '#fff',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        {event.tag}
      </div>

      {/* Bottom gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(15,20,30,0.92) 0%, rgba(15,20,30,0.5) 45%, transparent 75%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px',
      }}>
        <p style={{
          margin: '0 0 6px',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: 1.3,
          color: hovered ? '#4DD0E1' : '#ffffff',
          transition: 'color 0.25s ease',
        }}>
          {event.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <p style={{
            margin: 0,
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.65)',
          }}>
            {event.location}
          </p>
          <span style={{
            marginLeft: 'auto',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 600,
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
          }}>
            {event.year}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Section ───────────────────────────────────────── */
export default function EventsShowcase({ items = [] }: { items?: any[] }) {
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const animRef  = useRef<number | null>(null)
  const pos1Ref  = useRef(0)
  const pos2Ref  = useRef(0)
  const paused1Ref = useRef(false)
  const paused2Ref = useRef(false)

  // Map database gallery items to component event format
  const mappedEvents = items.map(item => ({
    id: item.id,
    title: item.event_title,
    location: item.location || 'Tanzania',
    year: item.event_date ? new Date(item.event_date).getFullYear().toString() : new Date().getFullYear().toString(),
    image: item.image_url,
    alt: item.event_title,
    tag: item.tag || 'EVENT'
  }))

  // If there are very few items, duplicate them so the scrolling track doesn't look empty
  const minItemsRequired = 8
  let displayEvents = [...mappedEvents]
  if (displayEvents.length > 0 && displayEvents.length < minItemsRequired) {
    while (displayEvents.length < minItemsRequired) {
      displayEvents = [...displayEvents, ...mappedEvents]
    }
  }

  // Split into top and bottom tracks
  const half = Math.ceil(displayEvents.length / 2)
  const TOP_EVENTS = displayEvents.slice(0, half)
  const BOTTOM_EVENTS = displayEvents.slice(half)

  // If no items at all, don't render the section or just render empty (we'll return null to hide it)
  if (displayEvents.length === 0) {
    return null
  }

  // Duplicate cards for seamless infinite loop
  const DOUBLED1 = [...TOP_EVENTS, ...TOP_EVENTS, ...TOP_EVENTS, ...TOP_EVENTS]
  const DOUBLED2 = [...BOTTOM_EVENTS].reverse()
  const DOUBLED2_FULL = [...DOUBLED2, ...DOUBLED2, ...DOUBLED2, ...DOUBLED2]

  const CARD_WIDTH = 320
  const CARD_GAP   = 20
  const ITEM_W     = CARD_WIDTH + CARD_GAP
  const TOTAL_ORIG1 = TOP_EVENTS.length * ITEM_W  // width of top set
  const TOTAL_ORIG2 = BOTTOM_EVENTS.length * ITEM_W  // width of bottom set

  const SPEED = 0.8 // px per frame

  /* ── Animation loop ── */
  const animate = useCallback(function loop() {
    if (track1Ref.current && track2Ref.current) {
      if (!paused1Ref.current) {
        pos1Ref.current += SPEED
        if (pos1Ref.current >= TOTAL_ORIG1) pos1Ref.current -= TOTAL_ORIG1
        track1Ref.current.style.transform = `translateX(-${pos1Ref.current}px)`
      }
      
      if (!paused2Ref.current) {
        pos2Ref.current += SPEED
        if (pos2Ref.current >= TOTAL_ORIG2) pos2Ref.current -= TOTAL_ORIG2
        track2Ref.current.style.transform = `translateX(-${TOTAL_ORIG2 - pos2Ref.current}px)`
      }
    }
    animRef.current = requestAnimationFrame(loop)
  }, [TOTAL_ORIG1, TOTAL_ORIG2])

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return
    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [animate])

  /* ── Touch swipe ── */
  const touchStartX1 = useRef(0)
  const touchStartX2 = useRef(0)

  // Track 1 Handlers
  const handleTouchStart1 = (e: React.TouchEvent) => {
    touchStartX1.current = e.touches[0].clientX
    paused1Ref.current = true
  }
  const handleTouchMove1 = (e: React.TouchEvent) => {
    const dx = touchStartX1.current - e.touches[0].clientX
    pos1Ref.current = pos1Ref.current + dx * 0.6
    
    if (pos1Ref.current >= TOTAL_ORIG1) pos1Ref.current -= TOTAL_ORIG1
    if (pos1Ref.current < 0) pos1Ref.current += TOTAL_ORIG1

    touchStartX1.current = e.touches[0].clientX
    if (track1Ref.current) {
      track1Ref.current.style.transform = `translateX(-${pos1Ref.current}px)`
    }
  }
  const handleTouchEnd1 = () => { paused1Ref.current = false }

  // Track 2 Handlers
  const handleTouchStart2 = (e: React.TouchEvent) => {
    touchStartX2.current = e.touches[0].clientX
    paused2Ref.current = true
  }
  const handleTouchMove2 = (e: React.TouchEvent) => {
    const dx = touchStartX2.current - e.touches[0].clientX
    pos2Ref.current = pos2Ref.current + dx * 0.6
    
    if (pos2Ref.current >= TOTAL_ORIG2) pos2Ref.current -= TOTAL_ORIG2
    if (pos2Ref.current < 0) pos2Ref.current += TOTAL_ORIG2

    touchStartX2.current = e.touches[0].clientX
    if (track2Ref.current) {
      track2Ref.current.style.transform = `translateX(-${TOTAL_ORIG2 - pos2Ref.current}px)`
    }
  }
  const handleTouchEnd2 = () => { paused2Ref.current = false }

  return (
    <section
      id="events-showcase"
      aria-labelledby="events-heading"
      style={{
        background: '#ffffff',
        padding: '40px 0 80px',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: '48px' }}>
        <p style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 600,
          fontSize: '13px',
          color: '#0077B6',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          margin: '0 0 14px',
        }}>
          Events &amp; Conferences
        </p>
        <h2
          id="events-heading"
          style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(30px, 4vw, 48px)',
            lineHeight: 1.15,
            color: '#1D2430',
            margin: 0,
          }}
        >
          Where Learning Meets{' '}
          <span style={{ color: '#0077B6' }}>Impact</span>
        </h2>
      </div>

      {/* ── Carousel Container ── */}
      <div
        style={{ position: 'relative' }}
      >
        {/* Track 1 (Moves Left) */}
        <div
          style={{ overflow: 'hidden', padding: '12px 0 10px' }}
          onMouseEnter={() => { paused1Ref.current = true }}
          onMouseLeave={() => { paused1Ref.current = false }}
          onTouchStart={handleTouchStart1}
          onTouchMove={handleTouchMove1}
          onTouchEnd={handleTouchEnd1}
        >
          <div
            ref={track1Ref}
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              willChange: 'transform',
              paddingLeft: '60px',
            }}
          >
            {DOUBLED1.map((event, idx) => (
              <EventCard key={`t1-${event.id}-${idx}`} event={event} />
            ))}
          </div>
        </div>

        {/* Track 2 (Moves Right) */}
        <div
          style={{ overflow: 'hidden', padding: '10px 0 20px' }}
          onMouseEnter={() => { paused2Ref.current = true }}
          onMouseLeave={() => { paused2Ref.current = false }}
          onTouchStart={handleTouchStart2}
          onTouchMove={handleTouchMove2}
          onTouchEnd={handleTouchEnd2}
        >
          <div
            ref={track2Ref}
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              willChange: 'transform',
              paddingLeft: '60px',
            }}
          >
            {DOUBLED2_FULL.map((event, idx) => (
              <EventCard key={`t2-${event.id}-${idx}`} event={event} />
            ))}
          </div>
        </div>

        {/* Left fade edge */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '80px',
          background: 'linear-gradient(to right, #ffffff, transparent)',
          pointerEvents: 'none',
          zIndex: 5,
        }} />
        {/* Right fade edge */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: '80px',
          background: 'linear-gradient(to left, #ffffff, transparent)',
          pointerEvents: 'none',
          zIndex: 5,
        }} />
      </div>

    </section>
  )
}
