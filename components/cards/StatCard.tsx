'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCardProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function StatCard({ value, suffix = '', prefix = '', label, duration = 1400 }: StatCardProps) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, value, duration])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        aria-label={`${prefix}${value}${suffix} ${label}`}
        style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 700,
          fontSize: '40px',
          lineHeight: 1.1,
          color: '#fff',
          letterSpacing: '-0.5px',
        }}
      >
        {prefix}{display.toLocaleString()}{suffix}
      </div>
      <div style={{
        fontFamily: 'Source Sans 3, sans-serif',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.7)',
        marginTop: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontWeight: 500,
      }}>
        {label}
      </div>
    </div>
  )
}
