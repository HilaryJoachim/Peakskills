'use client'

import { Briefcase, BookOpen, Target, LineChart } from 'lucide-react'

export default function WhyChoosePeakSkills() {
  const cards = [
    {
      icon: <Briefcase size={28} />,
      title: 'Industry Experience',
      desc: 'Programs designed around real workplace challenges and organizational realities.',
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Practical Learning',
      desc: 'Training focused on skills participants can immediately apply.',
    },
    {
      icon: <Target size={28} />,
      title: 'Customized Delivery',
      desc: 'Solutions tailored to organizational goals, workforce needs, and industry context.',
    },
    {
      icon: <LineChart size={28} />,
      title: 'Measurable Results',
      desc: 'Programs focused on improving performance, leadership, service quality, and business outcomes.',
    },
  ]

  return (
    <section style={{ background: 'linear-gradient(to bottom, #1D2430, #0B1221)', padding: '96px 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)',
              color: '#FFFFFF',
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 700,
              lineHeight: 1.2
            }}
          >
            Why Organizations Choose PeakSkills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div 
              key={i}
              style={{
                backgroundColor: i % 2 === 0 ? '#FFB300' : '#4DD0E1',
                borderRadius: '16px',
                padding: '32px 24px',
                transition: 'all 0.3s ease',
                cursor: 'default',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 20px -5px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}
            >
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF', // Solid white background for max contrast
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' // Add slight shadow to lift it off the bright background
                }}
              >
                {/* Dark navy color for the icon itself */}
                <div style={{ color: '#1D2430' }}>
                  {card.icon}
                </div>
              </div>
              <h3 
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#1D2430',
                  fontSize: '20px',
                  fontWeight: 800,
                  marginBottom: '12px'
                }}
              >
                {card.title}
              </h3>
              <p 
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(29,36,48,0.85)',
                  fontSize: '15.5px',
                  lineHeight: 1.6,
                  fontWeight: 500
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
