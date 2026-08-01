'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      setStatus('success')
      setMessage('If an account matches that email, a password reset link has been sent.')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0B1120 0%, #0F172A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '40px',
          boxShadow: '0 24px 40px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ marginBottom: '24px' }}>
          <img src="/logo.png" alt="PeakSkills Logo" style={{ height: '40px', width: 'auto' }} />
        </Link>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <CheckCircle size={56} style={{ color: '#0FAFAF', margin: '0 auto 16px' }} />
            <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#ffffff', margin: '0 0 12px' }}>
              Check your inbox
            </h2>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: '0 0 32px', lineHeight: 1.5 }}>
              {message}
            </p>
            <Link
              href="/login"
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'background 0.2s'
              }}
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#ffffff', margin: '0 0 8px', width: '100%', textAlign: 'center' }}>
              Reset Password
            </h2>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: '0 0 32px', textAlign: 'center' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {status === 'error' && (
              <div style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#E2E8F0', fontSize: '14px', fontWeight: 500, marginBottom: '8px', textAlign: 'left', width: '100%' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="student@example.com"
                    style={{
                      width: '100%', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px', padding: '14px 16px 14px 44px', color: '#ffffff', fontSize: '15px',
                      outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
                    }}
                    onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#0FAFAF')}
                    onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#ffffff',
                  padding: '14px', borderRadius: '12px', border: 'none', fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: 600, fontSize: '15px', cursor: status === 'loading' ? 'wait' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px',
                  transition: 'all 0.2s', opacity: status === 'loading' ? 0.7 : 1, boxShadow: '0 4px 16px rgba(15, 175, 175, 0.3)'
                }}
              >
                {status === 'loading' ? 'Sending Link...' : <>Send Reset Link <ArrowRight size={16} /></>}
              </button>
            </form>

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <Link href="/login" style={{ color: '#94A3B8', fontSize: '14px', textDecoration: 'none', fontFamily: 'Source Sans 3, sans-serif', transition: 'color 0.2s' }}>
                &larr; Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
