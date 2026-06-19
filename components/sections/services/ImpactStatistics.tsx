'use client'

import { useState, useRef, useEffect } from 'react'

function AnimatedCounter({ target, suffix = '' }: { target: number, suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true
        const duration = 2000
        const steps = 60
        let current = 0
        const increment = target / steps

        const timer = setInterval(() => {
          current = Math.min(current + increment, target)
          setValue(Math.floor(current))
          if (current >= target) clearInterval(timer)
        }, duration / steps)
      }
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {value.toLocaleString()}{suffix}
    </span>
  )
}

export default function ImpactStatistics() {
  const stats = [
    { target: 5000, suffix: '+', label: 'Professionals Trained' },
    { target: 100, suffix: '+', label: 'Organizations Served' },
    { target: 95, suffix: '%', label: 'Participant Satisfaction' },
    { target: 15, suffix: '+', label: 'Training Categories' },
  ]

  return (
    <section style={{ backgroundColor: '#F4F7FA', padding: '80px 24px', borderTop: '1px solid #DDE4EC', borderBottom: '1px solid #DDE4EC' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#0077B6',
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: '12px'
                }}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div 
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#5C6B7A',
                  fontSize: '15px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
