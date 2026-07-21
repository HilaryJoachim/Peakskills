'use client'

import { Video, MapPin, Clock, Calendar, Monitor } from 'lucide-react'

export default function HeroCard({ 
  student, 
  nextSession, 
  remainingSessions = 6, 
  completionPct = 0 
}: { 
  student: any;
  nextSession: any;
  remainingSessions: number;
  completionPct: number;
}) {
  const firstName = student.name.split(' ')[0]

  // Time-of-day greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  const isOnline = !!nextSession?.meetingLink || nextSession?.venue === 'Virtual'

  return (
    <>
      <div className="hero-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'stretch' }}>
        {/* Left — Welcome & Progress */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0B1120 0%, #172554 100%)',
            borderRadius: '24px',
            padding: '40px',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 40px rgba(11, 17, 32, 0.4)',
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: '-80px', right: '-40px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(15,175,175,0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(0,119,182,0.2) 0%, transparent 70%)', borderRadius: '50%' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="blinking-text" style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 28px)', color: '#ffffff', margin: '0 0 6px', lineHeight: 1.3 }}>
              {greeting}, {firstName} 👋
            </h2>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '16px', color: '#0FAFAF', fontWeight: 600, margin: '0 0 4px' }}>
              {student.program}
            </p>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: '0 0 20px' }}>
              {student.cohort}
            </p>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', lineHeight: 1.6 }}>
              You&rsquo;re making excellent progress. Only <strong style={{ color: '#0FAFAF' }}>{remainingSessions} sessions</strong> remain before certification.
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Overall Progress
              </span>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0FAFAF' }}>
                {completionPct}%
              </span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                className="hero-progress-fill"
                style={{
                  height: '100%',
                  width: `${completionPct}%`,
                  background: 'linear-gradient(90deg, #0FAFAF, #4DD0E1)',
                  borderRadius: '4px',
                  transition: 'width 1s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right — Next Session */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid rgba(0,0,0,0.03)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ECC40' }} />
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '11px', color: '#5C6B7A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Next Session
              </span>
            </div>

            {nextSession ? (
              <>
                <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', margin: '0 0 16px', lineHeight: 1.3 }}>
                  {nextSession.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={15} style={{ color: '#A9B4C2' }} />
                    <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>
                      {new Date(nextSession.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={15} style={{ color: '#A9B4C2' }} />
                    <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>
                      {nextSession.time}
                    </span>
                  </div>
                </div>

                {/* Mode badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    background: isOnline ? '#EFF6FF' : '#FEF3C7',
                    color: isOnline ? '#0077B6' : '#b45309',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    marginBottom: '20px',
                  }}
                >
                  {isOnline ? <Monitor size={12} /> : <MapPin size={12} />}
                  {isOnline ? 'ONLINE' : 'PHYSICAL'}
                </div>
              </>
            ) : (
              <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', color: '#5C6B7A' }}>
                No upcoming sessions scheduled.
              </p>
            )}
          </div>

          {nextSession && (
            <button
              onClick={() => {
                if (isOnline) {
                  window.open(nextSession.meetingLink || 'https://meet.google.com/', '_blank');
                } else {
                  alert(`Venue: ${nextSession.venue || 'TBD'}`);
                }
              }}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '12px',
                border: 'none',
                background: isOnline ? 'linear-gradient(135deg, #0284C7, #0D9488)' : '#0B1120',
                color: '#ffffff',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isOnline ? '0 4px 20px rgba(2,132,199,0.3)' : '0 4px 20px rgba(11,17,32,0.2)',
              }}
            >
              {isOnline ? <Video size={16} /> : <MapPin size={16} />}
              {isOnline ? 'Join Live Session' : 'View Venue'}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse-opacity {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .blinking-text {
          animation: pulse-opacity 2.5s ease-in-out infinite;
        }
        @media (max-width: 860px) {
          .hero-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
