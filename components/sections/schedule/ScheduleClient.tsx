'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'

type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4'

type Training = {
  id: string
  title: string
  category: string
  dates: string
  location: string
  status: 'Open' | 'Completed' | 'Full'
  quarter: Quarter
  participants?: string
}

const mockTrainings: Training[] = [
  // Q1
  { id: '1', title: 'Executive Leadership Program', category: 'Leadership', dates: '12 - 14 Feb', location: 'Dar es Salaam', status: 'Completed', quarter: 'Q1', participants: '✓ 18 participants trained' },
  { id: '2', title: 'Strategic Marketing Masterclass', category: 'Marketing', dates: '05 - 07 Mar', location: 'Nairobi', status: 'Completed', quarter: 'Q1', participants: '✓ 24 participants trained' },
  // Q2 (from screenshot)
  { id: 'q2-1', title: 'Leadership Excellence Program', category: 'Leadership', dates: '07 - 11 Apr', location: 'Dar es Salaam', status: 'Completed', quarter: 'Q2', participants: '✓ 22 participants trained' },
  { id: 'q2-2', title: 'Business Communication & Report Writing', category: 'Communication', dates: '05 - 07 May', location: 'Mwanza', status: 'Completed', quarter: 'Q2', participants: '✓ 31 participants trained' },
  { id: 'q2-3', title: 'Finance for Non-Finance Managers', category: 'Finance', dates: '02 - 06 Jun', location: 'Online / DSM', status: 'Completed', quarter: 'Q2', participants: '✓ 19 participants trained' },
  { id: 'q2-4', title: 'Career Readiness for Secondary School Students', category: 'Community', dates: '21 Jun', location: 'Arusha', status: 'Completed', quarter: 'Q2', participants: '✓ 95 students reached, 2 schools' },
  // Q3
  { id: '5', title: 'Data Analytics for Managers', category: 'Technology', dates: '15 - 18 Aug', location: 'Online', status: 'Open', quarter: 'Q3' },
  { id: '6', title: 'Corporate Governance Bootcamp', category: 'Leadership', dates: '05 - 09 Sep', location: 'Dar es Salaam', status: 'Open', quarter: 'Q3' },
  // Q4
  { id: '7', title: 'Project Management Fundamentals', category: 'Management', dates: '06 - 10 Oct', location: 'Dar es Salaam', status: 'Open', quarter: 'Q4' },
  { id: '8', title: 'Conflict Resolution & Negotiation', category: 'Leadership', dates: '20 - 22 Oct', location: 'Arusha', status: 'Open', quarter: 'Q4' },
  { id: '9', title: 'Performance Management Systems', category: 'HR', dates: '03 - 07 Nov', location: 'Dar es Salaam', status: 'Open', quarter: 'Q4' },
  { id: '10', title: 'Digital Transformation for Managers', category: 'Technology', dates: '17 - 19 Nov', location: 'Online', status: 'Open', quarter: 'Q4' },
  { id: '11', title: 'Year-End Leadership Summit', category: 'Leadership', dates: '08 - 12 Dec', location: 'Dar es Salaam', status: 'Open', quarter: 'Q4' },
]

const quarters: { id: Quarter; label: string }[] = [
  { id: 'Q1', label: 'Q1 - Jan–Mar' },
  { id: 'Q2', label: 'Q2 - Apr–Jun' },
  { id: 'Q3', label: 'Q3 - Jul–Sep' },
  { id: 'Q4', label: 'Q4 - Oct–Dec' },
]

