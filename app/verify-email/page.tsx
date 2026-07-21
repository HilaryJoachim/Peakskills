import { Metadata } from 'next'
import Link from 'next/link'
import { MailCheck, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Email Verified | PeakSkills',
  description: 'Your email address has been successfully verified.',
}

export default function VerifyEmailPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F4F7FA',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(29,36,48,0.08)',
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            background: '#F0FDFA',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <MailCheck size={40} style={{ color: '#0FAFAF' }} />
        </div>

        <h1
          style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '28px',
            color: '#1D2430',
            margin: '0 0 12px',
          }}
        >
          Email Verified!
        </h1>
        
        <p
          style={{
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '16px',
            color: '#5C6B7A',
            margin: '0 0 32px',
            lineHeight: 1.6,
          }}
        >
          Your email address has been successfully verified. Your account is now active and you can log in to the student portal to access your dashboard.
        </p>

        <Link
          href="/login"
          style={{
            background: '#0077B6',
            color: '#ffffff',
            padding: '14px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.15s',
          }}
        >
          Proceed to Login <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
