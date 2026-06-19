import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

interface ScaffoldPageProps {
  title: string
  description: string
  eyebrow?: string
}

export default function ScaffoldPage({ title, description, eyebrow }: ScaffoldPageProps) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '72px' }}>
        <div style={{ background: '#1D2430', padding: '80px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {eyebrow && (
              <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: '#4DD0E1', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>
                {eyebrow}
              </p>
            )}
            <h1 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,44px)', lineHeight: 1.15, color: '#fff', margin: '0 0 14px' }}>
              {title}
            </h1>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.7)', margin: 0, maxWidth: '560px' }}>
              {description}
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: '#F4F7FA', border: '1px dashed #DDE4EC', borderRadius: '10px',
            padding: '48px 64px',
          }}>
            <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px', color: '#5C6B7A', margin: '0 0 8px' }}>
              Page in development
            </p>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#5C6B7A', margin: '0 0 24px' }}>
              Full content for this page will be published shortly.
            </p>
            <Link href="/" style={{ color: '#0077B6', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
