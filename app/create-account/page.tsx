'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Lock } from 'lucide-react'

function ActivationForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  if (!token) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: '#ffffff' }}>Invalid Activation Link</h2>
        <p style={{ color: '#94A3B8' }}>This link is invalid or has expired. Please contact admissions.</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.')
      return
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/auth/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to activate account')
      }

      setStatus('success')
      setTimeout(() => {
        router.push('/portal')
      }, 2000)
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <CheckCircle size={56} style={{ color: '#10B981', margin: '0 auto 20px' }} strokeWidth={1.5} />
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#ffffff', margin: '0 0 12px' }}>
          Account Activated
        </h2>
        <p style={{ color: '#94A3B8' }}>Your account has been successfully created. Redirecting to your portal...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '48px', height: '48px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ffffff' }}>
          <Lock size={24} />
        </div>
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '24px', color: '#ffffff', margin: '0 0 8px' }}>
          Create Your Password
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
          Set a secure password to access your PeakSkills student portal.
        </p>
      </div>

      {errorMsg && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#F87171',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          {errorMsg}
        </div>
      )}

      <div>
        <label style={{ display: 'block', color: '#E2E8F0', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Password</label>
        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '14px 16px', color: '#ffffff', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
          onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#0FAFAF')}
          onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.1)')}
        />
      </div>

      <div>
        <label style={{ display: 'block', color: '#E2E8F0', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Confirm Password</label>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={{ width: '100%', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '14px 16px', color: '#ffffff', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
          onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#0FAFAF')}
          onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.1)')}
        />
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        style={{ width: '100%', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#ffffff', padding: '14px', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 600, cursor: status === 'loading' ? 'wait' : 'pointer', marginTop: '12px', boxShadow: '0 4px 16px rgba(15, 175, 175, 0.3)', opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? 'Activating...' : 'Activate Account'}
      </button>
    </form>
  )
}

export default function CreateAccountPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0B1120 0%, #0F172A 100%)', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '40px', boxShadow: '0 24px 40px rgba(0, 0, 0, 0.4)' }}>
        <Suspense fallback={<div style={{ textAlign: 'center', color: '#5C6B7A' }}>Loading...</div>}>
          <ActivationForm />
        </Suspense>
      </div>
    </div>
  )
}