export default function ScheduleClient() {
  const [activeTab, setActiveTab] = useState<Quarter>('Q2')

  const filteredTrainings = mockTrainings.filter(t => t.quarter === activeTab)

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h1 
            style={{ 
              fontFamily: 'var(--font-heading)',
              color: '#1D2430',
              fontSize: 'clamp(32px, 4vw, 42px)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '16px'
            }}
          >
            2025 Training Schedule
          </h1>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              color: '#5C6B7A',
              fontSize: '18px',
              maxWidth: '600px',
              lineHeight: 1.6
            }}
          >
            Plan ahead with our full training calendar, or look back at trainings we&apos;ve already delivered.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 overflow-x-auto pb-4 hide-scrollbar">
          <div 
            style={{ 
              display: 'inline-flex', 
              background: '#F4F7FA', 
              borderRadius: '40px', 
              padding: '6px',
              border: '1px solid #DDE4EC'
            }}
          >
            {quarters.map(q => {
              const isActive = activeTab === q.id
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveTab(q.id)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '30px',
                    background: isActive ? '#009B91' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#5C6B7A',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '15px',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = '#1D2430'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = '#5C6B7A'
                  }}
                >
                  {q.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Table / List */}
        <div className="w-full overflow-x-auto pb-8">
          <div className="min-w-[900px]">
            {/* Table Header */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '3fr 1.5fr 1.5fr 1.5fr 1fr 1fr', 
                gap: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid #E2E8F0',
                color: '#5C6B7A',
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <div>COURSE</div>
              <div>CATEGORY</div>
              <div>DATES</div>
              <div>LOCATION</div>
              <div>STATUS</div>
              <div>ACTION</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col">
              {filteredTrainings.length === 0 ? (
                <div className="py-12 text-center text-gray-400">No trainings scheduled for this quarter.</div>
              ) : (
                filteredTrainings.map((t, i) => (
                  <div 
                    key={t.id}
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '3fr 1.5fr 1.5fr 1.5fr 1fr 1fr', 
                      gap: '16px',
                      alignItems: 'center',
                      padding: '24px 0',
                      borderBottom: i !== filteredTrainings.length - 1 ? '1px solid #E2E8F0' : 'none',
                    }}
                  >
                    {/* Course */}
                    <div>
                      <div style={{ color: '#1D2430', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15.5px' }}>
                        {t.title}
                      </div>
                      {t.participants && (
                        <div style={{ color: '#009B91', fontFamily: 'var(--font-body)', fontSize: '12.5px', marginTop: '4px', fontWeight: 500 }}>
                          {t.participants}
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <span 
                        style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background: 'rgba(0,155,145,0.06)',
                          border: '1px solid rgba(0,155,145,0.2)',
                          color: '#009B91',
                          fontSize: '12.5px',
                          fontWeight: 500,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {t.category}
                      </span>
                    </div>

                    {/* Dates */}
                    <div style={{ color: '#5C6B7A', fontFamily: 'var(--font-body)', fontSize: '14.5px', fontWeight: 500 }}>
                      {t.dates}
                    </div>

                    {/* Location */}
                    <div style={{ color: '#5C6B7A', fontFamily: 'var(--font-body)', fontSize: '14.5px', fontWeight: 500 }}>
                      {t.location}
                    </div>

                    {/* Status */}
                    <div>
                      <span 
                        style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background: t.status === 'Open' ? 'rgba(34,197,94,0.1)' : '#F1F5F9',
                          border: t.status === 'Open' ? '1px solid rgba(34,197,94,0.3)' : '1px solid #CBD5E1',
                          color: t.status === 'Open' ? '#059669' : '#475569',
                          fontSize: '12px',
                          fontWeight: 500,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {t.status}
                      </span>
                    </div>

                    {/* Action */}
                    <div>
                      <Link 
                        href={`/programs/${t.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '6px 16px',
                          borderRadius: '6px',
                          background: 'transparent',
                          border: t.status === 'Open' ? '1px solid rgba(0,155,145,0.5)' : '1px solid #E2E8F0',
                          color: t.status === 'Open' ? '#009B91' : '#94A3B8',
                          fontSize: '13px',
                          fontWeight: 600,
                          fontFamily: 'var(--font-body)',
                          transition: 'all 0.2s',
                          textDecoration: 'none',
                          pointerEvents: t.status === 'Open' ? 'auto' : 'none'
                        }}
                        onMouseEnter={e => {
                          if (t.status === 'Open') e.currentTarget.style.background = 'rgba(0,155,145,0.06)'
                        }}
                        onMouseLeave={e => {
                          if (t.status === 'Open') e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {t.status === 'Open' ? 'Register' : 'Done'}
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Bottom Border for table */}
            <div style={{ height: '1px', background: '#E2E8F0', width: '100%', marginTop: '8px' }} />
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6 flex justify-center">
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '8px',
              background: 'transparent',
              border: '1px solid rgba(0,155,145,0.5)',
              color: '#009B91',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,155,145,0.06)'
              e.currentTarget.style.borderColor = '#009B91'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(0,155,145,0.5)'
            }}
          >
            <Download size={18} />
            Download Full 2025 Training Calendar
          </button>
        </div>

      </div>
    </section>
  )
}
