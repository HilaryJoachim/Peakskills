'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminLogout } from '@/app/admin-login/actions'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CalendarCheck,
  Settings,
  LogOut,
  ChevronRight,
  ClipboardList,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Applications', href: '/admin/applications', icon: ClipboardList },
  { label: 'Students', href: '/admin/students', icon: Users },
  { label: 'Curriculum', href: '/admin/curriculum', icon: BookOpen },
  { label: 'Sessions', href: '/admin/sessions', icon: Calendar },
  { label: 'Attendance', href: '/admin/attendance', icon: CalendarCheck },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isLogoutHovered, setIsLogoutHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .admin-sidebar-spacer {
          width: 260px;
          flex-shrink: 0;
          transition: width 0.3s ease;
        }
        .admin-sidebar-aside {
          transform: translateX(0);
          transition: transform 0.3s ease;
        }
        .admin-mobile-menu-btn {
          display: none;
        }
        .admin-mobile-overlay {
          display: none;
        }
        @media (max-width: 768px) {
          .admin-sidebar-spacer {
            width: 0 !important;
          }
          .admin-sidebar-aside {
            transform: translateX(${isMobileOpen ? '0' : '-100%'});
          }
          .admin-mobile-menu-btn {
            display: flex !important;
            position: fixed;
            top: 16px;
            left: 16px;
            z-index: 50;
            background: #1D2430;
            border: none;
            color: white;
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            align-items: center;
            justify-content: center;
          }
          .admin-mobile-overlay {
            display: ${isMobileOpen ? 'block' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            z-index: 35;
          }
        }
      `}} />
      
      <button className="admin-mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      <div className="admin-mobile-overlay" onClick={() => setIsMobileOpen(false)} />

      <div className="admin-sidebar-spacer">
        <aside
          className="admin-sidebar-aside"
          style={{
            width: '260px',
            background: '#0B1120',
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
              background: 'rgba(245,158,11,0.15)',
              color: '#FCD34D',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 700,
              fontSize: '10px',
              padding: '4px 8px',
              borderRadius: '12px',
              display: 'inline-block',
              marginTop: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            Admin Portal
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {NAV_ITEMS.map((item) => {
            // Precise active matching
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
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
                    ? 'linear-gradient(135deg, rgba(245,158,11,0.9), rgba(217,119,6,0.9))' 
                    : isHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                  color: isActive ? '#ffffff' : isHovered ? '#F8FAFC' : '#94A3B8',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '14px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 4px 20px rgba(245,158,11,0.4), inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
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
                background: 'linear-gradient(135deg, #F59E0B, #B45309)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              A
            </div>
            <div>
              <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', color: '#F8FAFC' }}>
                Administrator
              </p>
              <p style={{ margin: 0, fontFamily: 'Source Sans 3, sans-serif', fontSize: '12px', color: '#64748B' }}>
                admin@peakskills.com
              </p>
            </div>
          </div>

          <button
            onClick={() => adminLogout()}
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
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
          </button>
        </div>
      </aside>
    </div>
    </>
  )
}
