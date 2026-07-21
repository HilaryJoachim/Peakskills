'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function IdleTimeout() {
  const router = useRouter()

  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem('lastActivity', Date.now().toString())
    }

    if (!localStorage.getItem('lastActivity')) {
      updateActivity()
    }

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart']
    let lastUpdate = 0

    const throttledUpdate = () => {
      const now = Date.now()
      if (now - lastUpdate > 1000) {
        updateActivity()
        lastUpdate = now
      }
    }

    events.forEach(event => {
      window.addEventListener(event, throttledUpdate, { passive: true })
    })

    const checkIdleTime = setInterval(async () => {
      const lastActivity = localStorage.getItem('lastActivity')
      if (lastActivity) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity, 10)
        // 20 minutes in milliseconds = 20 * 60 * 1000 = 1200000
        if (timeSinceLastActivity > 1200000) {
          clearInterval(checkIdleTime)
          
          try {
            await fetch('/api/auth/logout', { method: 'POST' })
          } catch (err) {
            console.error('Logout error:', err)
          }
          
          if (window.location.pathname.startsWith('/admin')) {
            window.location.href = '/admin-login'
          } else {
            window.location.href = '/login'
          }
        }
      }
    }, 30000) // check every 30 seconds

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, throttledUpdate)
      })
      clearInterval(checkIdleTime)
    }
  }, [])

  return null
}
