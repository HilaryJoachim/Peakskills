'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { portalDashboard } from '@/lib/mentorshipData'
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CalendarCheck,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/portal', icon: LayoutDashboard },
  { label: 'My Classes', href: '/portal/classes', icon: BookOpen },
  { label: 'Schedule', href: '/portal/schedule', icon: Calendar },
  { label: 'Attendance', href: '/portal/attendance', icon: CalendarCheck },
  { label: 'Settings', href: '/portal/settings', icon: Settings },
]

export default function Sidebar({ studentName = 'Student', studentId = '', fullStudentId = '' }: { studentName?: string, studentId?: string, fullStudentId?: string }) {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isLogoutHovered, setIsLogoutHovered] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    const idToUse = fullStudentId || studentId
    if (idToUse) {
      const savedAvatar = localStorage.getItem(`avatar_${idToUse}`)
      if (savedAvatar) setAvatar(savedAvatar)

      const handleAvatarUpdate = (e: Event) => {
        const customEvent = e as CustomEvent
        if (customEvent.detail.studentId === idToUse) {
          setAvatar(customEvent.detail.avatar)
        }
      }

      window.addEventListener('avatarUpdated', handleAvatarUpdate)
      return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate)
    }
  }, [fullStudentId, studentId])

  return (
    <div style={{ width: '260px', flexShrink: 0 }}>
      <aside
        style={{
          width: '260px',
          background: '#0B1120', // Dark premium background
          borderRight: '1px solid rgba(255,255,255,0.03)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 40,
          boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
        }}
      >
      {/* Logo */}
      <div style={{ padding: '24px 24px 32px' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="PeakSkills Logo" style={{ height: '32px', width: 'auto' }} />
        </Link>
        <div
          style={{
            background: 'rgba(15,175,175,0.15)',
            color: '#4DD0E1',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 700,
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '12px',
            display: 'inline-block',
            marginTop: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            border: '1px solid rgba(15,175,175,0.2)',
          }}
        >
          Student Portal
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const isHovered = hoveredLink === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredLink(item.href)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(0,119,182,0.9), rgba(15,175,175,0.9))' 
                  : isHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                color: isActive ? '#ffffff' : isHovered ? '#F8FAFC' : '#94A3B8',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: isActive ? 600 : 500,
                fontSize: '14px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? '0 4px 20px rgba(0,119,182,0.4), inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={18} style={{ color: isActive ? '#ffffff' : isHovered ? '#F8FAFC' : '#64748B', transition: 'color 0.2s' }} />
                {item.label}
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '0 8px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0284C7, #0D9488)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            {avatar ? (
              <img src={avatar} alt={studentName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              studentName.split(' ').map((n: string) => n[0]).join('').substring(0, 2)
            )}
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#F8FAFC' }}>
              {studentName}
            </p>
            <p style={{ margin: 0, fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#64748B' }}>
              ID: {studentId}
            </p>
          </div>
        </div>

        <Link
          href="/login"
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '10px',
            textDecoration: 'none',
            color: isLogoutHovered ? '#F87171' : '#EF4444',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            transition: 'all 0.2s',
            background: isLogoutHovered ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
          }}
        >
          <LogOut size={18} />
          Log Out
        </Link>
      </div>
    </aside>
    </div>
  )
}
