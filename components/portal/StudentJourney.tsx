'use client'

import { portalDashboard } from '@/lib/mentorshipData'
import { Check, Award } from 'lucide-react'

export default function StudentJourney({ 
  modules = [], 
  completionPct = 0 
}: { 
  modules?: string[], 
  completionPct?: number 
}) {
  // Construct the journey array dynamically
  const journey = [
    { label: 'Registration', status: 'completed' },
    { label: 'Orientation', status: completionPct === 0 ? 'current' : 'completed' }
  ]

  // Add the dynamic modules
  const numModules = modules.length
  modules.forEach((modTitle, i) => {
    // Estimate if this module is completed based on overall completionPct
    // e.g. if completionPct is 50%, and there are 4 modules, 2 are completed.
    const moduleThreshold = ((i + 1) / numModules) * 100
    const prevThreshold = (i / numModules) * 100

    let status = 'pending'
    if (completionPct >= moduleThreshold) {
      status = 'completed'
    } else if (completionPct > prevThreshold || (completionPct > 0 && i === 0)) {
      status = 'current'
    } else if (completionPct === 0 && i === 0) {
      status = 'pending'
    }

    journey.push({ label: modTitle, status })
  })

  // Add Certificate
  journey.push({ 
    label: 'Certificate', 
    status: completionPct === 100 ? 'completed' : 'pending' 
  })

  return (
    <>
      <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: '0 0 24px' }}>
          Your Learning Journey
        </h3>

        <div className="journey-scroll" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', minWidth: 'max-content', gap: '0' }}>
            {journey.map((step, i) => {
              const isCompleted = step.status === 'completed'
              const isCurrent = step.status === 'current'
              const isLast = i === journey.length - 1
              const isCert = step.label === 'Certificate'

              return (
                <div key={step.label} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  {/* Step */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90px' }}>
                    {/* Circle */}
                    <div
                      className={isCurrent ? 'journey-pulse' : ''}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isCompleted
                          ? 'linear-gradient(135deg, #15803d, #22c55e)'
                          : isCurrent
                            ? 'linear-gradient(135deg, #0077B6, #0FAFAF)'
                            : '#F1F5F9',
                        color: isCompleted || isCurrent ? '#fff' : '#A9B4C2',
                        border: isCurrent ? '3px solid rgba(0,119,182,0.2)' : 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isCompleted ? '0 4px 12px rgba(21,128,61,0.2)' : isCurrent ? '0 4px 12px rgba(0,119,182,0.25)' : 'none',
                        flexShrink: 0,
                      }}
                    >
                      {isCompleted ? (
                        <Check size={18} strokeWidth={3} />
                      ) : isCert ? (
                        <Award size={18} />
                      ) : (
                        <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '13px' }}>
                          {i + 1}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontWeight: isCurrent ? 700 : 500,
                        fontSize: '12px',
                        color: isCompleted ? '#15803d' : isCurrent ? '#0077B6' : '#A9B4C2',
                        marginTop: '10px',
                        textAlign: 'center',
                        lineHeight: 1.3,
                      }}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Connector line */}
                  {!isLast && (
                    <div
                      style={{
                        height: '2px',
                        width: '40px',
                        marginTop: '19px',
                        background: isCompleted
                          ? 'linear-gradient(90deg, #15803d, #22c55e)'
                          : isCurrent
                            ? 'linear-gradient(90deg, #0FAFAF, #E2E8F0)'
                            : '#E2E8F0',
                        borderRadius: '2px',
                        flexShrink: 0,
                        transition: 'background 0.4s ease',
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .journey-pulse {
          animation: journeyPulse 2s ease-in-out infinite;
        }
        @keyframes journeyPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,119,182,0.2); }
          50% { box-shadow: 0 0 0 8px rgba(0,119,182,0); }
        }
        .journey-scroll::-webkit-scrollbar { height: 4px; }
        .journey-scroll::-webkit-scrollbar-track { background: transparent; }
        .journey-scroll::-webkit-scrollbar-thumb { background: #DDE4EC; border-radius: 2px; }
      `}</style>
    </>
  )
}
