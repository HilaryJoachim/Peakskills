'use client'

import { useState } from 'react'

interface SubscribeBandProps {}

export default function SubscribeBand({}: SubscribeBandProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // In a real implementation, POST to a Supabase edge function or API route
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
  }

  return (
    <section style={{ background: '#4DD0E1', padding: '72px 24px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
          fontSize: '12px', color: '#1D2430', textTransform: 'uppercase',
          letterSpacing: '0.08em', margin: '0 0 12px', opacity: 0.7,
        }}>
          Stay Informed
        </p>
        <h2 style={{
          fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700,
          fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.2, color: '#1D2430',
          margin: '0 0 12px',
        }}>
          Receive our training schedule and updates
        </h2>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px', lineHeight: 1.65, color: 'rgba(29,36,48,0.7)', margin: '0 0 32px' }}>
          Subscribe to receive advance notice of new programs, schedule updates, and professional development resources — no marketing content.
        </p>

        {status === 'success' ? (
          <div style={{
            background: '#fff', borderRadius: '8px', padding: '20px 28px',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
            fontSize: '15px', color: '#1D2430',
          }}>
            ✓ You&apos;re subscribed. We&apos;ll be in touch with upcoming programs.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <label htmlFor="subscribe-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
              Email address
            </label>
            <input
              id="subscribe-email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your work email address"
              disabled={status === 'loading'}
              style={{
                flex: '1 1 260px', padding: '12px 16px',
                borderRadius: '6px', border: '1.5px solid rgba(29,36,48,0.2)',
                background: '#fff', color: '#1D2430',
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px',
                outline: 'none', transition: 'border-color 0.15s',
              }}
              onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1D2430' }}
              onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(29,36,48,0.2)' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: '#1D2430', color: '#fff',
                padding: '12px 24px', borderRadius: '6px', border: 'none',
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '15px',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                transition: 'background 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#263040' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1D2430' }}
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: 'rgba(29,36,48,0.5)', marginTop: '16px' }}>
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
