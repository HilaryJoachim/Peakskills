'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Lock, CheckCircle } from 'lucide-react'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid or missing password reset token.')
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setStatus('error')
      setMessage('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setStatus('error')
      setMessage('Password must be at least 6 characters long.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password')
      }

      setStatus('success')
      setMessage('Your password has been successfully reset.')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
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
            Password Reset Complete
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: '0 0 32px', lineHeight: 1.5 }}>
            {message}
          </p>
          <Link
            href="/login"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(15, 175, 175, 0.3)'
            }}
          >
            Login to Portal <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
          </Link>
        </div>
      ) : (
        <>
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#ffffff', margin: '0 0 8px', width: '100%', textAlign: 'center' }}>
            Create New Password
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: '0 0 32px', textAlign: 'center' }}>
            Please enter your new password below.
          </p>

          {status === 'error' && (
            <div style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#E2E8F0', fontSize: '14px', fontWeight: 500, marginBottom: '8px', textAlign: 'left', width: '100%' }}>
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
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

            <div>
              <label style={{ display: 'block', color: '#E2E8F0', fontSize: '14px', fontWeight: 500, marginBottom: '8px', textAlign: 'left', width: '100%' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
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
              disabled={status === 'loading' || !token}
              style={{
                width: '100%', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#ffffff',
                padding: '14px', borderRadius: '12px', border: 'none', fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600, fontSize: '15px', cursor: (status === 'loading' || !token) ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px',
                transition: 'all 0.2s', opacity: (status === 'loading' || !token) ? 0.7 : 1, boxShadow: '0 4px 16px rgba(15, 175, 175, 0.3)'
              }}
            >
              {status === 'loading' ? 'Resetting...' : <>Reset Password <ArrowRight size={16} /></>}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
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
      <Suspense fallback={<div style={{ color: '#fff' }}>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
