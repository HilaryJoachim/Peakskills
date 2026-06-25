import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RequestTrainingForm from '@/components/forms/RequestTrainingForm'
import { Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Request In-House or Corporate Training',
  description:
    'Request a customized in-house or corporate training program from PeakSkills. We design and deliver programs for banks, government institutions, NGOs, and growing organizations across Tanzania.',
}

export default function RequestTrainingPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '72px' }}>
        {/* Page header */}
        <div style={{ background: '#1D2430', padding: '56px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: '12px', color: '#4DD0E1', textTransform: 'uppercase', letterSpacing: '0.08em',
              margin: '0 0 14px',
            }}>
              Corporate &amp; In-House Training
            </p>
            <h1 style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15,
              color: '#fff', margin: '0 0 14px',
            }}>
              Request Training for Your Organization
            </h1>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.7)', margin: 0, maxWidth: '560px' }}>
              Tell us about your organization and training requirements. Our team will review your submission and contact you within two working days with a proposal tailored to your context.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div style={{ background: '#F4F7FA', padding: '64px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '64px', alignItems: 'start' }} className="request-grid">

            {/* Form */}
            <div style={{ background: '#fff', borderRadius: '10px', padding: '48px', border: '1px solid #DDE4EC', boxShadow: '0 2px 8px rgba(29,36,48,0.06)' }}>
              <RequestTrainingForm />
            </div>

            {/* Sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Why in-house */}
              <div style={{ background: '#fff', border: '1px solid #DDE4EC', borderRadius: '10px', padding: '28px' }}>
                <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1D2430', margin: '0 0 16px' }}>
                  Why in-house training?
                </h2>
                {[
                  'Content, scenarios, and case studies adapted specifically to your sector and organization',
                  'Delivered at your premises, on your schedule, with no individual enrollment administration',
                  'Group rates are substantially lower per-participant than open-enrollment pricing',
                  'Confidential discussion of internal challenges and performance issues in a secure group setting',
                  'Post-training support and follow-up can be included in the engagement scope',
                ].map((point, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#2ECC40', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', lineHeight: 1.65, color: '#5C6B7A', margin: 0 }}>{point}</p>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div style={{ background: '#1D2430', borderRadius: '10px', padding: '28px' }}>
                <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px', color: '#fff', margin: '0 0 16px' }}>
                  Prefer to speak directly?
                </h3>
                {[
                  { icon: <Phone size={16} />, label: '+255 754 232 863 / 0718 710 361' },
                  { icon: <Mail size={16} />, label: 'training@peakskills.co.tz' },
                  { icon: <Clock size={16} />, label: 'Mon–Fri, 8:00am–5:00pm EAT' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 2 ? '12px' : 0 }}>
                    <span style={{ color: '#4DD0E1' }}>{item.icon}</span>
                    <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#A9B4C2' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 1023px) {
          .request-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          div[style*="padding: 48px"] { padding: 28px !important; }
        }
      `}</style>
    </>
  )
}
