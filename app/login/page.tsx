'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to login')
      }

      router.push(data.redirect || '/portal')
    } catch (err: any) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
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

        <h2
          style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '24px',
            color: '#ffffff',
            margin: '0 0 8px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '15px',
            color: '#94A3B8',
            margin: '0 0 32px',
            textAlign: 'center',
          }}
        >
          Enter your credentials to access the student portal.
        </p>

        {errorMsg && (
          <div style={{ 
            width: '100%', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#F87171', 
            padding: '12px 16px', 
            borderRadius: '12px', 
            fontSize: '14px', 
            textAlign: 'center', 
            marginBottom: '24px' 
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
              <label
                style={{
                  display: 'block',
                  color: '#E2E8F0',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '8px',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                Email Address
              </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748B',
                }}
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="student@example.com"
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '14px 16px 14px 44px',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#0FAFAF')}
                onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.1)')}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label
                style={{
                  display: 'block',
                  color: '#E2E8F0',
                  fontSize: '14px',
                  fontWeight: 500,
                  textAlign: 'left'
                }}
              >
                Password
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748B',
                }}
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '14px 16px 14px 44px',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#0FAFAF')}
                onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.1)')}
              />
            </div>
          </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)',
                color: '#ffffff',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                cursor: loading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '12px',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(15, 175, 175, 0.3)'
              }}
            >
            {loading ? 'Logging in...' : (
              <>Login to Portal <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <p
          style={{
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '14px',
            color: '#64748B',
            marginTop: '32px',
            textAlign: 'center',
          }}
        >
          Don't have an account?{' '}
          <Link
            href="/mentorship-coaching"
            style={{
              color: '#0FAFAF',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Apply for Mentorship
          </Link>
        </p>
      </div>
    </div>
  )
}
