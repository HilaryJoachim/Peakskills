'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import Link from 'next/link'

export type NotificationItem = {
  id: string
  title: string
  message: string
  href: string
  isRead: boolean
  date: string
}

export default function NotificationBell({ initialNotifications = [] }: { initialNotifications?: NotificationItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const popoverRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.isRead).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  return (
    <div style={{ position: 'relative' }} ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#5C6B7A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#dc2626', color: '#fff', fontSize: '10px', fontWeight: 700, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '40px',
          right: 0,
          width: '320px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          border: '1px solid #EEF1F5',
          zIndex: 50,
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #EEF1F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
            <h3 style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1D2430' }}>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
                style={{ background: 'transparent', border: 'none', color: '#0077B6', fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                Mark all read
              </button>
            )}
          </div>
          <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: '#5C6B7A', fontSize: '14px', fontFamily: 'Source Sans 3, sans-serif' }}>
                No notifications right now.
              </div>
            ) : (
              notifications.map(notification => (
                <Link
                  key={notification.id}
                  href={notification.href}
                  onClick={() => {
                    markAsRead(notification.id)
                    setIsOpen(false)
                  }}
                  style={{
                    display: 'block',
                    padding: '16px',
                    borderBottom: '1px solid #EEF1F5',
                    textDecoration: 'none',
                    background: notification.isRead ? '#ffffff' : '#F0F9FF',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', color: '#1D2430' }}>
                      {notification.title}
                    </h4>
                    {!notification.isRead && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0077B6', flexShrink: 0, marginTop: '4px' }} />}
                  </div>
                  <p style={{ margin: '0 0 8px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', lineHeight: 1.4 }}>
                    {notification.message}
                  </p>
                  <span style={{ fontSize: '11px', color: '#A9B4C2', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {notification.date}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
