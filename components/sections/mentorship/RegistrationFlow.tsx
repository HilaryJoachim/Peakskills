'use client'

import { registrationFlowSteps } from '@/lib/mentorshipData'
import {
  FileText, MailCheck, Bell, ClipboardCheck,
  CheckCircle, Mail, LogIn, LayoutDashboard, CreditCard,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText size={22} />,
  MailCheck: <MailCheck size={22} />,
  Bell: <Bell size={22} />,
  ClipboardCheck: <ClipboardCheck size={22} />,
  CheckCircle: <CheckCircle size={22} />,
  Mail: <Mail size={22} />,
  LogIn: <LogIn size={22} />,
  LayoutDashboard: <LayoutDashboard size={22} />,
}

export default function RegistrationFlow() {
  return (
    <>
      <section style={{ background: '#1D2430', padding: '96px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                color: '#4DD0E1',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                margin: '0 0 12px',
              }}
            >
              System Architecture
            </p>
            <h2
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                lineHeight: 1.15,
                color: '#fff',
                margin: '0 0 14px',
              }}
            >
              Registration Flow
            </h2>
            <p
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '16px',
                color: '#A9B4C2',
                margin: 0,
                maxWidth: '480px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.6,
              }}
            >
              From application to dashboard access — here&rsquo;s the complete student
              onboarding journey.
            </p>
          </div>

          {/* Vertical timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '27px',
                top: '28px',
                bottom: '28px',
                width: '2px',
                background: 'linear-gradient(to bottom, #4DD0E1, rgba(77,208,225,0.2))',
              }}
            />

            {registrationFlowSteps.map((step, i) => (
              <div
                key={step.step}
                style={{
                  display: 'flex',
                  gap: '20px',
                  marginBottom: i < registrationFlowSteps.length - 1 ? '36px' : '0',
                  position: 'relative',
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background:
                      i === 0
                        ? 'linear-gradient(135deg, #0077B6, #4DD0E1)'
                        : i === registrationFlowSteps.length - 1
                          ? 'linear-gradient(135deg, #2ECC40, #4DD0E1)'
                          : 'rgba(255,255,255,0.06)',
                    border:
                      i > 0 && i < registrationFlowSteps.length - 1
                        ? '1px solid rgba(255,255,255,0.12)'
                        : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color:
                      i === 0 || i === registrationFlowSteps.length - 1
                        ? '#fff'
                        : '#4DD0E1',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {ICON_MAP[step.icon]}
                </div>

                {/* Content */}
                <div style={{ paddingTop: '6px' }}>
                  <span
                    style={{
                      fontFamily: 'IBM Plex Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: '#4DD0E1',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Step {step.step}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'IBM Plex Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '16px',
                      color: '#fff',
                      margin: '4px 0 6px',
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '14px',
                      color: '#A9B4C2',
                      margin: 0,
                      lineHeight: 1.55,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Future payment point */}
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '36px',
                position: 'relative',
                opacity: 0.5,
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px dashed rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A9B4C2',
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                <CreditCard size={22} />
              </div>
              <div style={{ paddingTop: '6px' }}>
                <span
                  style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: '#A9B4C2',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Coming Soon
                </span>
                <h3
                  style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.5)',
                    margin: '4px 0 6px',
                    lineHeight: 1.3,
                  }}
                >
                  Payment Integration
                </h3>
                <p
                  style={{
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(169,180,194,0.7)',
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  Payment processing will be added after approval, enabling direct
                  enrollment and automatic seat reservation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
