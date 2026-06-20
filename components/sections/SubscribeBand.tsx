'use client'

import { useState } from 'react'

export default function SubscribeBand() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
  }

  return (
    <section style={{ background: '#009B91', padding: '40px 24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>

        {/* Top — title + description */}
        <div style={{ width: '100%' }}>
          <h2 style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 36px)', color: '#ffffff',
            margin: '0 0 12px', lineHeight: 1.2,
          }}>
            Stay Updated
          </h2>
          <p style={{
            fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px',
            color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0,
          }}>
            Subscribe to get new course dates, training programs,<br />
            and professional tips straight to your inbox.
          </p>
        </div>

        {/* Bottom — form */}
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {status === 'success' ? (
            <div style={{
              background: '#fff', borderRadius: '8px', padding: '14px 20px',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: '14px', color: '#1D2430',
            }}>
              ✓ You&apos;re subscribed! We&apos;ll be in touch with upcoming programs.
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', gap: '8px' }}
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
                  placeholder="Enter your email address"
                  disabled={status === 'loading'}
                  style={{
                    flex: 1, padding: '12px 18px',
                    borderRadius: '6px', border: 'none',
                    background: '#fff', color: '#1D2430',
                    fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: '#1D2430', color: '#fff',
                    padding: '12px 26px', borderRadius: '6px', border: 'none',
                    fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px',
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#263040' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1D2430' }}
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
              <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginTop: '16px', marginBottom: 0 }}>
                No spam — just useful updates, a few times a month.
              </p>
            </>
          )}
        </div>

      </div>
    </section>
  )
}
