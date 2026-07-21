'use client'

import { portalDashboard } from '@/lib/mentorshipData'
import { CalendarCheck, BookOpen, Star, Trophy, Award, Lock } from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  CalendarCheck,
  BookOpen,
  Star,
  Trophy,
  Award,
}

export default function Achievements() {
  const { badges } = portalDashboard

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #EEF1F5', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
      <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1D2430', margin: '0 0 20px' }}>
        Achievements
      </h3>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {badges.map(badge => {
          const Icon = ICON_MAP[badge.icon] || Award
          return (
            <div
              key={badge.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                width: '80px',
                textAlign: 'center',
                opacity: badge.earned ? 1 : 0.45,
                filter: badge.earned ? 'none' : 'grayscale(1)',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: badge.earned
                    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                    : '#F1F5F9',
                  color: badge.earned ? '#ffffff' : '#A9B4C2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: badge.earned ? '0 4px 12px rgba(245,158,11,0.25)' : 'none',
                }}
              >
                <Icon size={22} />
                {!badge.earned && (
                  <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', background: '#E2E8F0', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lock size={10} style={{ color: '#94a3b8' }} />
                  </div>
                )}
              </div>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '11px', color: badge.earned ? '#1D2430' : '#A9B4C2', lineHeight: 1.3 }}>
                {badge.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
