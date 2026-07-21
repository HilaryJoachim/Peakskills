'use client'

import { useState } from 'react'
import { faqItems } from '@/lib/mentorshipData'
import { ChevronDown } from 'lucide-react'

export default function MentorshipFAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section style={{ background: '#ffffff', padding: '96px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
            Common Questions
          </p>
          <h2
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              lineHeight: 1.15,
              color: '#1D2430',
              margin: '0 0 14px',
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '16px',
              color: '#5C6B7A',
              margin: 0,
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about our mentorship programs.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                style={{
                  borderBottom: '1px solid #EEF1F5',
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'IBM Plex Sans, sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      color: isOpen ? '#0077B6' : '#1D2430',
                      lineHeight: 1.4,
                      transition: 'color 0.15s',
                    }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      color: '#5C6B7A',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? '300px' : '0',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '15px',
                      color: '#5C6B7A',
                      lineHeight: 1.65,
                      margin: '0 0 20px',
                      paddingRight: '36px',
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
