'use client'

import { howItWorksSteps } from '@/lib/mentorshipData'
import {
  UserPlus, ClipboardList, Compass, Monitor,
  ShieldCheck, MailCheck, LayoutDashboard, GraduationCap,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ReactNode> = {
  UserPlus: <UserPlus size={24} />,
  ClipboardList: <ClipboardList size={24} />,
  Compass: <Compass size={24} />,
  Monitor: <Monitor size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  MailCheck: <MailCheck size={24} />,
  LayoutDashboard: <LayoutDashboard size={24} />,
  GraduationCap: <GraduationCap size={24} />,
}

export default function HowItWorks() {
  return (
    <>
      <section style={{ background: '#F4F7FA', padding: '40px 24px 96px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                color: '#0FAFAF',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                margin: '0 0 12px',
              }}
            >
              Getting Started
            </p>
            <h2
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                lineHeight: 1.15,
                color: '#1D2430',
                margin: '0 0 16px',
              }}
            >
              How It Works
            </h2>
            <p
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '16px',
                color: '#5C6B7A',
                margin: 0,
                maxWidth: '560px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.6,
              }}
            >
              From sign-up to certification — here&rsquo;s your journey with PeakSkills mentorship.
            </p>
          </div>

          {/* Timeline grid */}
          <div
            className="hiw-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0',
              position: 'relative',
            }}
          >
            {howItWorksSteps.map((step, i) => (
              <div
                key={step.step}
                className="hiw-step"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 16px',
                  position: 'relative',
                  marginBottom: i < 4 ? '48px' : '0',
                }}
              >
                {/* Connector line (horizontal between steps) */}
                {i < howItWorksSteps.length - 1 && i !== 3 && (
                  <div
                    className="hiw-connector"
                    style={{
                      position: 'absolute',
                      top: '28px',
                      left: '60%',
                      right: '-40%',
                      height: '2px',
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Step circle */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background:
                      i === 0
                        ? 'linear-gradient(135deg, #0077B6, #4DD0E1)'
                        : i === howItWorksSteps.length - 1
                          ? 'linear-gradient(135deg, #2ECC40, #4DD0E1)'
                          : '#FFFFFF',
                    border: i > 0 && i < howItWorksSteps.length - 1 ? '2px solid #DDE4EC' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: i === 0 || i === howItWorksSteps.length - 1 ? '#fff' : '#0077B6',
                    boxShadow: '0 4px 16px rgba(29,36,48,0.08)',
                    zIndex: 1,
                    position: 'relative',
                    marginBottom: '16px',
                    flexShrink: 0,
                  }}
                >
                  {ICON_MAP[step.icon]}
                </div>

                {/* Step number */}
                <span
                  style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: '#0FAFAF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '6px',
                  }}
                >
                  Step {step.step}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#1D2430',
                    margin: '0 0 8px',
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '13px',
                    color: '#5C6B7A',
                    margin: 0,
                    lineHeight: 1.55,
                    maxWidth: '220px',
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .hiw-connector {
          background: linear-gradient(90deg, #DDE4EC 0%, #4DD0E1 50%, #DDE4EC 100%);
          background-size: 200% 100%;
          animation: progressFlow 2s linear infinite;
        }
        @keyframes progressFlow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .hiw-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        @media (max-width: 1023px) {
          .hiw-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
          .hiw-connector { display: none !important; }
          .hiw-step { margin-bottom: 0 !important; }
        }
        @media (max-width: 639px) {
          .hiw-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </>
  )
}
